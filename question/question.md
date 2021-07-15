1、警告内容:
    Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Wave which is inside StrictMode.
    Instead, add a ref directly to the element you want to reference. Learn more about using refs safely
    here: https://fb.me/react-strict-mode-find-node
警告原因：
    是因为 react 中的严格模式: StrictMode
解决办法:
    (这是目前找到的唯一办法 _)
    在index.js中挂载 App 的外面有这样一个标签
    只要把这个标签(<React.StrictMode></React.StrictMode>)删除掉就可以了
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
2、react 配置ant时遇见的一个Error: Multiple configuration files found. Please remove one: – package.json#babel – .babelrc
问题原因：
    create react app 里面的package.json里面已经配置了
           "babel": {
             "presets": [
               "react-app"
             ]
           }
     同时又在根目录下新建了 .babelrc文件导致
解决方案：删除任意其中一项的配置即可

3、webpack.config.js配置less-loader加载器时报错(一)如下：
    Failed to compile
    ./src/stylus/index.less (./node_modules/css-loader/dist/cjs.js??ref--5-oneOf-8-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--5-oneOf-8-3!./src/stylus/index.less)
    TypeError: this.getOptions is not a function
问题原因：less-loader版本问题，安装less-loader@6.0.0版本即可解决该问题

4、webpack.config.js配置less-loader加载器时报错(二)如下：
ERROR in ./node_modules/.pnpm/registry.npmjs.org/antd/4.2.0_react-dom@16.13.1+react@16.13.1/node_modules/antd/dist/antd.less (./node_modules/.pnpm/registry.npmjs.org/css-loader/3.5.3_webpack@4.43.0/node_modules/css-loader/dist/cjs.js!./node_modules/.pnpm/registry.npmjs.org/less-loader/6.1.0_webpack@4.43.0/node_modules/less-loader/dist/cjs.js??ref--6-2!./node_modules/.pnpm/registry.npmjs.org/antd/4.2.0_react-dom@16.13.1+react@16.13.1/node_modules/antd/dist/antd.less)
Module build failed (from ./node_modules/.pnpm/registry.npmjs.org/less-loader/6.1.0_webpack@4.43.0/node_modules/less-loader/dist/cjs.js):
ValidationError: Invalid options object. Less Loader has been initialized using an options object that does not match the API schema.
 - options has an unknown property 'javascriptEnabled'. These properties are valid:
   object { lessOptions?, prependData?, appendData?, sourceMap?, implementation? }
    at validate (/home/<path>/react-web/node_modules/.pnpm/registry.npmjs.org/schema-utils/2.6.6/node_modules/schema-utils/dist/validate.js:88:11)
    at Object.lessLoader (/home/<path>/react-web/node_modules/.pnpm/registry.npmjs.org/less-loader/6.1.0_webpack@4.43.0/node_modules/less-loader/dist/index.js:22:28)
 @ ./node_modules/.pnpm/registry.npmjs.org/antd/4.2.0_react-dom@16.13.1+react@16.13.1/node_modules/antd/dist/antd.less 2:26-228
 @ ./src/index.tsx
 @ multi ./src/index.tsx
解决办法：
该javascriptEnabled标志不在顶级options对象下，而是在lessOptions子对象下。这是6.1.0^less-loader版本的最新更新标准。
options: {
            lessOptions: {
                javascriptEnabled: true,
            }
        }
