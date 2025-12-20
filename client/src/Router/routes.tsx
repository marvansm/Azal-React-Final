import { createRootRoute, createRoute } from "@tanstack/react-router";
import Layout from "../Layout";
import HomePage from "../Featured/Pages/Home";
import BookingPage from "../Featured/Pages/Booking";
import PersonalCabinet from "../Featured/Pages/PersonalCabinet";
import Login from "../Featured/Pages/Login";

import ConfirmationPage from "../Featured/Pages/Confirmation";
import PassengerInfoPage from "../Featured/Pages/PassengerInfo";
import DataConfirmationPage from "../Featured/Pages/DataConfirmation";
import PaymentPage from "../Featured/Pages/Payment";

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
  validateSearch: (search: Record<string, unknown>) => ({
    from: (search.from as string) || "",
    to: (search.to as string) || "",
    start: (search.start as string) || "",
    end: (search.end as string) || undefined,
    adults: Number(search.adults) || 1,
    children: Number(search.children) || 0,
    infants: Number(search.infants) || 0,
    class: (search.class as string) || "economy",
  }),
});

export const PersonalCabinetRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cabinet",
  component: PersonalCabinet,
});

export const LoginRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

export const ConfirmationRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/confirmation",
  component: ConfirmationPage,
  validateSearch: (search: Record<string, unknown>) => ({
    outboundId: search.outboundId as string | number,
    inboundId: search.inboundId as string | number | undefined,
    class: (search.class as string) || "economy",
    adults: Number(search.adults) || 1,
    children: Number(search.children) || 0,
    infants: Number(search.infants) || 0,
  }),
});

export const PassengerInfoRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/passenger-details",
  component: PassengerInfoPage,
  validateSearch: (search: Record<string, unknown>) => ({
    outboundId: search.outboundId as string | number,
    inboundId: search.inboundId as string | number | undefined,
    class: (search.class as string) || "economy",
    adults: Number(search.adults) || 1,
    children: Number(search.children) || 0,
    infants: Number(search.infants) || 0,
  }),
});

export const DataConfirmationRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/data-confirmation",
  component: DataConfirmationPage,
  validateSearch: (search: Record<string, unknown>) => ({
    bookingId: search.bookingId as string | number,
  }),
});

export const PaymentRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment",
  component: PaymentPage,
  validateSearch: (search: Record<string, unknown>) => ({
    bookingId: search.bookingId as string | number,
    totalPrice: Number(search.totalPrice) || 0,
  }),
});

export const routeTree = rootRoute.addChildren([
  HomeRouter,
  BookingPageRouter,
  PersonalCabinetRouter,
  LoginRouter,
  ConfirmationRouter,
  PassengerInfoRouter,
  DataConfirmationRouter,
  PaymentRouter,
]);
