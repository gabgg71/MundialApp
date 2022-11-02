import React, { useState, useContext } from 'react';
import { userContext } from '../hooks/useContext';

export const Reclama=({setReclama})=>{
    let { misFichas, setMisFichas, usuario } = useContext(userContext);
    const [nueva, setNueva] = useState({})
    const obtenerFicha = async()=>{
    let fichasC = await fetch(
        `http://localhost:8080/api/fichas/random`, 
        {method:"GET", 
        headers: {
        'Content-Type': 'application/json'
        }})
    let nuevaFicha = await fichasC.json()
    setNueva(nuevaFicha)
    let agregarFicha = await fetch(
        `http://localhost:8080/api/usuario/agregar_ficha/${usuario}/${nuevaFicha.id}`, 
        {method:"PUT", 
        headers: {
        'Content-Type': 'application/json'
        }})
    
    let operacion = await agregarFicha.json()
    let estructura = {
        "ficha":nuevaFicha,
        "cantidad":operacion.cantidad,
        "pegado":false
    }

    console.log(nuevaFicha)
    console.log([...misFichas, estructura])
    //misFichas.add(nuevaFicha)
    setMisFichas([...misFichas, estructura]);
    console.log(`esta son fichas resultado ${misFichas}`)

}
    return(
        <div className="mis-fichas">
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setReclama(false)}}></button>
            <h1 className='titulo'>Reclama</h1>
            <div className="reclama">
                <p>{nueva.jugador}</p>
                <div className='ajuste'>
                    <img src={nueva.imagen}></img>
                </div>
                    <p>{nueva.rol}</p>
                    <p>{nueva.equipo}</p>
            </div>
            <button className="glow-on-hover reclamaB" onClick={() => { obtenerFicha() }}>Reclamar ficha</button>
        </div>
    )
}