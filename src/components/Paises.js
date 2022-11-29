import React, { useState, useContext } from 'react';
import { userContext } from '../hooks/useContext';
export const Paises =({setPaises, setIndice})=>{
    let imagenes = [1,2,3,4,5,6,5,7,8,9,10,11];
    let { data, setData } = useContext(userContext);

    const presionarPais=(indice)=>{
        setIndice(indice);
        setPaises(false);
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

    return(
        <div className="paises">
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setPaises(false)}}></button>
            <p className='selecciona'>Selecciona un pais</p>
            <div className='grid'>
            {data.map((obj, ind)=>(
                <div className="pais" onClick={()=>{presionarPais(ind)}}>
                    <img src={escudo(obj.pais)} class="card-img-top"></img>
                    <p className='nombre-p'>{obj.pais}</p>
                </div>
            ))}
            </div>
        </div>
    )
}