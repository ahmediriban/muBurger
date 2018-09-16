import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';


import Layout from './components/Layout/Layout';
import CheckOut from "./containers/CheckOut/CheckOut";
import Orders from "./containers/Orders/Orders";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Switch>
                <Route path="/checkout" component={CheckOut}/>
                <Route path="/orders" component={Orders}/>
                <Route path="/" exact component={BurgerBuilder}/>
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
