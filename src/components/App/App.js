import React from 'react';
import Counter from '../Counter';
import Random from '../Random';
import Basket from '../Basket';
import classes from './App.module.css';

const App = () => (
  <div className={classes.container}>
    <Counter />
    <Random />
    <Basket />
  </div>
);

export default App;
