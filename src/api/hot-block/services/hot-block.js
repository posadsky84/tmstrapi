'use strict';

/**
 * hot-block service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hot-block.hot-block');
