import { Component } from 'react';

import { GlobalStyle } from './GlobalStyle';
import Searchbar from './Searchbar/Searchbar';
// import { Box } from './Box';


class App extends Component {
  
  render() {
    return (
      <>
      <Searchbar />
      <GlobalStyle />
      </>
    );
   
  }
};


export default App;