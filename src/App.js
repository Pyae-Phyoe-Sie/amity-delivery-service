import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './pages/Navbar';
import CalculateCost from './pages/CalculateCost';
import PossibleRoute from './pages/PossibleRoute.jsx';
import NotFound from './pages/NotFound';
import Home from './pages/Home'
import Footer from './pages/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/calculate-cost">
              <CalculateCost />
            </Route>
            <Route exact path="/possible-route">
              <PossibleRoute />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
