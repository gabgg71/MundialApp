import React, { useContext, useState } from 'react';
import { AppRouter } from './router/AppRouter';
import { userContext } from './hooks/useContext';

const App =()=> {
  let [data, setData] =useState([])
  let [misFichas, setMisFichas] =useState([])
  let [usuario, setUsuario] =useState(1)
  return (
    <userContext.Provider value={{data, setData, misFichas, setMisFichas, usuario, setUsuario}}>
      <AppRouter/>
    </userContext.Provider>
  )
}

export default App;
