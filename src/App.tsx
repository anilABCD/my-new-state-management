import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import GlobalState from './GlobalState/Global';
import uuidv4 from 'uuidv4';
import TestingState from './TestingState';
import Products from './Products';

function App() {

  let [updateState, setUpdateState] = useState<string>("");

   let state = GlobalState;
   
   useEffect(()=>{
    state.register(setUpdateState);
     return () =>{
        state.unRegister(setUpdateState);
     }
   },[])

   function increment(){
      // option one to update ;
      state.incrementNumber();
      // using this.update in incrementNumber function(). 

      // option two to update ... 
      state._increment+=25;
      state.update();
   }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
       
        {
          state._increment
        }

        <button onClick={increment} >Hello world</button>

      { state.products.length > 1 && <Products></Products>}
      { state.products.length > 1 && <Products></Products>}
       <Products></Products>

      <Products></Products>

       <TestingState></TestingState>
        
      </header>
    </div>
  );
}

export default App;
