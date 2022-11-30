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

  const num_total = (pais) =>{
    let resultados = misFichas.filter(
      function (obj) { return obj.ficha.equipo === pais }
    );
    let count = 0;
    let total = 11;
    let porcentaje = 0;
    for (let i = 0; i < resultados.length; i++) {
      if(resultados[i].pegado){
        count++;
      }
    }

    porcentaje = (100*count)/total;

    if(!Number.isInteger(porcentaje)){
      porcentaje = porcentaje.toFixed(1);
    }

    return porcentaje + "%"
    //return "Completado: " + porcentaje + "%"
  };

  const escudo = (Pais) =>{

    let escudos = new Map();
    escudos.set('Dinamarca','http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1899.png');
    escudos.set('Francia','http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/961.png');
    escudos.set('Senegal','http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1904.png');
    escudos.set('Estados Unidos', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1895.png');
    escudos.set('Alemania', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1894.png');
    escudos.set('Qatar', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/2539.png');
    escudos.set('Argentina', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1879.png');
    escudos.set('Inglaterra', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1889.png');
    escudos.set('España', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/956.png');
    escudos.set('Corea del Sur', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/2086.png');
    escudos.set('Gales', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1910.png');
    escudos.set('Túnez', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1908.png');
    escudos.set('Suiza', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1907.png');
    escudos.set('Bélgica', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1897.png');
    escudos.set('Brasil', 'http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/1881.png');
    escudos.set('Croacia', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1885.png');
    escudos.set('México', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1824.png');
    escudos.set('Portugal', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1844.png');
    escudos.set('Polonia', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1902.png');
    escudos.set('Camerún', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1880.png');
    escudos.set('Marruecos', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1884.png');
    escudos.set('Japón', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1187.png');
    escudos.set('Uruguay', 'http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1901.png');

    var find_url = escudos.get(Pais)
    return find_url
  }

  const isComplete = (numCompleto, pais) =>{
    var message = "Completo:";
    if(numCompleto === "100%"){
      message = "Has completado " + pais + "!"
    }
    return message
  }

  const det_largoNombre = (jugador, estado) =>{
    var clase = "nombre_jugador";
    if(estado === 'pegado'){
      if(jugador.length > 15){
        clase = "nombre_jugador_large_p"
      }else{
        clase = "nombre_jugador_p"
      }
    }else{
      if(jugador.length > 15){
        clase = "nombre_jugador_large"
      }else{
        clase = "nombre_jugador"
      }
    }
    
    return clase
  }

  const cambios=async(id)=>{
    console.log(`pegar esta ${id} en el usuario ${usuario.id}`)
    //let resultados = misFichas.find(obj => obj.ficha.id === id).pegado = true;
    let fichasC = await fetch(
      `http://localhost:8080/api/usuario/pegar_ficha/${usuario.id}/${id}`, 
    {method:"PUT", 
    headers: {
      'Content-Type': 'application/json'
    }})
    let fichasU = await fichasC.json()
    console.log(fichasU)
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
  //Otros fondos:
  //https://as2.ftcdn.net/v2/jpg/04/86/09/89/1000_F_486098918_1RHxvs5xuJmFcbKFGSAdqqFFKXd6bntN.jpg
  //https://st3.depositphotos.com/6396642/15828/v/450/depositphotos_158281374-stock-illustration-football-2018-russian-world-cup.jpg
  //https://img.freepik.com/vector-premium/antecedentes-mundial-qatar-2022_342897-24.jpg?w=2000
  //https://st3.depositphotos.com/6396642/19055/v/600/depositphotos_190550120-stock-illustration-football-2018-russian-world-cup.jpg
  //https://st3.depositphotos.com/6396642/19055/v/600/depositphotos_190550120-stock-illustration-football-2018-russian-world-cup.jpg
  //https://img.freepik.com/vector-premium/fondo-copa-mundial-futbol-banner-campeonato-futbol-2022-qatar_29865-3055.jpg?w=2000
  //https://static.vecteezy.com/system/resources/thumbnails/003/368/024/small/football-for-banner-soccer-championship-2022-in-qatar-vector.jpg

  //<img className="escudo" src={escudo(data[indice].pais)}></img>
  //<p className='escudo'>{escudo(data[indice].pais)}</p>
  //<p className='porcentaje'>Completado: {num_total(data[indice].pais)}</p>


  return (
    <div className="mis-fichas">
      {indice !== 0 && <div className='triangulo-izq' onClick={() => { setIndice(indice - 1) }}></div>}
      {indice !== 22 && <div className='triangulo-der' onClick={() => { setIndice(indice + 1) }}></div>}
      <div className='fondo-album'>
        <button type="button" className="btn-close" aria-label="Close" onClick={() => { setAlbum(false) }}></button>
        <p className='nombre_pais'>{data[indice].pais}</p>
        <p className='porcentaje'>{isComplete(num_total(data[indice].pais), data[indice].pais)}</p>
        <div className='chart-wrap'>
          <div className='gridB horizontal'>
            <div className='bar' style={{width: num_total(data[indice].pais)}} data-name='' title={num_total(data[indice].pais)}></div>
            <p className='loc_0'>0%</p>
            <p className='loc_20'>20%</p>
            <p className='loc_40'>40%</p>
            <p className='loc_60'>60%</p>
            <p className='loc_80'>80%</p>
            <p className='loc_100'>100%</p>
          </div>
        </div>
        <img className="morado" src='https://st2.depositphotos.com/5545370/12193/v/950/depositphotos_121936302-stock-illustration-russian-background-vector-illustration.jpg'></img>
        <img className="escudo" src={escudo(data[indice].pais)}></img>
        <div className="jugadores-equipo">
          <div className="jugadores-1">
            {data[indice]["jugadores"].slice(0, 6).map((jugador, ind) => (
              (verifica(jugador.id)[0] && verifica(jugador.id)[1]) ? (
                <div className="card">
                  <img src={jugador.imagen} class="card-img-top"></img>
                  <p className='numFicha'>{ind + 1}</p>
                  <p className={det_largoNombre(jugador.jugador,'pegado')}>{jugador.jugador}</p>
                </div>
              ) : (
                (verifica(jugador.id)[0] && verifica(jugador.id)[1] === false) ? (

                  <div className="card">
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fifa-world-cup-qatar-2022-official-emblem-design-template-662486ee0eb68c1cc9ad9b08367b09c6_screen.jpg?ts=1653057544" class="card-img-top"></img>
                    <p className='numFicha'>{ind + 1}</p>
                    <div className='pegar' onClick={()=>{cambios(jugador.id)}}></div>
                    <p className={det_largoNombre(jugador.jugador,'')}>{jugador.jugador}</p>
                  </div>
                ) : (
                  <div className="card">
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fifa-world-cup-qatar-2022-official-emblem-design-template-662486ee0eb68c1cc9ad9b08367b09c6_screen.jpg?ts=1653057544" class="card-img-top"></img>
                    <p className='numFicha'>{ind + 1}</p>
                    <p className={det_largoNombre(jugador.jugador,'')}>{jugador.jugador}</p>
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
                  <p className='numFicha'>{ind + 7}</p>
                  <p className={det_largoNombre(jugador.jugador,'pegado')}>{jugador.jugador}</p>
                </div>
              ) : (
                (verifica(jugador.id)[0] && verifica(jugador.id)[1] === false) ? (
                  <div className="card">
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fifa-world-cup-qatar-2022-official-emblem-design-template-662486ee0eb68c1cc9ad9b08367b09c6_screen.jpg?ts=1653057544" class="card-img-top"></img>
                    <p className='numFicha'>{ind + 7}</p>
                    <div className='pegar' onClick={()=>{cambios(jugador.id)}}></div>
                    <p className={det_largoNombre(jugador.jugador,'')}>{jugador.jugador}</p>
                  </div>
                ) : (
                  <div className="card">
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fifa-world-cup-qatar-2022-official-emblem-design-template-662486ee0eb68c1cc9ad9b08367b09c6_screen.jpg?ts=1653057544" class="card-img-top"></img>
                    <p className='numFicha'>{ind + 7}</p>
                    <p className={det_largoNombre(jugador.jugador,'')}>{jugador.jugador}</p>
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