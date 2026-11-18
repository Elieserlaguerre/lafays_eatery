/*
 * AUTO-GENERATED proxy.js — DO NOT EDIT DIRECTLY.
 * Edit scripts/generate-proxy.js or app/ routes instead.
 */
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const ROUTING = {
  "platformRoutes": [
    {
      "subdomain": "admin",
      "externalRoutes": [
        "legal"
      ],
      "internalRoutes": [
        "account",
        "categories",
        "dashboard",
        "metrics",
        "orders",
        "policies",
        "products",
        "promotions"
      ],
      "externalHome": true,
      "internalHome": false
    },
    {
      "subdomain": "careers",
      "externalRoutes": [],
      "internalRoutes": [],
      "externalHome": true,
      "internalHome": false
    },
    {
      "subdomain": "support",
      "externalRoutes": [],
      "internalRoutes": [],
      "externalHome": true,
      "internalHome": false
    }
  ],
  "rootExternalRoutes": [
    "terms"
  ],
  "rootInternalRoutes": [
    "dashboard",
    "view"
  ],
  "rootExternalHome": true,
  "rootInternalHome": false
};
export const PLATFORM_ROUTES = ROUTING.platformRoutes;
export const ROOT_EXTERNAL_ROUTES = ROUTING.rootExternalRoutes;
export const ROOT_INTERNAL_ROUTES = ROUTING.rootInternalRoutes;

export const config = {
  matcher: ["/((?!api(?:/|$)|_next(?:/|$)|favicon.ico$|robots.txt$|sitemap.xml$).*)"]
};

function pathMatches(pathname, segments) {
  return segments.some((segment) =>
    pathname === `/${segment}` || pathname.startsWith(`/${segment}/`)
  );
}

function resolveHost(hostname) {
  const rootDomain = (process.env.ROOT_DOMAIN || "lafayseatery.com")
    .toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/:\d+$/, "");
  const vercelHost = (process.env.VERCEL_URL || "").toLowerCase();
  if (hostname === rootDomain || hostname === `www.${rootDomain}` ||
      hostname === "localhost" || hostname === "127.0.0.1" ||
      (vercelHost && hostname === vercelHost)) {
    return { type: "root", subdomain: null };
  }
  let subdomain = null;
  if (hostname.endsWith(`.${rootDomain}`)) {
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
    ? `/${host.subdomain}${pathname === "/" ? "" : pathname}`
    : pathname;

  if (!isKnownRoute) {
    return respond(rewrite(req, host.type === "subdomain"
      ? `/${host.subdomain}/not-found` : "/not-found"));
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
