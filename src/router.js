import React from 'react'
// import { Router, Route, Switch, Redirect, routerRedux } from 'dva/router'
import { Router, Route, Switch, Redirect, routerRedux } from 'dva/router'
// import IndexPage from './routes/IndexPage'
// import Users from './routes/Users'
import App from './routes/App'

import dynamic from 'dva/dynamic' // 路由按需加载

const { ConnectedRouter } = routerRedux;

// function RouterConfig({ history ,app}) {
let  RouterConfig = ( {history ,app}) =>{//ES6方式
  const IndexPage = dynamic({
    app,
    component: () => import('./routes/IndexPage')
});
  const Tests = dynamic({
    app,
    component: () => import('./routes/Tests')
});
  const Users = dynamic({
    app,
    component: () => import('./routes/Users')
});
  return (
    //<Router history={history}>
    <ConnectedRouter history={history}>{/*使用Redux方式*/}
    <App>
    <Switch>
    <Route path="/" exact component={IndexPage} />
  <Route path="/users" exact component={Users} />
  <Route path="/tests" exact component={Tests} />
  <Route path="*" render={() => <Redirect to="users" />} />
  </Switch>
  </App>
  </ConnectedRouter>
  // </Router>
)
}

export default RouterConfig

