import React, { useContext, useState } from 'react';
import { AppRouter } from './router/AppRouter';
import { userContext } from './hooks/useContext';

const App =()=> {
  let [data, setData] =useState([])
  let [misFichas, setMisFichas] =useState([])
  let [usuario, setUsuario] =useState(1)

  window.addEventListener('load', 
    async()=> { 
    let respuesta = await fetch(`http://localhost:8080/api/equipos/obtener`, {method:"GET", 
    headers: {
      'Content-Type': 'application/json'
    }})
    let salida = await respuesta.json()
    let respuesta2 = await fetch(`http://localhost:8080/api/fichas/obtener_con_jugadores`, 
    {
        method:"POST", 
        body:JSON.stringify(salida),
        headers: {
        'Content-Type': 'application/json'
        }})

    let salida2 = await respuesta2.json()
    setData(salida2);
    localStorage.removeItem("usuario");
  }, false);
  return (
    <userContext.Provider value={{data, setData, misFichas, setMisFichas, usuario, setUsuario}}>
      <AppRouter/>
    </userContext.Provider>
  )
}

export default App;
