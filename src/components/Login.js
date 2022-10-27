/*form input{
  width: 98%;
  padding:5% 1%;
}*/ 
import React, { useEffect, useState } from 'react';
import { useForm } from "../hooks/useForm";
import { useSearchParams } from "react-router-dom";



export const Login = () => {

  let [user, setUser] = useState({
    "email": "",
    "password": "",
  });
    

  const [loginData, handleLoginData] = useForm({
    email: "",
    password: "",
  });
  
  window.addEventListener('load', (event) => {
    
  });

  
  
  
  const { lEmail, lPassword } = loginData;
  
  
/*

  useEffect(() => {
    return () => {
      window.removeEventListener('load', (event) => {
        setSearchParams(window.location.href);
        if(searchParams.get('code') !== null){
          console.log(searchParams.get('code'));
        }
      });
    }
  }, [searchParams, setSearchParams]);
*/
  return (
    <div className="App">
      <div className="main-box">
        <img
          src="https://www.dafont.com/forum/attach/orig/6/4/646689.png?1"
          className="dev"
        ></img>
        <b>Login</b>
        <form onSubmit={ handleLogin }>
          <input
            type="text"
            placeholder="Email"
            className="email"
            name="lEmail"
            value={lEmail}
            onChange={handleLoginData}
          ></input>
          <input
            type="text"
            placeholder="Password"
            className="password"
            name="lPassword"
            value={lPassword}
            onChange={handleLoginData}
          ></input>
          <button className="enter">Login</button>
        </form>
        <p className="grey">
          Aun no tienes una cuenta? <a href="/register">Registrate</a>
        </p>
      </div>
      
    </div>
  );
};
