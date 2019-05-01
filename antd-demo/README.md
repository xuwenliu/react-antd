This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### 1.按需加载antd组件样式配置在packag.json---移步到.babelrc文件
```js
    "babel": {
        "presets": [
            "react-app"
        ],
        "plugins": [
            [
                "import",
                {
                    "libraryName": "antd",
                    "style": true
                }
            ]
        ]
    }
```

### 2.less配置在webpack.config.js
`getStyleLoaders 方法添加第三个参数`


### 3.yarn build 后执行下面命令可以访问打包后的项目
    yarn global add serve
    serve -s build 本地访问打包后的页面


### 4.项目部署到  [https://xuwenliu.github.io/react-antd](https://xuwenliu.github.io/react-antd)
    1.安装gh-pages
        npm install gh-pages --save-dev
    2.package.json 添加     
        "homepage":"https://xuwenliu.github.io/react-antd",
    3.package.json script里面 添加     
        "predeploy": "yarn build",
        "deploy": "gh-pages -d build"
    4.yarn build
    5.yarn run deploy

    5.参考链接 https://blog.csdn.net/Que_Li/article/details/80566111
    

### 5.本项目所有mock数据 https://www.easy-mock.com/project/5c83123e23107a1da64ea2fb


### 6.react-antd https://ant.design/docs/react/introduce-cn



    

