/**
 * booking controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::booking.booking",
  ({ strapi }) => ({
    async create(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("You must be logged in to create a booking");
      }

      const { data } = ctx.request.body;

      // Use Document Service API for Strapi v5
      try {
        const entity = await strapi.documents("api::booking.booking").create({
          data: {
            ...data,
            user: user.documentId, // Assign user relation using documentId
          },
          status: "published",
        });

        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity);
      } catch (error) {
        // fallback if documents service throws validation error
        // keep original error format if possible or rethrow
        ctx.throw(400, error);
      }
    },
  })
);
