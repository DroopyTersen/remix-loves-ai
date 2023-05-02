const { remarkCodeHike } = require("@code-hike/mdx")
const theme = require("shiki/themes/light-plus.json")


/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: false,
    unstable_tailwind: true,
  },
  mdx: {
    remarkPlugins: [[remarkCodeHike, { theme }]],
  },
};
