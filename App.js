// // import logo from './logo.svg';
// // import './App.css';
// import MainContainer from "./main_container";

// function App() {
//   return (
//     <div className="App">
//       <MainContainer />
//     </div>
//   );
// }

// export default App;

import React, { Component } from 'react'

import Header from './Components/Header'
import Home from './Components/Home'
import Footer from './Components/Footer'

import './style.css'


export class App extends Component {
  render() {
    return (
      <>
        <Header></Header>
        <Home></Home>
        <Footer></Footer>
      </>
    )
  }
}

export default App
