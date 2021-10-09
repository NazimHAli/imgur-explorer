# ReactJS Image Gallery

##### Refactoring the entire app in the [next-version branch](https://github.com/NazimHAli/react-image-gallery/tree/next-version). Replaced Webpack with vitejs and using vanilla styling, components instead of a component library.

ReactJS + [imgur API](https://imgur.com/) + [vitejs bundler](https://github.com/vitejs/vite) in TypeScript.

##### Mocked Data From API
If you don't want to register and use the free imgur API, it will use mocked data/saved responses from the API. It's also useful for faster local development so you don't have to make new requests with every HMR update.

[![DeepSource](https://deepsource.io/gh/NazimHAli/react-image-gallery.svg/?label=active+issues&show_trend=true&token=aO_Hx9m4iDxMopueaxAigoGd)](https://deepsource.io/gh/NazimHAli/react-image-gallery)
[![DeepSource](https://deepsource.io/gh/NazimHAli/react-image-gallery.svg/?label=resolved+issues&show_trend=true&token=aO_Hx9m4iDxMopueaxAigoGd)](https://deepsource.io/gh/NazimHAli/react-image-gallery)
[![CodeQL](https://github.com/NazimHAli/react-image-gallery/actions/workflows/codeql-analysis.yml/badge.svg?branch=master)](https://github.com/NazimHAli/react-image-gallery/actions/workflows/codeql-analysis.yml)

### [Live Demo](https://react-image-gallery-next.vercel.app/)
![image](https://user-images.githubusercontent.com/26750288/136664356-709cee1c-9eca-4959-b44a-4bd7444c31a4.png)


## Quick start

```bash
yarn
yarn start
```

## Build

```bash
yarn build
yarn serve
```

## Use imgur API

1. [Free registration](https://api.imgur.com/oauth2/addclient)
2. Pass the client ID as an environemnt variable
    - ```imgurClientId=xxxxx yarn start```

## Features

-   ReactJS with TypeScript
-   ViteJS
-   Lazy loading & code splitting
-   [imgur API](https://api.imgur.com/)

## TODO

-   [x] Add search capabilities
-   [x] Add explore by categories
-   [ ] Add more unit tests
-   [ ] Add integration tests
-   [ ] Add performance tests
-   [ ] Add accessibility tests
