'use strict';

/**
 * distance service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::distance.distance');
