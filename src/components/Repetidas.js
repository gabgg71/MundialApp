import React, { useState, useContext } from 'react';
import { userContext } from '../hooks/useContext';
export const Repetidas =({setRepetidas})=>{
    let { misFichas, setMisFichas } = useContext(userContext);

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
    
    return(
        <div className="mis-fichas" style={{ background: 'url("https://static.vecteezy.com/system/resources/thumbnails/003/368/024/small/football-for-banner-soccer-championship-2022-in-qatar-vector.jpg") 60% 50%'}}>
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setRepetidas(false)}}></button>
            <h1 className='titulo'>Fichas Repetidas</h1>
            <div className="fichas_tengo">
            {misFichas.map((obj, ind)=>(
              (obj.cantidad>1)?(
                <div className="tarjeta">
                    <b className='nombre_jugador_miFicha'>{obj.ficha.jugador}</b>
                    <img src={obj.ficha.imagen} class="img_tengo"></img>
                    <p className='rol_jugador_miFicha'>{obj.ficha.rol}</p>
                    
                    <img className="escudo_miFicha" src={escudo(obj.ficha.equipo)}></img>
                    <p>Repetidas: {obj.cantidad}</p>
                  </div>
              ):(<></>) 
                ))}
            </div>
            

        </div>
    );

}