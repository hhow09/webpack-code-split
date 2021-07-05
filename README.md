# react-with-webpack

- [x] multi-entrypoint/app configuration

## Loader

- [x] babel loader
- [x] css-loader, style-loader, sass-loader
- [x] file-loader

## Optimization

- [x] minify js with [terser-webpack-plugin](https://webpack.js.org/plugins/terser-webpack-plugin/)
- [x] vender/main code splitting with [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)

## Dev Env

- [x] [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

## Scripts

1. start dev: `npm start`
2. build: `npm run build`
3. serve build: `npm run serve`

## Output Directory

```
build
├── index
│   └── index.js
├── index.html
├── todo
│   ├── index.html
│   └── todo.js
└── vendor.js
```

## Reference

- [Setup a React App using Webpack and Babel](https://anubhav7x.hashnode.dev/setup-a-react-app-using-webpack-and-babel)
- [leinov/react-multi-page-app](https://github.com/leinov/react-multi-page-app)
