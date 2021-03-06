import repositories from './../../../resources/repositories.json';
import path from "path";
import _ from "lodash-es";

module.exports = {
  title: "Contributte Status",
  description: "Contribute Status",
  dest: path.resolve(__dirname, './../public'),
  themeConfig: {
    search: false
  },
  evergreen: true,
  postcss: {
    plugins: [
      require("tailwindcss")(path.resolve(__dirname, './../../../tailwind.config.js'))
    ]
  },
  extendPageData($page) {
    $page.contributte = {
      repositories: _(repositories)
        .filter(r => r.enabled)
        .orderBy(['org', 'name'], ['asc', 'asc'])
        .value(),
    }
  }
};
