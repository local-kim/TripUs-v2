import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouteMain from "./RouteMain";
import { Menu, Foot } from "./components";
import './App.css';

function App() {
 
  return (
    <BrowserRouter>
      <Menu/>
      <RouteMain/>
    </BrowserRouter>
  );
}

export default App;
