// import React, { useState, useEffect } from "react";
import "./App.css";
import ImageFinder from "./components/ImageFinder/ImageFinder";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="container">
      <Header />
      <ImageFinder />
    </div>
  );
}

export default App;
