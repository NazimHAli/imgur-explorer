# ReactJS Image Gallery

ReactJS + [imgur API](https://imgur.com/) + [vitejs bundler](https://github.com/vitejs/vite) in TypeScript.

##### Mocked Data From API

If you don't want to register and use the free imgur API, it will use mocked data/saved responses from the API. It's also useful for faster local development so you don't have to make new requests with every HMR update.

[![DeepSource](https://deepsource.io/gh/NazimHAli/react-image-gallery.svg/?label=active+issues&show_trend=true&token=aO_Hx9m4iDxMopueaxAigoGd)](https://deepsource.io/gh/NazimHAli/react-image-gallery)
[![DeepSource](https://deepsource.io/gh/NazimHAli/react-image-gallery.svg/?label=resolved+issues&show_trend=true&token=aO_Hx9m4iDxMopueaxAigoGd)](https://deepsource.io/gh/NazimHAli/react-image-gallery)
[![CodeQL](https://github.com/NazimHAli/react-image-gallery/actions/workflows/codeql-analysis.yml/badge.svg?branch=master)](https://github.com/NazimHAli/react-image-gallery/actions/workflows/codeql-analysis.yml)

### [Live Demo](https://react-image-gallery-next.vercel.app/)

![image](https://user-images.githubusercontent.com/26750288/136707348-2f777355-4657-47ea-a428-b1f2f77c51eb.png)

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
- [ ] WIP - Explore by categories
- [ ] Explore tags
- [ ] Profile login
- [ ] Upload images

### Tests

- [ ] ~70% unit test coverage
- [ ] Cypress performance & integration tests
- [ ] Accessibility tests
