// scripts/generate-proxy.js
// Generates subdomains.json and proxy.js from the Next.js app directory.
// Run: node scripts/generate-proxy.js [--once]

import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import crypto from "crypto";
import chokidar from "chokidar";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const APP_DIR = path.join(PROJECT_ROOT, "app");
const SUBDOMAINS_JSON = path.join(PROJECT_ROOT, "subdomains.json");
const OUTPUT_PROXY = path.join(PROJECT_ROOT, "proxy.js");

const EXCLUDED_FOLDERS = new Set(["api", "components", "lib", "styles", "hooks", "providers", "database", "utils", "assets", "fonts", "public", "node_modules", "_components", "_lib"]);
const SECTION_NAMES = ["(external-section)", "(internal-section)"];
const DEBOUNCE_MS = 350;
let debounceTimer;
let buildQueue = Promise.resolve();

function sha256(value) {
	return crypto.createHash("sha256").update(value).digest("hex");
}

async function directories(dir) {
	try {
		return (await fsp.readdir(dir, { withFileTypes: true }))
			.filter((entry) => entry.isDirectory())
			.map((entry) => entry.name)
			.sort((a, b) => a.localeCompare(b));
	} catch (error) {
		if (error.code === "ENOENT") return [];
		throw error;
	}
}

async function isDirectory(dir) {
	try {
		return (await fsp.stat(dir)).isDirectory();
	} catch (error) {
		if (error.code === "ENOENT") return false;
		throw error;
	}
}

async function hasRouteFile(dir) {
	for (const filename of ["page.js", "page.jsx", "page.ts", "page.tsx", "route.js", "route.ts"]) {
		if (fs.existsSync(path.join(dir, filename))) return true;
	}
	return false;
}

function isRouteFolder(name) {
	const lower = name.toLowerCase();
	return !name.startsWith(".") && !name.startsWith("_") && !EXCLUDED_FOLDERS.has(lower) && !name.startsWith("(") && !name.startsWith("@") && !name.startsWith("[");
}

async function sectionDirectory(base, section) {
	const candidate = path.join(base, section);
	return (await isDirectory(candidate)) ? candidate : null;
}

// Returns first URL path segments for a section, including nested route groups.
// Route groups do not contribute to the URL; route folders must contain an actual page
// somewhere below them. This prevents treating arbitrary folders as routes.
async function readSectionRoutes(sectionDir) {
	if (!sectionDir) return [];
	const routes = new Set();

	async function walk(dir, prefix = "", depth = 0) {
		if (depth > 12) return;
		for (const name of await directories(dir)) {
			if (name.startsWith("@") || name.startsWith("_") || EXCLUDED_FOLDERS.has(name.toLowerCase())) continue;
			const child = path.join(dir, name);
			if (name.startsWith("(") && name.endsWith(")")) {
				await walk(child, prefix, depth + 1);
			} else if (name.startsWith("[") || name.startsWith(".")) {
				// Dynamic routes are not safe to classify by first segment automatically.
				continue;
			} else if (isRouteFolder(name)) {
				const firstSegment = prefix || name;
				if (await hasPageBelow(child)) routes.add(firstSegment);
			}
		}
	}
	await walk(sectionDir);
	return [...routes].sort();
}

async function hasPageBelow(dir, depth = 0) {
	if (depth > 12) return false;
	if (await hasRouteFile(dir)) return true;
	for (const name of await directories(dir)) {
		if (name.startsWith("_") || name.startsWith("@") || EXCLUDED_FOLDERS.has(name.toLowerCase())) continue;
		if (await hasPageBelow(path.join(dir, name), depth + 1)) return true;
	}
	return false;
}

// Preserve the original partners account-folder discovery behavior.
// The returned segments are top-level paths; nested account routes are reached
// via their account prefix, not by incorrectly flattening them.
async function collectPartnersInternalRoutes(baseFolder) {
	const internal = await sectionDirectory(baseFolder, "(internal-section)");
	return readSectionRoutes(internal);
}

async function collectRoutesForSubdomain(subdomain) {
	const base = path.join(APP_DIR, subdomain);
	const externalDir = await sectionDirectory(base, "(external-section)");
	const internalDir = await sectionDirectory(base, "(internal-section)");
	return {
		subdomain,
		externalRoutes: await readSectionRoutes(externalDir),
		internalRoutes: subdomain === "partners" ? await collectPartnersInternalRoutes(base) : await readSectionRoutes(internalDir),
		externalHome: externalDir ? await hasRouteFile(externalDir) : false,
		internalHome: internalDir ? await hasRouteFile(internalDir) : false
	};
}

