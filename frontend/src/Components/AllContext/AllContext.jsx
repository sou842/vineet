import { createContext, useState } from "react";


export const AuthorContext = createContext();

const AuthorContextProvider = ({ children }) => {
    const match1000 = window.matchMedia("(max-width:1000px)").matches;
    const [side,setSide] = useState(match1000?false:true);

return <AuthorContext.Provider value={{ side, setSide }}>
    {children}
</AuthorContext.Provider>
}

export default AuthorContextProvider;