import React, { useState, useContext } from 'react';
import { userContext } from '../hooks/useContext';
export const Fichas =({setFichas})=>{
    let { misFichas,data } = useContext(userContext);
    const [filtro, setFiltro] = useState(misFichas)

    const presiona=(paises)=>{
      (paises.target.value ==="todos")?(setFiltro(misFichas)):(setFiltro(misFichas.filter((obj)=> obj.ficha.equipo ===paises.target.value)))
    }
    
    return(
        <div className="mis-fichas" style={{ background: 'url("https://static.vecteezy.com/system/resources/thumbnails/003/368/024/small/football-for-banner-soccer-championship-2022-in-qatar-vector.jpg") 60% 50%'}}>
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setFichas(false)}}></button>
            <h1 className='titulo'>Mis Fichas</h1>
            <label htmlFor="paisesc" className='invita'>Escoge un pais:  </label>

              <select name="paisesc" id="paisesc" onChange={presiona}>
              <option value="todos">Todos los equipos</option>
              {data.map((obj, ind)=>(
                <option key={ind+"p"} value={obj.pais}>{obj.pais}</option>
                ))}
            </select>
            
            <div className="fichas_tengo">
              {filtro.map((obj, ind)=>(
                  (obj.pegado && obj.cantidad <2)?(
                    <></>
                  ):(
                    <div className="tarjeta" key={ind+"a"}>
                      <b className='rol_jugador_miFicha'>{obj.ficha.jugador}</b>
                      <img src={obj.ficha.imagen} class="img_tengo"></img>
                      <p className='rol_jugador_miFicha'>{obj.ficha.rol}</p>
                      <p className='rol_jugador_miFicha'>{obj.ficha.equipo}</p>
                      
                    </div>
                  ) 
                ))}
            </div>
        </div>
    );

}