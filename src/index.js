import React from 'react';
import ReactDOM from 'react-dom';
import zhCN from 'antd/lib/locale/zh_CN';
// import './index.css';
import {ConfigProvider} from 'antd';
import './stylus/index.less'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store'
import {HashRouter, Route} from 'react-router-dom'

const Main = () =>{
    return (
        <ConfigProvider locale={zhCN} autoInsertSpaceInButton={false}>
            <Provider store={store}>
                <HashRouter basename='/'>
                    <Route path={`/`} component={App}></Route>
                </HashRouter>
            </Provider>
        </ConfigProvider>
    )
}

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
