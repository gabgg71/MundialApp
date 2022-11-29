import React, { useState, useContext } from 'react';
import { Fichas } from './Fichas';
import { Album } from './Album';
import { Navbar } from './Navbar';
import { Reclama } from './Reclama';
import { Repetidas } from './Repetidas';
import { Intercambio } from './Intercambio';
import { userContext } from '../hooks/useContext';
import { getValue } from '@testing-library/user-event/dist/utils';
export const Principal=()=>{
    const [fichas, setFichas] = useState(false)
    const [repetidas, setRepetidas] = useState(false)
    const [album, setAlbum] = useState(false)
    const [reclama, setReclama] = useState(false)
    const [intercambio, setIntercambio] = useState(false)
    let { data, setData, misFichas, setMisFichas, usuario, setUsuario } = useContext(userContext);

    window.addEventListener('load', 
    async()=> { 
          let usId = parseInt(localStorage.getItem("usuario"));
          console.log(usId)
          setUsuario(usId);
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

      //obtener usuario
      let fichas = await fetch(`http://localhost:8080/api/usuario/obtener_fichas/${usId}`, {method:"GET", 
      headers: {
        'Content-Type': 'application/json'
      }})
      let fichasU = await fichas.json()
      console.log(fichasU)
      let fichasC = await fetch(`http://localhost:8080/api/fichas/fichas_user`, 
      {method:"PUT", 
      body: JSON.stringify(fichasU),
      headers: {
        'Content-Type': 'application/json'
      }})
      fichasU = await fichasC.json()
      console.log(fichasU);
      setMisFichas(fichasU);
      
    }, false);

    const User = (user) =>{
      var user = usuario;
      return usuario
    }
  
    //Otros fondos:
    //https://cdn.wallpapersafari.com/14/72/tZuvSK.jpg

    return (
        <>
        <div className="App">
            <div className='fondo'>

            
              <img src='https://images8.alphacoders.com/128/1286559.jpg'></img>
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