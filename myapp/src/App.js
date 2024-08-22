import { BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Home from "./screens/Home"
import Login from "./screens/Login"
import Signup from './screens/Signup.js';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/createuser" element={<Signup/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
