/*form input{
  width: 98%;
  padding:5% 1%;
}*/ 
import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "../hooks/useForm";
import { useSearchParams } from "react-router-dom";
import { userContext } from '../hooks/useContext';



export const Login = () => {
  let { data, setData, misFichas, setMisFichas, usuario, setUsuario } = useContext(userContext);
  const [error, setError] = useState("")

  let [user, setUser] = useState({
    "email": "",
    "password": "",
  });
    

  const [loginData, handleLoginData] = useForm({
    email: "",
    password: "",
  });
  
  const login =async()=>{

  if(lEmail ===undefined || lPassword === undefined){
    setError("Error, datos incompletos");
    setTimeout(()=>{
      setError("");
    }, 3000)
  }else{
    let data = {
      "correo":lEmail,
      "password": lPassword,
      "fichas":[]
  }
    //window.location.href = 'http://localhost:3000/principal';
  
    let fichasC = await fetch(
      `http://localhost:8080/api/usuario/login`, 
    {method:"POST", 
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }})
    let fichasU = await fichasC.json()
    console.log(fichasU);
    if(fichasU.existe){
      localStorage.setItem("usuario", fichasU.us.id);
      setUsuario(fichasU.us.id);
      let fichasA = await fetch(`http://localhost:8080/api/fichas/fichas_user`, 
      {method:"PUT", 
      body: JSON.stringify(fichasU.us.fichas),
      headers: {
        'Content-Type': 'application/json'
      }})
      fichasU = await fichasA.json()
      console.log(fichasU);
      setMisFichas(fichasU);
      console.log(misFichas)
      window.location.href = 'http://localhost:3000/principal';
    }else{
      setError("Error, credenciales invalidas");
      setTimeout(()=>{
        setError("");
      }, 3000)
    }

  }
  }

  
  
  
  const { lEmail, lPassword } = loginData;
  //https://ep01.epimg.net/estaticos/arc/2021/12/laliga-panini/images/futbolista.png

  return (
    <div className="App">
      <div className="fondo_login">
        <h1 className='tituloLog'></h1>
        <img className='letraMundial' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Logo_de_la_Copa_Mundial_de_f%C3%BAtbol_2022.svg/800px-Logo_de_la_Copa_Mundial_de_f%C3%BAtbol_2022.svg.png'></img>
        <div className='lineaLogin'></div>
        <div className='lineaLogin' style={{left: '63%'}}></div>
        <img className="logoPaniniLogin" src="http://cdn.shopify.com/s/files/1/0561/4639/5336/products/IMG_1761.jpg?v=1662308880"></img>
        <img className="logoFifa" src="https://digitalhub.fifa.com/m/58223e0c1caa5674/original/FIFA-logo.png"></img>
        <img className="logoMundial" src="https://logodownload.org/wp-content/uploads/2018/07/world-cup-2022-logo-1.png"></img>
        <div className='flex_log'>
 
          <input
            type="text"
            placeholder="E-mail"
            className="email"
            name="lEmail"
            value={lEmail}
            onChange={handleLoginData}
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="password"
            name="lPassword"
            value={lPassword}
            onChange={handleLoginData}
          ></input>
          <button className="enter" onClick={login}>Login</button>
       {error!=="" && <p>{error}</p>}
        <p className="grey">
          ¿Aún no tienes una cuenta? <a href="/register">Registrate</a>
        </p>
          </div>
      </div>
      
    </div>
  );
};
