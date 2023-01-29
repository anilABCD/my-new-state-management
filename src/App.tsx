import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import GlobalState from './GlobalState/Global';
import uuidv4 from 'uuidv4';
import TestingState from './TestingState';
import Products from './Products';

function App() {

  let [updateState, setUpdateState] = useState<string>("");
  let [stateId, setStateId] = useState<string>("");
   let state = GlobalState;
   
   useEffect(()=>{
    let uuid = uuidv4();
    setStateId(uuid)
    state.register(uuid,setUpdateState);
     
   },[])

   function increment(){
      state.incrementNumber(stateId);
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

      <Products></Products>

      <Products></Products>

       <TestingState></TestingState>
        
      </header>
    </div>
  );
}

export default App;
