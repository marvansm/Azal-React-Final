import { createRootRoute, createRoute } from "@tanstack/react-router";
import Layout from "../Layout";
import HomePage from "../Featured/Pages/Home";
import BookingPage from "../Featured/Pages/Booking";

export const rootRoute = createRootRoute({
  component: Layout,
});

export const HomeRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
export const BookingPageRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking",
  component: BookingPage,
});

export const routeTree = rootRoute.addChildren([HomeRouter, BookingPageRouter]);
