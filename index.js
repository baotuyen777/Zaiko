import { render } from 'react-dom'
import Layout from './components/Layout'
import auth from './modules/auth'
import product from './modules/product'
//import Youtube from './components/Youtube'
// import Examples from './modules/Examples'
import store from './redux/store/config'
import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)
render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */}
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={auth.Login} />
        <Route path="logout" component={auth.Logout} />
        <Route path="product/" component={product.List} >
          <IndexRoute component={product.List} />
          <Route path="list" component={product.List}></Route>
          <Route path="add" component={product.Add}></Route>
        </Route>

      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)