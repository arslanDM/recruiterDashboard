const fg = require("fast-glob");

(async () => {
  const routeFiles = await fg(["**/*.routes.js"]);
  for (let routeFile of routeFiles) {
    const routeObj = require(path.resolve(`${routeFile}`));
    if (typeof routeObj === "function") {
      app.use(`/api`, routeObj);
    } else if (typeof routeObj === "object") {
      app.use(`/api/${routeObj.prefix}`, routeObj.router);
    } else {
      throw `router is missing in  ${routeFile} file`;
    }
  }
})();
