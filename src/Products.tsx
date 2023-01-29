

import React, { useEffect, useState } from 'react'
import uuidv4 from 'uuidv4';
import globalState from './GlobalState/Global'

interface Props {}

function Products(props: Props) {

    const [updateState, setUpdateState] = useState<string>("");
    let [stateId, setStateId] = useState<string>("");
    console.log(stateId)
    useEffect(()=>{
        let uuid = uuidv4();
        setStateId(uuid);
        globalState.register(uuid, setUpdateState);
    },[])

    return (
        <>
        {
          globalState.products.map((item, index)=><>
          
          {item._increment}&nbsp;
          {stateId}

          <button onClick={() => {item.incrementNumber(stateId)}}>product {index}</button>
          
          </>)
        }
        </>
    )
}

export default React.memo( Products)
