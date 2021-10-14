module.exports = (ctx) => ({
  parser: ctx.parser ? "sugarss" : false,
  map: ctx.env === "development" ? ctx.map : false,
  plugins: {
    tailwindcss: {},
    "postcss-import": {},
    "postcss-nested": {},
    // "@fullhuman/postcss-purgecss": {
    //   content: ["./**/*.html", "./src/**/*.tsx", "./src/**/*.ts"],
    // },
    cssnano: ctx.env === "production" ? {} : false,
  },
});
