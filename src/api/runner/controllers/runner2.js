module.exports = {
  async allRunnersListCtrl(ctx, next) {
    try {
      const data = await strapi
        .service("api::runner.runner2")
        .allRunnersList();

      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Post report controller error runnersAll", { moreDetails: err });
    }
  },
};
