const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
    plugins: [
        require("cssnano"),
        require('autoprefixer'),
        purgecss({
            content: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.ts'],
            fontFace: true
        })
    ],
};
