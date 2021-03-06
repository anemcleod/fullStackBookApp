import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Legal from './components/subPages/legal';
import PaymentResult from './components/subPages/paymentResult';
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
              <Route exact path="/payment" component={PaymentResult}/>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
