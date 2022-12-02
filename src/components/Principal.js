import React, { useState, useContext } from 'react';
import { Fichas } from './Fichas';
import { Album } from './Album';
import { Navbar } from './Navbar';
import { Reclama } from './Reclama';
import { Repetidas } from './Repetidas';
import { Intercambio } from './Intercambio';
import { userContext } from '../hooks/useContext';
export const Principal=()=>{
    const [fichas, setFichas] = useState(false)
    const [repetidas, setRepetidas] = useState(false)
    const [album, setAlbum] = useState(false)
    const [reclama, setReclama] = useState(false)
    const [intercambio, setIntercambio] = useState(false)
    let {setData, setMisFichas,  setUsuario } = useContext(userContext);

    window.addEventListener('load', 
    async()=> { 
      document.querySelector(".botAlbum").disabled= true
      document.querySelector(".botReclamar").disabled= true
      let usId = parseInt(localStorage.getItem("usuario"));
      let respuesta = await fetch(`${process.env.REACT_APP_BACKEND}/usuario/${usId}`, {method:"GET", 
      headers: {
        'Content-Type': 'application/json'
      }})
      let salida = await respuesta.json()
      setUsuario(salida);
      
    respuesta = await fetch(`${process.env.REACT_APP_BACKEND}/equipos/obtener`, {method:"GET", 
    headers: {
      'Content-Type': 'application/json'
    }})
    salida = await respuesta.json()
    let respuesta2 = await fetch(`${process.env.REACT_APP_BACKEND}/fichas/obtener_con_jugadores`, 
    {
      method:"POST", 
      body:JSON.stringify(salida),
        headers: {
        'Content-Type': 'application/json'
      }})
      salida = await respuesta2.json()
      respuesta2 = await fetch(`${process.env.REACT_APP_BACKEND}/fichas/obtener_con_jugadores`, 
      {
        method:"POST", 
        body:JSON.stringify(salida),
        headers: {
          'Content-Type': 'application/json'
        }})
        
        let salida2 = await respuesta2.json()
        setData(salida2);
        
        //obtener usuario
      let fichas = await fetch(`${process.env.REACT_APP_BACKEND}/usuario/obtener_fichas/${usId}`, {method:"GET", 
      headers: {
        'Content-Type': 'application/json'
      }})
      let fichasU = await fichas.json()
      let fichasC = await fetch(`${process.env.REACT_APP_BACKEND}/fichas/fichas_user`, 
      {method:"PUT", 
      body: JSON.stringify(fichasU),
      headers: {
        'Content-Type': 'application/json'
      }})
      fichasU = await fichasC.json()
      setMisFichas(fichasU);
      document.querySelector(".botAlbum").disabled= false
      document.querySelector(".botReclamar").disabled= false
      
    }, false);

   
    return (
        <>
        <div className="App">
            <div className='fondo'>
              <img src='https://images8.alphacoders.com/128/1286559.jpg' alt='fondo'></img>
              {fichas && <Fichas setFichas={setFichas}/>}
              {album && <Album setAlbum={setAlbum} index={0}/>}
              {reclama && <Reclama setReclama={setReclama}/>}
              {repetidas && <Repetidas setRepetidas={setRepetidas}/>}
              {intercambio && <Intercambio setIntercambio={setIntercambio}/>}
              <div className='opciones'>
                <button className='glow-on-hover botMisFichas' onClick={()=>{setFichas(true)}}>Mis Fichas</button>
                <button className='glow-on-hover botFichasRep' onClick={()=>{setRepetidas(true)}}>Fichas Repetidas</button>
                <button className='glow-on-hover botAlbum' onClick={()=>{setAlbum(true)}}>Album Panini</button>
                <button className='glow-on-hover botReclamar' onClick={()=>{setReclama(true)}}>Reclamar Fichas</button>
              </div>
              <Navbar setIntercambio={setIntercambio}/>
            </div>
                 
        </div>
        
        </>
      );


}