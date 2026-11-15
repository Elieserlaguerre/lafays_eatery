import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const currentDomain = atomWithStorage("current_domain", "");

export const currentUser = atomWithStorage("current_user", "");

export const openRegister = atom(false);

export const openLogin = atom(false);
