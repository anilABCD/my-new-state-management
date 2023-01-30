

import React, { useEffect, useState } from 'react'
import uuidv4 from 'uuidv4';
import globalState from './GlobalState/Global'

interface Props {}

function Products(props: Props) {

    const [updateState, setUpdateState] = useState<string>("");

    useEffect(()=>{
        globalState.products.forEach((item) => item.register(setUpdateState));
        globalState.register(setUpdateState)

        return () => {
            globalState.unRegister(setUpdateState);
            globalState.products.forEach((item) => item.unRegister(setUpdateState));
        }
    },[])

    return (
        <>
        {
          globalState.products.map((item, index)=><>
          
          {item._increment}&nbsp;
          {/* {stateId} */}

          <button onClick={() => {item.incrementNumber()}}>product {index}</button>
          
          </>)
        }
        </>
    )
}

export default React.memo( Products)
