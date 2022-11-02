import React, { useState, useContext } from 'react';
import { userContext } from '../hooks/useContext';
export const Intercambio=({setIntercambio})=>{
    const [proponer, setProponer] = useState(false)
    const [propuestas, setPropuestas] = useState(false)
    const [seleccionada, setSeleccionada] = useState()
    let { misFichas, setMisFichas } = useContext(userContext);

    const selecciona=(id)=>{
        if (seleccionada === id){
            setSeleccionada("")
            console.log("DESELECCIONADA")
        }else{
            setSeleccionada(id)
            console.log("se selecciono")
        }
        

    }
    return(
        <div className="mis-fichas">
            <button type="button" className="btn-close" aria-label="Close" onClick={() => { setIntercambio(false) }}></button>
            <div>
            <div className='pestana'>
            <p onClick={()=>{setPropuestas(false); setProponer(true);}}>Proponer intercambio</p>
            <p onClick={()=>{setProponer(false); setPropuestas(true); }}>Ver mis propuestas</p>
            </div>
            {proponer && <div>
                <div className="fichas_tengo">
            {misFichas.map((obj, ind)=>(
              (obj.cantidad>1)?(
                <div className="tarjeta" onClick={()=>{selecciona(obj.ficha.id)}}>
                    <b>{obj.ficha.jugador}</b>
                    <div className='imagen-selec'>
                    <img src={obj.ficha.imagen} class="img_tengo"></img>
                    {seleccionada === obj.ficha.id && <img class="seleccionada" src="seleccionadaF.png" />}
                    
                    </div>
                    <p>Equipo:{obj.ficha.equipo}</p>
                    <p>Repetidas:{obj.cantidad}</p>
                  </div>
              ):(<></>) 
                ))}
            </div>
            <div className='invita'>
                <p>Escribe el correo de tu amigo</p>
                <input></input>
                <button className='enter'>Envia el ofrecimiento</button>


            </div>
                
                </div>}
            {propuestas && <div className='ofrecen'><p>Te han ofrecido estos intercambios</p></div>}
            </div>
        </div>
    )
}