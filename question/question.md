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
