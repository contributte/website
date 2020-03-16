import path from "path";
import * as sidebar from "./utils/sidebar";
import * as releases from "./utils/releases";
import * as repositories from "./utils/repositories";

module.exports = {
  title: "Contributte",
  description: "First class extensions, addons and plugins for Nette Framework. Plenty of examples and tricks for Nette.",
  dest: path.resolve(__dirname, './../public'),
  themeConfig: {
    docsDir: "docs",
    docsBranch: "master",
    editLinks: false,
    editLinkText: "aHelp us improve this page!",
    algolia: {
      apiKey: "e2015bc524d8c80d122709059789e90f",
      indexName: "contributte"
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Blabs", link: "/blabs/" },
      { text: "Packages", link: "/packages/" },
      { text: "Releases", link: "/releases" },
      { text: "Examples", link: "/examples" },
      { text: "Contributing", link: "/contributing" },
      { text: "Partners", link: "/partners" },
      { text: "About", link: "/about" }
    ],
    lastUpdated: false,
    sidebar: sidebar.buildSidebar(),
    contributte: {
      packages: repositories.getEnabledRepositories().length,
    }
  },
  evergreen: true,
  markdown: {
    lineNumbers: true
  },
  postcss: {
    plugins: [
      require("autoprefixer"),
      require("tailwindcss")(path.resolve(__dirname, './../../../tailwind.config.js'))
    ]
  },
  extendPageData($page) {
    if ($page.regularPath === '/packages/') {
      $page.contributte = {
        repositories: repositories.getEnabledRepositories(),
      }
    }

    if ($page.regularPath === '/releases.html') {
      $page.contributte = {
        releases: releases.getFewReleases(20),
      }
    }
  },
  plugins: [
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-28123999-19"
      }
    ],
    [
      "vuepress-plugin-sitemap",
      {
        hostname: "https://contributte.org"
      }
    ],
    [
      require("./plugins/smartlook"),
      {
        id: "2144b6185ae4ade89a78aa0cae228b83fb9735a5"
      }
    ]
  ]
};