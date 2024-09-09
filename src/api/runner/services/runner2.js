module.exports = {
  allRunnersList: async () => {
    try {

      const entries = await strapi.entityService.findMany(
        "api::runner.runner",
        {
          fields: ["id", "firstName", "lastName", "midName", "year", "location"],
          populate: ["members.team.distance"],
        },

      );




      let entriesReduced;
      let cnt = 0;
      if (entries && Array.isArray(entries)) {
        entriesReduced = entries.reduce((acc, item) => {

          const starts = item.members.reduce((acc, memberItem) => {
            return acc + (!memberItem.dns && !memberItem.team.dns);
          }, 0);

          acc.push({
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            midName: item.midName,
            starts,
            year: item.year,
            location: item.location
          });

          cnt++;
          return acc;
        }, []).sort((a,b) => a.starts <= b.starts ? 1 : -1);
      }

      return entriesReduced;
    } catch (err) {
      return err;
    }
  },
};
