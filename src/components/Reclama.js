import React, { useState, useContext } from 'react';
import { userContext } from '../hooks/useContext';

export const Reclama=({setReclama})=>{
    let { misFichas, setMisFichas, usuario } = useContext(userContext);
    const [paquete, setNueva] = useState([])
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

    //https://st2.depositphotos.com/5545370/12193/v/950/depositphotos_121936302-stock-illustration-russian-background-vector-illustration.jpg
    //https://static.vecteezy.com/system/resources/thumbnails/003/368/024/small/football-for-banner-soccer-championship-2022-in-qatar-vector.jpg

    return(
        <div className="mis-fichas">
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setReclama(false)}}></button>
            <h1 className='titulo'>Reclama</h1>
            <div className="reclama">
            {paquete.map((nueva, ind)=>(
                    <>
                    <p className='nombre_jugador_nuevaFicha'>{nueva.jugador}</p>
                    <img className="escudo_nuevaFicha" src={escudo(nueva.equipo)}></img>
                    <div className='ajuste'>
                        <img src={nueva.imagen}></img>
                    </div>
                        <p className='rol_jugador_nuevaFicha'>{nueva.rol}</p>
                    
                    </>

                )
                )}
                <button onClick={obtenerFicha} className='glow-on-hover'>Reclama</button>

                
            </div>
        </div>
    )}
            