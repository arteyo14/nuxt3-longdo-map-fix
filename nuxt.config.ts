// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ["@/assets/styles/style.css"],
  modules: [
    // ...
    "@pinia/nuxt",
  ],
  // app: {
  //   head: {
  //     script: [
  //       {
  //         src: "/js/heatmap.js",
  //         body: true,
  //       },
  //       { src: "/js/longdomap-heatmap.js", body: true },
  //     ],
  //   },
  // },
});
