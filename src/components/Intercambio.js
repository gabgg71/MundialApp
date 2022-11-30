import React, { useState, useContext } from 'react';
import { userContext } from '../hooks/useContext';
import { useForm } from "../hooks/useForm";
export const Intercambio=({setIntercambio})=>{
    const [opcionSel, setOpcion] = useState(0)
    const [responde, setResponde] = useState(false)
    const [activo, setActivo] = useState()
    const [ultimo, setUltimo] = useState()
    const [seleccionada, setSeleccionada] = useState({
      "id":-1
    })
    const [respuestas, setRespuesta] = useState()
    const [msg, setMsg] = useState(false);
    let { misFichas, usuario, setUsuario, data } = useContext(userContext);
    const [envioData, handleLoginData] = useForm({
        "de": usuario.correo,
        "para":"",
        "ofrece": "",
        "ofreceImg":"",
        "tipo":"propuesta"
      });
    const { para, ofrece } = envioData;

    const selecciona=(sel)=>{
      if (seleccionada.id === sel.id){
        setSeleccionada("")
    }else{
        setSeleccionada(sel)
    }
     /* if(seleccionada){
        if (seleccionada.id === sel.id){
            setSeleccionada("")
        }else{
            setSeleccionada(sel)
        }
      }else{
        setSeleccionada(sel)

      }*/
        

    }

    const enviarContra =(propuesta)=>{
      let prop = {
        "de": propuesta.de,
        "para": propuesta.para,
        "ofrece": propuesta.ofrece,
        "ofreceImg": propuesta.ofreceImg,
        "aCambio": seleccionada.id,
        "ofreceCambio": seleccionada.imagen,
        "tipo": "contra"
      }
      enviarPeticion(prop,"POST", "hacer_propuesta");
    }



   const enviarPeticion=async(data, metodo, endpoint)=>{
    console.log(`ESTO ES LO QUE ENVIO ${data}`)
    let respuesta = await fetch(
      `http://localhost:8080/api/usuario/${endpoint}`, 
    {method:metodo, 
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }})
    console.log(respuesta.us)
  let salida = await respuesta.json()
  console.log(salida)
  setUltimo(salida.respuesta)
  setRespuesta(salida.respuesta)
  setTimeout(()=>{
      setRespuesta("")
  }, 2000);
  setSeleccionada("");

   }

   

   const pruebe=(ind)=>{
  
    let salida = usuario.propuestas.filter((pro, i) => i !== ind)
    setUsuario({...usuario,  propuestas: salida})

    
   }

   const enEnviar=(ind)=>{
    console.log(ultimo)
    let salida = usuario.propuestas.filter((pro, i) => i !== ind)
    
    if(ultimo ==="La propuesta fue enviada satisfactoriamente."){
      setUsuario({...usuario,  propuestas: salida})
    }



   }


    const enviarPropuesta =()=>{
      
        envioData.ofrece = seleccionada.id;
        envioData.ofreceImg = seleccionada.imagen;
        enviarPeticion(envioData, "POST","hacer_propuesta");
    }

    const intercambio=()=>{

    }

    return(
        <div className="mis-fichas">
            <button type="button" className="btn-close" aria-label="Close" onClick={() => { setIntercambio(false) }}></button>
           
            <div className='pestana'>
            <p onClick={()=>{setOpcion(0); }}>Proponer intercambio</p>
            <p onClick={()=>{setOpcion(1);  }}>Propuestas recibidas</p>
            <p onClick={()=>{setOpcion(2);  }}>Contrapropuestas recibidas</p>
            <p onClick={()=>{setOpcion(3);  }}>Contrapropuestas rechazadas</p>
            </div>
            {opcionSel === 0 && <div>
                <div className="fichas_tengo">
            {misFichas.map((obj, ind)=>(
              (obj.cantidad>1)?(
                <div className="tarjeta" onClick={()=>{selecciona(obj.ficha)}}>
                    <b>{obj.ficha.jugador}</b>
                    <div className='imagen-selec'>
                    <img src={obj.ficha.imagen} class="img_tengo"></img>
                    {seleccionada.id === obj.ficha.id && <img class="seleccionada" src="seleccionadaF.png" />}
                    
                    </div>
                    <p>Equipo:{obj.ficha.equipo}</p>
                    <p>Repetidas:{obj.cantidad}</p>
                  </div>
              ):(<></>) 
              
                )
                )}
                
            </div>
            <div className='invita'>
                <p>Escribe el correo de tu amigo</p>
                <input 
                name="para"
            value={para}
            onChange={handleLoginData}></input>
                <button className='enter' onClick={enviarPropuesta}>Envia el ofrecimiento</button>


            </div>
            <p>{respuestas}</p>
                
                </div>}


            {opcionSel === 1 && <div className='ofrecen'>
            {usuario.propuestas.map((obj, ind)=>(
              (obj.tipo === "propuesta")?(
                <div className="tarjeta_prop">
                    <div className='flexi'>
                    <p>{obj.de} te ofrece</p>
                    <div className='propuesta'>
                    <img src={obj.ofreceImg} class="img_tengo"></img>
                    </div>
                    </div>
                    {seleccionada.imagen && activo === ind &&
                    <div className='flexi'>
                    <p>Tu ofreces</p>
                    <div className='propuesta'>
                    <img src={seleccionada.imagen} class="img_tengo"></img>
                    </div>
                    </div>}
                    
              

                    <div className='flexi'>
                      {msg && activo === ind && 
                      <button className='enter' onClick={()=>{enviarContra(obj);  setTimeout(()=>{
                        enEnviar(ind)
                    }, 2200);}}>Enviar</button>}
                        <button className='enter' onClick={()=>{setResponde(true); setActivo(ind);}}>Seleccionar ficha de cambio</button>
                        <button className='enter' onClick={()=>{enviarPeticion(obj, "DELETE", "elimina_propuesta");
                      pruebe(ind)}}>Rechazar</button>
                    </div>
                    {activo === ind && <p>{respuestas}</p>}
                  </div>
              ):(<></>)
              
              
              
              
                )
                )
                }
            </div>}
            {opcionSel === 2 && <div className='ofrecen'><p>Sella intercambios</p>
            {usuario.propuestas.map((obj, ind)=>(
              (obj.tipo === "contra")?(
                <div className="tarjeta_prop">
                    <div className='flexi'>
                    <p>{obj.para} te ofrece</p>
                    <div className='propuesta'>
                    <img src={obj.ofreceCambio} class="img_tengo"></img>
                    </div>
                    </div>
                    
                    <div className='flexi'>
                    <p>Tu ofreces</p>
                    <div className='propuesta'>
                    <img src={obj.ofreceImg} class="img_tengo"></img>
                    </div>
                    </div>
                    
              

                    <div className='flexi'>
                        <button className='enter' onClick={intercambio}>Aceptar</button>
                        <button className='enter' onClick={()=>{
                          enviarPeticion(obj,"PUT", "rechazar");
                          pruebe(ind);
                          }}>Rechazar</button>
                    </div>
                    {activo === ind && <p>{respuestas}</p>}
                  </div>
              ):(<></>)
              
              
              
              
                )
                )
                }
                </div>}
            {opcionSel === 3 && <div className='ofrecen'>
              <p>Estas contrapropuestas fueron rechazadas, Tienes algo mejor que ofrecer?</p>
              {usuario.propuestas.map((obj, ind)=>(
              (obj.tipo === "rechazo")?(
                <div className="tarjeta_prop">
                    <div className='flexi'>
                    <p>{obj.de} te ofrecio</p>
                    <div className='propuesta'>
                    <img src={obj.ofreceImg} class="img_tengo"></img>
                    </div>
                    </div>
                    <div className='flexi'>
                    <p>Lo que habias ofrecido</p>
                    <div className='propuesta'>
                    <img src={obj.ofreceCambio} class="img_tengo"></img>
                    </div>
                    </div>
                    
              

                    <div className='flexi'>
                      {msg && activo === ind && 
                      <button className='enter' onClick={()=>{enviarContra(obj)}}>Enviar</button>}
                        <button className='enter' onClick={()=>{setResponde(true); setActivo(ind);}}>Tengo algo mejor</button>
                        <button className='enter' onClick={()=>{enviarPeticion(obj, "DELETE", "elimina_propuesta"); pruebe(ind);}}>Descartar</button>
                    </div>
                    {activo === ind && <p>{respuestas}</p>}
                  </div>
              ):(<></>)
              
              
              
              
                )
                )
                }
              </div>}
            {responde && <div className="paises gris">
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{setResponde(false); setSeleccionada("")}}></button>
            <p className='selecciona'>Selecciona</p>
            <div className="propuesta-g">
            {misFichas.map((obj, ind)=>(
              (obj.cantidad>1)?(
                <div className="tarjeta" onClick={()=>{selecciona(obj.ficha)}}>
                    <b>{obj.ficha.jugador}</b>
                    <div className='imagen-selec'>
                    <img src={obj.ficha.imagen} class="img_tengo"></img>
                    {seleccionada.id === obj.ficha.id && <img class="seleccionada" src="seleccionadaF.png" />}
                    
                    </div>
                    <p>{obj.ficha.equipo}</p>
                    
                  </div>
              ):(<></>) 
              
                )
                )}
                
            </div>
            <button className='enter centro' onClick={()=>{setResponde(false); setMsg(true)}}>Aceptar</button>
            
            </div>}
            </div>
    )
}