async function discoverSubdomains() {
	const names = await directories(APP_DIR);
	const subdomains = [];
	for (const name of names) {
		if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(name)) continue;
		if (EXCLUDED_FOLDERS.has(name.toLowerCase()) || name.toLowerCase() === "customers") continue;
		if ((await sectionDirectory(path.join(APP_DIR, name), "(external-section)")) || (await sectionDirectory(path.join(APP_DIR, name), "(internal-section)"))) {
			subdomains.push(name.toLowerCase());
		}
	}
	return [...new Set(subdomains)].sort();
}

async function collectRootAppRoutes() {
	const external = await sectionDirectory(APP_DIR, "(external-section)");
	const internal = await sectionDirectory(APP_DIR, "(internal-section)");
	return {
		rootExternalRoutes: await readSectionRoutes(external),
		rootInternalRoutes: await readSectionRoutes(internal),
		rootExternalHome: external ? await hasRouteFile(external) : false,
		rootInternalHome: internal ? await hasRouteFile(internal) : false
	};
}

async function buildPlatformRoutes() {
	const subdomains = await discoverSubdomains();
	const platformRoutes = [];
	for (const subdomain of subdomains) {
		platformRoutes.push(await collectRoutesForSubdomain(subdomain));
	}
	return { subdomains, platformRoutes, ...(await collectRootAppRoutes()) };
}

function generateMiddlewareContent(routes) {
	const data = JSON.stringify(
		{
			platformRoutes: routes.platformRoutes,
			rootExternalRoutes: routes.rootExternalRoutes,
			rootInternalRoutes: routes.rootInternalRoutes,
			rootExternalHome: routes.rootExternalHome,
			rootInternalHome: routes.rootInternalHome
		},
		null,
		2
	);

	return `/*
 * AUTO-GENERATED proxy.js — DO NOT EDIT DIRECTLY.
 * Edit scripts/generate-proxy.js or app/ routes instead.
 */
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const ROUTING = ${data};
export const PLATFORM_ROUTES = ROUTING.platformRoutes;
export const ROOT_EXTERNAL_ROUTES = ROUTING.rootExternalRoutes;
export const ROOT_INTERNAL_ROUTES = ROUTING.rootInternalRoutes;

export const config = {
  matcher: ["/((?!api(?:/|$)|_next(?:/|$)|favicon.ico$|robots.txt$|sitemap.xml$).*)"]
};

function pathMatches(pathname, segments) {
  return segments.some((segment) =>
    pathname === \`/\${segment}\` || pathname.startsWith(\`/\${segment}/\`)
  );
}

function resolveHost(hostname) {
  const rootDomain = (process.env.ROOT_DOMAIN || "lafayseatery.com")
    .toLowerCase().replace(/^https?:\\/\\//, "").replace(/\\/.*$/, "").replace(/:\\d+$/, "");
  const vercelHost = (process.env.VERCEL_URL || "").toLowerCase();
  if (hostname === rootDomain || hostname === \`www.\${rootDomain}\` ||
      hostname === "localhost" || hostname === "127.0.0.1" ||
      (vercelHost && hostname === vercelHost)) {
    return { type: "root", subdomain: null };
  }
  let subdomain = null;
  if (hostname.endsWith(\`.\${rootDomain}\`)) {
    subdomain = hostname.slice(0, -(rootDomain.length + 1));
  } else if (hostname.endsWith(".localhost")) {
    subdomain = hostname.slice(0, -".localhost".length);
  }
  if (!subdomain || subdomain.includes(".")) return { type: "unknown", subdomain: null };
  const registered = PLATFORM_ROUTES.find((entry) => entry.subdomain === subdomain);
  return registered
    ? { type: "subdomain", subdomain, routes: registered }
    : { type: "unknown", subdomain };
}



function withDomainCookie(response, domain, request) {
  // Expose the resolved domain to the next request, and to the browser.
  response.cookies.set("domain", domain, {
    path: "/",
    httpOnly: false,
    secure: request.nextUrl.protocol === "https:",
    sameSite: "lax"
  });
  return response;
}

function rewrite(request, pathname) {
  const destination = request.nextUrl.clone();
  destination.pathname = pathname;
  return NextResponse.rewrite(destination);
}

function redirect(request, pathname) {
  const destination = request.nextUrl.clone();
  destination.pathname = pathname;
  destination.search = "";
  return NextResponse.redirect(destination);
}

export async function proxy(req) {
 const pathname = req.nextUrl.pathname;
 const rawHost = req.headers.get("host") ?? "";
 const hostname = rawHost.toLowerCase().split(":")[0];
 const host = resolveHost(hostname);

 //console.log("[PROXY REQUEST]", {
 //hostname,
 //pathname,
 //hostType: host.type,
 //subdomain: host.subdomain,
 //routes: host.routes
 //});

 //console.log("[PROXY HOST DEBUG]", {
 //rawHost: req.headers.get("host"),
 //forwardedHost: req.headers.get("x-forwarded-host"),
 //nextUrlHostname: req.nextUrl.hostname,
 //resolvedHostname: hostname,
 //hostType: host.type,
 //subdomain: host.subdomain
 //});

  const domain = host.type === "subdomain" ? host.subdomain : "customers";
  const respond = (response) => withDomainCookie(response, domain, req);

  if (host.type === "unknown") {
    return new NextResponse("Unknown hostname or subdomain", { status: 404 });
  }

  const routes = host.type === "subdomain" ? host.routes : {
    externalRoutes: ROOT_EXTERNAL_ROUTES,
    internalRoutes: ROOT_INTERNAL_ROUTES,
    externalHome: ROUTING.rootExternalHome,
    internalHome: ROUTING.rootInternalHome
  };

  const isHome = pathname === "/";
  const isExternalRoute = (isHome && (routes.externalHome || !routes.internalHome)) ||
    pathMatches(pathname, routes.externalRoutes);
  const isInternalRoute = (isHome && !routes.externalHome && routes.internalHome) ||
    pathMatches(pathname, routes.internalRoutes);

  // Keep the login and registration pages reachable without a session.
  // These are conventional paths; if you use different ones, change them here.
  const isAuthPage = pathname === "/login" || pathname === "/register" ||
    pathname === "/sign-in" || pathname === "/sign-up";
  const isKnownRoute = isExternalRoute || isInternalRoute || isAuthPage;
  const internalPath = host.type === "subdomain"
    ? \`/\${host.subdomain}\${pathname === "/" ? "" : pathname}\`
    : pathname;

  if (!isKnownRoute) {
    return respond(rewrite(req, host.type === "subdomain"
      ? \`/\${host.subdomain}/not-found\` : "/not-found"));
  }

  const activeSession = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!activeSession && isInternalRoute) {
    return respond(redirect(req, "/login"));
  }

  if (activeSession && isExternalRoute && !isAuthPage) {
    // Only redirect when the target exists in this domain's internal routes.
    if (routes.internalRoutes.includes("dashboard")) {
      return respond(redirect(req, "/dashboard"));
    }
  }

  if (host.type === "subdomain") {
    return respond(rewrite(req, internalPath));
  }
  return respond(NextResponse.next());
}
`;
}

