import React, { Component } from "react";
import auth0 from "../lib/auth0";
import { fetchMe } from "../lib/users";

export default function withAuth(AuthComponent, authorize) {
    return class WithAuth extends Component {
        static async getInitialProps(ctx) {
            let pageProps = {};

            // Check if user logged in
            let user = null;
            if (typeof window === "undefined") {
                const session = await auth0.getSession(ctx.req);
                user = session && session.user;
            } else {
                const cookie = ctx.req && ctx.req.headers.cookie;
                user = await fetchMe(cookie);
            }

            // Authorize externally with IOC (Inversion of Control)
            const authorized = authorize ? authorize({ user }) : true;

            // Redirect if user not found
            if (!authorized && typeof window === "undefined") {
                ctx.res.writeHead(302, { Location: "/api/login" });
                ctx.res.end();
                return;
            } else if (!authorized && window !== "undefined") {
                return (window.location.href = "/api/login");
            }

            if (AuthComponent.getInitialProps) {
                pageProps = await AuthComponent.getInitialProps(ctx);
            }

            return { ...pageProps, authed: user };
        }

        render() {
            return <AuthComponent {...this.props} />;
        }
    };
}
