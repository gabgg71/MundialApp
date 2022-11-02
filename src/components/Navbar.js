import React, { useState } from 'react';
export const Navbar =({setIntercambio})=>{
  


  return(
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
<div class="container-fluid">
  <a class="navbar-brand" href="#">Panini</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Mi album</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" onClick={()=>{setIntercambio(true)}}>Intercambiar fichas</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="http://localhost:3000">Cerrar sesion</a>
      </li>
      <li class="nav-item">
        <img src="https://www.dafont.com/forum/attach/orig/6/4/646689.png?1" className="logo-panini"></img>
      </li>
    </ul>
  </div>
</div>
</nav>
  )

}