async function writeIfChanged(filename, content) {
	let previous = null;
	try {
		previous = await fsp.readFile(filename, "utf8");
	} catch (error) {
		if (error.code !== "ENOENT") throw error;
	}
	if (previous !== null && sha256(previous) === sha256(content)) return false;
	await fsp.writeFile(filename, content, "utf8");
	console.log(`[generate-proxy] Updated ${path.relative(PROJECT_ROOT, filename)}`);
	return true;
}

async function buildAndWriteMiddleware() {
	const routes = await buildPlatformRoutes();
	await writeIfChanged(
		SUBDOMAINS_JSON,
		`${JSON.stringify(
			routes.subdomains.map((subdomain) => ({ subdomain })),
			null,
			2
		)}\n`
	);
	await writeIfChanged(OUTPUT_PROXY, generateMiddlewareContent(routes));
	console.log(`[generate-proxy] ${routes.subdomains.length} subdomain(s): ${routes.subdomains.join(", ") || "none"}`);
}

function enqueueBuild() {
	buildQueue = buildQueue.catch(() => {}).then(buildAndWriteMiddleware);
	buildQueue.catch((error) => console.error("[generate-proxy] Build failed:", error));
	return buildQueue;
}

function scheduleBuild() {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(() => {
		void enqueueBuild();
	}, DEBOUNCE_MS);
}

async function startWatcher() {
	await enqueueBuild();
	console.log("[generate-proxy] Watching app/ for route changes...");
	const watcher = chokidar.watch(APP_DIR, {
		ignoreInitial: true,
		persistent: true,
		ignored: (candidate, stats) => {
			const relative = path.relative(APP_DIR, candidate);
			if (!relative || relative.startsWith("..")) return false;
			return relative.split(path.sep).some((part) => EXCLUDED_FOLDERS.has(part.toLowerCase()) || part.startsWith("_"));
		}
	});
	watcher.on("all", (event, changedPath) => {
		if (!["add", "unlink", "addDir", "unlinkDir"].includes(event)) return;
		console.log(`[generate-proxy] ${event}: ${path.relative(PROJECT_ROOT, changedPath)}`);
		scheduleBuild();
	});
	watcher.on("error", (error) => console.error("[generate-proxy] Watcher error:", error));
}

async function cli() {
	if (process.argv.includes("--once")) await enqueueBuild();
	else await startWatcher();
}

cli().catch((error) => {
	console.error("[generate-proxy] Fatal error:", error);
	process.exitCode = 1;
});

export { buildAndWriteMiddleware, startWatcher, collectRoutesForSubdomain, discoverSubdomains };
