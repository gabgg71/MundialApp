import React, { useState, useContext } from 'react';
import { Paises } from "./Paises";
import { userContext } from '../hooks/useContext';

export const Album = ({ setAlbum, index }) => {
  let imagenes = [1, 2, 3, 4, 5, 6, 5, 7, 8, 9, 10, 11];
  const [paises, setPaises] = useState(false)
  const [indice, setIndice] = useState(index)
  const [valido, setValido] = useState(false)
  let { data, setData, misFichas, setMisFichas, usuario } = useContext(userContext);
  console.log(data);
  console.log(data[0].pais);
  const verifica = (idBuscar) => {
    let resultados = misFichas.filter(
      function (obj) { return obj.ficha.id === idBuscar }
    );
    if (resultados.length > 0) {
      if (resultados[0].pegado) {
        //la tengo y esta pegada
        return [true, true]
      }
      return [true, false];
    }
    return [false, false]
  };

  const cambios=async(id)=>{
    console.log(`pegar esta ${id} en el usuario ${usuario}`)
    //let resultados = misFichas.find(obj => obj.ficha.id === id).pegado = true;
    let fichasC = await fetch(
      `http://localhost:8080/api/usuario/pegar_ficha/${usuario}/${id}`, 
    {method:"PUT", 
    headers: {
      'Content-Type': 'application/json'
    }})
    let fichasU = await fichasC.json()
    let fichasT = await fetch(`http://localhost:8080/api/fichas/fichas_user`, 
    {method:"PUT", 
    body: JSON.stringify(fichasU),
    headers: {
      'Content-Type': 'application/json'
    }})
    fichasU = await fichasT.json()
    console.log(fichasU)
    setMisFichas(fichasU);
    //setMisFichas(misFichas);
  };



  return (
    <div className="mis-fichas">
      {indice !== 0 && <div className='triangulo-izq' onClick={() => { setIndice(indice - 1) }}></div>}
      {indice !== 22 && <div className='triangulo-der' onClick={() => { setIndice(indice + 1) }}></div>}
      <div className='fondo-album'>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => { setAlbum(false) }}></button>
        <p className='nombre_pais'>{data[indice].pais}</p>
        <img className="morado" src='https://static.vecteezy.com/system/resources/thumbnails/003/368/024/small/football-for-banner-soccer-championship-2022-in-qatar-vector.jpg'></img>
        <div className="jugadores-equipo">
          <div className="jugadores-1">
            {data[indice]["jugadores"].slice(0, 6).map((jugador, ind) => (

              (verifica(jugador.id)[0] && verifica(jugador.id)[1]) ? (
                <div className="card">
                  <img src={jugador.imagen} class="card-img-top"></img>
                  <p>{ind + 1}</p>
                  <p className='nombre_jugador'>{jugador.jugador}</p>
                </div>
              ) : (
                (verifica(jugador.id)[0] && verifica(jugador.id)[1] === false) ? (
                  <div className="card">
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fifa-world-cup-qatar-2022-official-emblem-design-template-662486ee0eb68c1cc9ad9b08367b09c6_screen.jpg?ts=1653057544" class="card-img-top"></img>
                    <p>{ind + 1}</p>
                    <div className='pegar' onClick={()=>{cambios(jugador.id)}}></div>
                    <p className='nombre_jugador'>{jugador.jugador}</p>
                  </div>
                ) : (
                  <div className="card">
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fifa-world-cup-qatar-2022-official-emblem-design-template-662486ee0eb68c1cc9ad9b08367b09c6_screen.jpg?ts=1653057544" class="card-img-top"></img>
                    <p>{ind + 1}</p>
                    <p className='nombre_jugador'>{jugador.jugador}</p>
                  </div>

                )

              )

            ))
            }


          </div>

          <div className="jugadores-2">
            {data[indice]["jugadores"].slice(5, -1).map((jugador, ind) => (
              (verifica(jugador.id)[0] && verifica(jugador.id)[1]) ? (
                <div className="card">
                  <img src={jugador.imagen} class="card-img-top"></img>
                  <p>{ind + 7}</p>
                  <p className='nombre_jugador'>{jugador.jugador}</p>
                </div>
              ) : (
                (verifica(jugador.id)[0] && verifica(jugador.id)[1] === false) ? (
                  <div className="card">
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fifa-world-cup-qatar-2022-official-emblem-design-template-662486ee0eb68c1cc9ad9b08367b09c6_screen.jpg?ts=1653057544" class="card-img-top"></img>
                    <p>{ind + 7}</p>
                    <div className='pegar' onClick={()=>{cambios(jugador.id)}}></div>
                    <p className='nombre_jugador'>{jugador.jugador}</p>
                  </div>
                ) : (
                  <div className="card">
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fifa-world-cup-qatar-2022-official-emblem-design-template-662486ee0eb68c1cc9ad9b08367b09c6_screen.jpg?ts=1653057544" class="card-img-top"></img>
                    <p>{ind + 7}</p>
                    <p className='nombre_jugador'>{jugador.jugador}</p>
                  </div>

                )

              )
            ))}
          </div>

        </div>
        {paises && <Paises setPaises={setPaises} setIndice={setIndice} />}
        <button className="glow-on-hover fifa" onClick={() => { setPaises(true) }}>Copa mundo FIFA</button>
      </div>

    </div>
  )
}