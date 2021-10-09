# ReactJS Image Gallery

##### Refactoring the entire app in the [next-version branch](https://github.com/NazimHAli/react-image-gallery/tree/next-version). Replaced Webpack with vitejs and using vanilla styling, components instead of a component library.

ReactJS + [imgur](https://imgur.com/) built with WebPack 5 in TypeScript. Using a few components and styling from [material-ui](https://github.com/mui-org/material-ui) for the first iteration.

##### Mocked Data From API
If you don't want to register and use the free imgur API, it will use mocked data/saved responses from the API. It's also useful for faster local development so you don't have to make new requests with every HMR update.

##### Bundle
The bundle size is 347K, larger than anticipated. Even after implementing [mui best practices](https://mui.com/guides/minimizing-bundle-size/) like lazy-loading, code splitting...etc. After analyzing the bundle, realized that the standard React package has increased in size. 

[![CodeQL](https://github.com/NazimHAli/react-image-gallery/actions/workflows/codeql-analysis.yml/badge.svg?branch=master)](https://github.com/NazimHAli/react-image-gallery/actions/workflows/codeql-analysis.yml)

### [Live Demo](https://react-image-gallery-nazimali.vercel.app/)
![image](https://user-images.githubusercontent.com/26750288/135773516-5bf69971-7c8a-4e2a-8182-8c6240f7b436.png)


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
-   WebPack 5
-   Lazy loading & code splitting
-   [imgur API](https://api.imgur.com/)
-   [Material UI](https://github.com/mui-org/material-ui)

## TODO

-   [x] Add search capabilities
-   [x] Add explore by categories
-   [ ] Add more unit tests
-   [ ] Add integration tests
-   [ ] Add performance tests
-   [ ] Add accessibility tests
