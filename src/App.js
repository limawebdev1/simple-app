import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SignIn } from './components/SignIn'
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
      <Router>
        <Route path="/" exact component={SignIn} />
        <Route path="/dashboard" exact component={Dashboard} />
      </Router>
  );
}

export default App;
