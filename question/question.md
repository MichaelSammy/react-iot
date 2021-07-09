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
