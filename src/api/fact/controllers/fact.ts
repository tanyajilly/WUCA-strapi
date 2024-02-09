'use strict';

/**
 * fact controller
 */

import { factories } from '@strapi/strapi';
const { createCoreController } = factories;

interface PopulateTypes {
  [key: string]: boolean | PopulateTypes;
}

module.exports = createCoreController('api::fact.fact', ({ strapi }) => ({
  // Query by slug
  async findOne(ctx) {
    // thanks to the custom route we have now a slug variable
    // instead of the default id
    const { slug } = ctx.params;
    let { locale } = ctx.query;
    // Default locale fallback
    const DEFAULT_LOCALE = "en";
    if (!locale) {
      locale = DEFAULT_LOCALE;
    }
    const populateContent: PopulateTypes = {
      image: true,
      author: true,
      categories: true,
      pageContent: {
        populate: {
          image: true,
          video: true,
          photo: {
            populate: {
              image: true
            }
          }
        }
      }
    }
    let entity = await strapi.db.query('api::fact.fact').findOne({
      where: { slug, locale },
      populate: populateContent
    });
    if (!entity && locale !== DEFAULT_LOCALE) {
      entity = await strapi.db.query('api::fact.fact').findOne({
        where: { slug, locale: DEFAULT_LOCALE },
        populate: populateContent
      });
    }
    if (!entity) {
      return ctx.notFound("Page not found");
    }
    // const sanitizedEntity = await (this as any).sanitizeOutput(entity, ctx);

    // return (this as any).transformResponse(sanitizedEntity);
    return (this as any).transformResponse(entity);
  },
}));
