import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Legal from './components/subPages/legal';
import PaymentSuccess from './components/subPages/paymentSuccess';
import PaymentFailure from './components/subPages/paymentFailure';
import Story from './components/story';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);


function App() {
  return (
    <Router>
        <div className="App">
          <Switch>
              <Route exact path="/" component={Story}/>
              <Route exact path="/terms_and_conditions" component={Legal}/>
              <Route exact path="/payment_success" component={PaymentSuccess}/>
              <Route exact path="/payment_failure" component={PaymentFailure}/>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
