import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// Match the "/auth" route
const isSignInPage = createRouteMatcher(["/auth"]);
// Match all routes except "/auth"
const isAnyProtectedRoute = createRouteMatcher(["/((?!auth).*)"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  const isAuthenticated = await convexAuth.isAuthenticated();

  // If the user is authenticated and tries to visit "/auth", redirect to "/"
  if (isSignInPage(request) && isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/");
  }

  // If the user is NOT authenticated and tries to access any route (except "/auth"), redirect to "/auth"
  if (isAnyProtectedRoute(request) && !isAuthenticated && !isSignInPage(request)) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  return; // Continue with the request if no redirect condition is met
});

export const config = {
  // The following matcher runs middleware on all routes except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
