const purgecss = require("@fullhuman/postcss-purgecss");
const cssnano = require("cssnano");
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss/nesting"),
    require("tailwindcss"),
    isProd ? require("autoprefixer") : null,
    isProd ? cssnano({ preset: "default" }) : null,
    isProd
      ? purgecss({
          content: ["./*.html", "./src/**/*.tsx", "./src/**/*.ts"],
          defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        })
      : null,
  ],
};
