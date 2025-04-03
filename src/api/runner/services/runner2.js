module.exports = {
  allRunnersList: async () => {
    try {

      const entries = await strapi.entityService.findMany(
        "api::runner.runner",
        {
          fields: ["id", "firstName", "lastName", "midName", "year", "location"],
          populate: ["members.team.distance.race"],
        },

      );

      const allRaces = await strapi.entityService.findMany(
        "api::race.race",
        {
          fields: ["id", "ddate", "sname"],
          sort: ["ddate:desc"]
        },

      );

      const racesVector = allRaces.reduce((acc, raceItem) => {
        const curYear = raceItem.ddate.slice(0, 4);
        const nextCell = {
          code: raceItem.sname.slice(0, 1).toUpperCase(),
          sname: raceItem.sname,
          id: raceItem.id
        };

        return {...acc,
          [curYear]: acc[curYear]
            ? [nextCell, ...acc[curYear]]
            : [nextCell],
        }
      },{});



      let entriesReduced;
      let cnt = 0;
      if (entries && Array.isArray(entries)) {
        entriesReduced = entries.reduce((acc, item) => {

          const starts = item.members.reduce((acc, memberItem) => {

            return !memberItem.dns && !memberItem.team.dns
              ? acc.concat(memberItem.team.distance.race.id)
              : acc;
          }, []);

          if (starts.length) {
            acc.push({
              id: item.id,
              firstName: item.firstName,
              lastName: item.lastName,
              midName: item.midName,
              startsCount: starts.length,
              startsVector: starts,
              year: item.year,
              location: item.location
            });
          }

          cnt++;
          return acc;
        }, [])

          .sort((a,b) => a.startsCount <= b.startsCount
          ? (a.startsCount < b.startsCount
                         ? 1
                         : (`${a.lastName ? a.lastName : "яя"} ${a.firstName}`.toUpperCase() >
                            `${b.lastName ? b.lastName : "яя"} ${b.firstName}`.toUpperCase() ? 1 : -1)
                           )
          : -1);

      }

      return {
         racesVector,
         runners: entriesReduced,
      };
    } catch (err) {
      return err;
    }
  },
};
