module.exports = {
  routes: [
    {
      method: "GET",
      path: "/allRunnersData",
      handler: "runner2.allRunnersListCtrl",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
