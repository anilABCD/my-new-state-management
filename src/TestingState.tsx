
import React, { useEffect, useState } from 'react'
import uuidv4 from 'uuidv4';
import globalState from './GlobalState/Global'

interface Props {}

function TestingState(props: Props) {
    const {} = props

    const [updateState, setUpdateState]  = useState<string>("");
    let [stateId, setStateId] = useState<string>("");
  
    let state  = globalState;

    useEffect( () =>{
        let uuid = uuidv4();
        setStateId(uuid)
        state.register(uuid,setUpdateState);
    }
    ,[]);

    return (
        <>

    
        
         {state._increment}
        
        </>
    )
}

export default React.memo(TestingState);
