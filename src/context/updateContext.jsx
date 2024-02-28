import { createContext, useState } from "react";

const updateContext = createContext()

function UpdateContextProvider({children}) {
    
    const [updateData,setUpdateData] = useState("")
    const data = {
        updateData,setUpdateData
    }
    return (<updateContext.Provider value={data}>
        {children}
    </updateContext.Provider>)
}
export{updateContext,UpdateContextProvider}