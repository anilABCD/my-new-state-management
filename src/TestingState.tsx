
import React, { useEffect, useState } from 'react'
import uuidv4 from 'uuidv4';
import globalState from './GlobalState/Global'

interface Props {}

function TestingState(props: Props) {

    const [updateState, setUpdateState]  = useState<string>("");
  
    let state  = globalState;

    useEffect( () =>{
   
        state.register(setUpdateState);

        return ()=>{
            state.unRegister(setUpdateState);
        }
    }
    ,[]);

    return (
        <>

    
        
         {state._increment}
        
        </>
    )
}

export default React.memo(TestingState);
