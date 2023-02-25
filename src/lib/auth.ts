import lucia, { type Session } from "lucia-auth";
import prisma from "@lucia-auth/adapter-prisma";
import db from "$lib/db"
import { dev } from "$app/environment";
import type { Handle } from "@sveltejs/kit";
import { handleHooks, handleServerSession } from "@lucia-auth/sveltekit";
import type { LayoutServerLoad } from "../routes/$types";
import type { PageData } from "@lucia-auth/sveltekit/types";

const auth = lucia({
	adapter: prisma(db),
	env: dev ? "DEV" : "PROD"
});
export default auth;
export type Auth = typeof auth;

export function hooks(): Handle {
    return async (request) => {
        const { event, resolve } = request;
        // @ts-ignore
        const lucia = await (handleHooks(auth))(request)
        let getSessionPromise: any;
        let getSessionUserPromise: any;
        request.event.locals.Hvalidate = async () => {
            if (getSessionPromise) return getSessionPromise;
            if (getSessionUserPromise) return (await getSessionUserPromise).session;
            getSessionPromise = new Promise(async (resolve) => {
                try {
                    const sessionId = event.request.headers.get("x-lucia-auth") || "";
                    const session = await auth.validateSession(sessionId);
                    // if (session.isFresh) {
                    //     event.locals.setSession(session);
                    // }
                    resolve(session);
                }
                catch {
                    event.locals.setSession(null);
                    resolve(null);
                }
            });
            return getSessionPromise;
        }
        event.locals.HvalidateUser = async () => {
            if (getSessionUserPromise) return getSessionUserPromise;
            getSessionUserPromise = new Promise(async (resolve) => {
                try {
                    const sessionId = event.request.headers.get("x-lucia-auth") || "";
                    const { session, user } = await auth.validateSessionUser(sessionId);
                    // if (session.isFresh) {
                    //     event.locals.setSession(session);
                    // }
                    resolve({ session, user });
                }
                catch {
                    resolve({
                        session: null,
                        user: null
                    });
                }
            });
        }
        return lucia
    }
}

export function layout(): LayoutServerLoad {
    return async (request) => {
        const { locals } = request
        const lucia = await (handleServerSession())(request) as PageData & { _lucia: { session: Session | null } }
        if(!lucia._lucia) return lucia
        lucia._lucia.user = await lucia._lucia?.user
        lucia._lucia.session = await locals.validate()
        return {
            ...lucia,
            pathname: request.url.pathname
        }
    }
}