'use strict';

/**
 * event controller
 */

import { factories } from '@strapi/strapi';
const { createCoreController } = factories;

interface PopulateTypes {
  [key: string]: boolean | PopulateTypes;
}

module.exports = createCoreController('api::event.event', ({ strapi }) => ({
  // Query by slug
  async findOne(ctx) {
    // thanks to the custom route we have now a slug variable
    // instead of the default id
    const { slug } = ctx.params;
    const populateContent: PopulateTypes = {
      basicArticleData: {
        populate: {
          image: true,
          author: true,
        },
      },
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
      },
      categories: true
    }
    const entity = await strapi.db.query('api::event.event').findOne({
      where: { slug },
      populate: populateContent
    });
    // const sanitizedEntity = await (this as any).sanitizeOutput(entity, ctx);

    // return (this as any).transformResponse(sanitizedEntity);
    return (this as any).transformResponse(entity);
  },
}));
