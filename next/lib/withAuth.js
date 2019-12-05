import React, { Component } from "react";
import auth0 from "../lib/auth0";
import { fetchMe } from "../lib/users";

export default function withAuth(AuthComponent) {
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

            if (AuthComponent.getInitialProps) {
                pageProps = await AuthComponent.getInitialProps({ ...ctx, authed: user });
            }

            // Authorization is handled in getInitialProps using IOC (Inversion of Control)
            // If the page needs to be redirected, return the `redirect` prop with a relative url.

            const { redirect } = pageProps;

            // Redirect if user not found
            if (redirect && typeof window === "undefined") {
                ctx.res.writeHead(302, { Location: redirect });
                ctx.res.end();
                return;
            } else if (redirect && window !== "undefined") {
                return (window.location.href = redirect);
            }

            return { ...pageProps, authed: user };
        }

        render() {
            return <AuthComponent {...this.props} />;
        }
    };
}
