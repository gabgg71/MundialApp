import React, { useState, useContext } from 'react';
import { userContext } from '../hooks/useContext';

export const Reclama=({setReclama})=>{
    let { misFichas, setMisFichas, usuario } = useContext(userContext);
    const [paquete, setNueva] = useState([])
    const obtenerFicha = async()=>{
        let fichasC = await fetch(
            `${process.env.REACT_APP_BACKEND}/fichas/random`, 
            {method:"GET", 
            headers: {
            'Content-Type': 'application/json'
            }})
        let nuevaFicha = await fichasC.json()
        let ids = nuevaFicha.map((el, ind)=>el.id);
        
        setNueva(nuevaFicha)
        let agregarFicha = await fetch(
            `${process.env.REACT_APP_BACKEND}/usuario/agregar_fichas/${usuario.id}`, 
            {method:"PUT", 
            body: JSON.stringify(ids),
            headers: {
            'Content-Type': 'application/json'
            }})
        
        let operacion = await agregarFicha.json()
        let asiQuedaria = operacion.map((nuevita, ind)=>{
            
            return {
                "ficha":nuevaFicha[ind],
                "cantidad":nuevita.cantidad,
                "pegado":false
            }
        })
        setMisFichas([...misFichas, ...asiQuedaria]);
    }

    return(
        <div className="mis-fichas" style={{ background: 'url("https://static.vecteezy.com/system/resources/thumbnails/003/368/024/small/football-for-banner-soccer-championship-2022-in-qatar-vector.jpg") 60% 50%'}}>            
                <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setReclama(false)}}></button>
                <h1 className='titulo'>Reclamar Ficha</h1>
                <div className="fichas_tengo">
                {paquete.map((nueva, ind)=>(
                
                    <div className="tarjeta" key={ind+"r"}>
                    <b className='nombre_jugador_miFicha'>{nueva.jugador}</b>
                      <img src={nueva.imagen} class="img_tengo"></img>
                      <p className='rol_jugador_miFicha'>{nueva.rol}</p>
                      <p className='rol_jugador_miFicha'>{nueva.equipo}</p>
                      
                    </div>
                ))}
            </div>
                <button className="glow-on-hover reclamaB" onClick={() => { obtenerFicha() }}>Reclamar</button>
            </div>

    )
}
            