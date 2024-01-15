'use strict';

/**
 * article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

interface PopulateTypes {
  [key: string]: boolean | PopulateTypes;
}

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  // Query by slug
  async findOne(ctx) {
    // thanks to the custom route we have now a slug variable
    // instead of the default id
    const { slug } = ctx.params;
    const user = ctx.state?.user;
    const populateContent: PopulateTypes = {
      image: true,
      author: true,
      categories: true
    }
    if (user) populateContent.comments = true;
    const entity = await strapi.db.query('api::article.article').findOne({
      where: { slug },
      populate: populateContent
    });
    // const sanitizedEntity = await (this as any).sanitizeOutput(entity, ctx);

    // return (this as any).transformResponse(sanitizedEntity);
    return (this as any).transformResponse(entity);
  },
}));
