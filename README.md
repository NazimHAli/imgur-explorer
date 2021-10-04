# ReactJS Image Gallery

ReactJS + [imgur](https://imgur.com/) built with WebPack 5 in TypeScript. Using a few components and styling from [material-ui](https://github.com/mui-org/material-ui) for the first iteration. If you don't want to register or use the free imgur API, the app will default to the hard-coded responses. It's also useful for faster local development.

The bundle size is 347K, larger than anticipated. Even after implementing [mui best practices](https://mui.com/guides/minimizing-bundle-size/) like lazy-loading, code splitting...etc. After analyzing the bundle, realized that the standard React package has increased in size. 

[![Dependecy Status](https://david-dm.org/NazimHAli/react-image-gallery.svg)](https://david-dm.org/NazimHAli/react-image-gallery)  
[![devDependencies Status](https://david-dm.org/NazimHAli/react-image-gallery/dev-status.svg)](https://david-dm.org/NazimHAli/react-image-gallery?type=dev)

### [Live Demo](https://react-image-gallery-five.vercel.app/)
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
