'use strict';

/**
 * hot-block router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::hot-block.hot-block');
