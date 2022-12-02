import React, { useState, useContext } from 'react';
import { Paises } from "./Paises";
import { userContext } from '../hooks/useContext';

export const Album = ({ setAlbum, index }) => {
  const [paises, setPaises] = useState(false)
  const [indice, setIndice] = useState(index)
  let { data,  misFichas, setMisFichas, usuario } = useContext(userContext);
  
  const verifica = (idBuscar) => {
    let resultados = misFichas.filter((obj)=>obj.ficha.id === idBuscar);
    if (resultados.length > 0) {
      if (resultados[0].pegado)
        return [true, true]
      return [true, false];
    }
    return [false, false]
  };

  const numTotal = (pais) =>{
    let resultados = misFichas.filter((obj)=>obj.ficha.equipo === pais  && obj.pegado === true)
    let porcentaje = (100*resultados.length)/11;
    return porcentaje.toFixed(1) + "%"
  };


  const isComplete = (numCompleto, pais) =>{
    if(numCompleto === "100%")
      return "Has completado " + pais + "!"
    return "Completo:"
  }


  const cambios=async(id)=>{
    await fetch(
      `${process.env.REACT_APP_BACKEND}/usuario/pegar_ficha/${usuario.id}/${id}`, 
    {method:"PUT", 
    headers: {
      'Content-Type': 'application/json'
    }})
    let pegadas = misFichas.map((obj)=>{
      if(obj.ficha.id ===id){
        obj.pegado = true
      }
      return obj
    })
    setMisFichas(pegadas);
  };

  return (
    <div className="mis-fichas">
      {indice !== 0 && <div className='triangulo-izq' onClick={() => { setIndice(indice - 1) }}></div>}
      {indice !== 22 && <div className='triangulo-der' onClick={() => { setIndice(indice + 1) }}></div>}
      <div className='fondo-album'>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => { setAlbum(false) }}></button>
        <p className='nombre_pais'>{data[indice].pais}</p>
        <p className='porcentaje'>{isComplete(numTotal(data[indice].pais), data[indice].pais)}</p>
        <div className='chart-wrap' style={{top : "90%"}}>
          <div className='gridB horizontal'>
            <div className='bar' style={{width: numTotal(data[indice].pais)}} data-name='' title={numTotal(data[indice].pais)}></div>
            <div className='locs'>
            <p className='loc_0'>0%</p>
            <p className='loc_20'>20%</p>
            <p className='loc_40'>40%</p>
            <p className='loc_60'>60%</p>
            <p className='loc_80'>80%</p>
            <p className='loc_100'>100%</p>

            </div>
          </div>
        </div>
        <img className="morado" src='https://st2.depositphotos.com/5545370/12193/v/950/depositphotos_121936302-stock-illustration-russian-background-vector-illustration.jpg'></img>
        <img className="escudo" src={data[indice].imagen}></img>
        <div className="jugadores-equipo">
          <div className="jugadores-1">
            {data[indice]["jugadores"].slice(0, 6).map((jugador, ind) => (
              (verifica(jugador.id)[0] && verifica(jugador.id)[1]) ? (
                <div className="card" key={ind}>
                  <img src={jugador.imagen} class="card-img-top"></img>
                  <p className='numFicha'>{ind + 1}</p>
                  <p className="nombre_jugador">{jugador.jugador}</p>
                </div>
              ) : (
                (verifica(jugador.id)[0] && verifica(jugador.id)[1] === false) ? (

                  <div className="card" key={ind}>
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fifa-world-cup-qatar-2022-official-emblem-design-template-662486ee0eb68c1cc9ad9b08367b09c6_screen.jpg?ts=1653057544" class="card-img-top"></img>
                    <p className='numFicha'>{ind + 1}</p>
                    <div className='pegar' onClick={()=>{cambios(jugador.id)}}></div>
                    <p className="nombre_jugador">{jugador.jugador}</p>
                  </div>
                ) : (
                  <div className="card" key={ind}>
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fifa-world-cup-qatar-2022-official-emblem-design-template-662486ee0eb68c1cc9ad9b08367b09c6_screen.jpg?ts=1653057544" class="card-img-top"></img>
                    <p className='numFicha'>{ind + 1}</p>
                    <p className="nombre_jugador">{jugador.jugador}</p>
                  </div>

                )

              )

            ))
            }


          </div>

          <div className="jugadores-2">
            {data[indice]["jugadores"].slice(6, 11).map((jugador, ind) => (
              (verifica(jugador.id)[0] && verifica(jugador.id)[1]) ? (
                <div className="card" key={ind}>
                  <img src={jugador.imagen} class="card-img-top"></img>
                  <p className='numFicha'>{ind + 7}</p>
                  <p className="nombre_jugador">{jugador.jugador}</p>
                </div>
              ) : (
                (verifica(jugador.id)[0] && verifica(jugador.id)[1] === false) ? (
                  <div className="card" key={ind}>
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fifa-world-cup-qatar-2022-official-emblem-design-template-662486ee0eb68c1cc9ad9b08367b09c6_screen.jpg?ts=1653057544" class="card-img-top"></img>
                    <p className='numFicha'>{ind + 7}</p>
                    <div className='pegar' onClick={()=>{cambios(jugador.id)}}></div>
                    <p className="nombre_jugador">{jugador.jugador}</p>
                  </div>
                ) : (
                  <div className="card" key={ind}>
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fifa-world-cup-qatar-2022-official-emblem-design-template-662486ee0eb68c1cc9ad9b08367b09c6_screen.jpg?ts=1653057544" class="card-img-top"></img>
                    <p className='numFicha'>{ind + 7}</p>
                    <p className="nombre_jugador">{jugador.jugador}</p>
                  </div>

                )

              )
            ))}
          </div>

        </div>
        
        {paises && <Paises setPaises={setPaises} setIndice={setIndice} />}
        <button className="glow-on-hover fifa" style={{width: '80px', height: '35px'}} onClick={() => { setPaises(true) }}>Menú</button>
      </div>
      
    </div>
  )
}