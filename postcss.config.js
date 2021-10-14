const purgecss = require("@fullhuman/postcss-purgecss");
const cssnano = require("cssnano");

module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss/nesting"),
    require("tailwindcss"),
    process.env.NODE_ENV === "production" ? require("autoprefixer") : null,
    process.env.NODE_ENV === "production"
      ? cssnano({ preset: "default" })
      : null,
    purgecss({
      content: ["./**/*.html", "./src/**/*.tsx", "./src/**/*.ts"],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};
