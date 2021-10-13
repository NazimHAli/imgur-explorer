# ReactJS Image Gallery

ReactJS + [imgur API](https://imgur.com/) + [vitejs bundler](https://github.com/vitejs/vite) in TypeScript.

##### Mocked Data From API

If you don't want to register and use the free imgur API, it will use mocked data/saved responses from the API. It's also useful for faster local development so you don't have to make new requests with every HMR update.

[![DeepSource](https://deepsource.io/gh/NazimHAli/react-image-gallery.svg/?label=active+issues&show_trend=true&token=aO_Hx9m4iDxMopueaxAigoGd)](https://deepsource.io/gh/NazimHAli/react-image-gallery)
[![DeepSource](https://deepsource.io/gh/NazimHAli/react-image-gallery.svg/?label=resolved+issues&show_trend=true&token=aO_Hx9m4iDxMopueaxAigoGd)](https://deepsource.io/gh/NazimHAli/react-image-gallery)
[![CodeQL](https://github.com/NazimHAli/react-image-gallery/actions/workflows/codeql-analysis.yml/badge.svg?branch=master)](https://github.com/NazimHAli/react-image-gallery/actions/workflows/codeql-analysis.yml)
[![Unit Tests](https://github.com/NazimHAli/react-image-gallery/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/NazimHAli/react-image-gallery/actions/workflows/unit-tests.yml)

##### Google PageSpeed Scores (need to automate to add a badege for live scores)

- Mobile [93/100](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Freact-image-gallery-master.vercel.app%2F&tab=mobile)
- Desktop [99/100](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Freact-image-gallery-master.vercel.app%2F&tab=desktop)

### [Live Demo](https://react-image-gallery-master.vercel.app/)

![image](https://user-images.githubusercontent.com/26750288/137044824-b6e36bdd-c04f-4c7e-b999-db78740e21ef.png)

## Quick start

```bash
yarn
yarn dev
```

## Build

```bash
yarn build
yarn serve
```

## Use imgur API

1. [Free registration](https://api.imgur.com/oauth2/addclient)
2. Pass the client ID as an environemnt variable (can be in .env or through CLI)
   - `PUBLIC_IMGUR_CLIENT_ID=xxxxx yarn dev`

## Features

- ReactJS with TypeScript
- ViteJS
- Lazy loading & code splitting
- [imgur API](https://api.imgur.com/)

## TODO

### Features

- [x] Search
- [x] Sort results
- [x] Explore by categories
- [x] Explore tags
- [ ] Profile login
- [ ] Upload images

### Tests

- [ ] ~70% unit test coverage
- [ ] Cypress performance & integration tests
- [ ] Accessibility tests
