import React from "react";
import { Button } from "../styled/style";
import { Link, Route } from "react-router-dom";
import "../App.css";

export default function Home() {
  return (
    <div>
      <h3 className="h3">
        ¡Bienvenido/a a nuestra aplicación de cálculo de presupuesto de una
        página web!
      </h3>
      <p className="p">
        Nuestra aplicación te ayuda a calcular el presupuesto para crear la
        página web que deseas. Personaliza tu proyecto seleccionando
        características como tipo de sitio, número de páginas y diseño, y el
        precio total se actualizará automáticamente. También puedes agregar
        servicios adicionales como alojamiento web y optimización para motores
        de búsqueda. Al final, verás el presupuesto total y podrás decidir si
        continuar con la creación de tu sitio web.
      </p>
      
      <Link className="button-Link" to="/App">Iniciar</Link>
  
    </div>
  );
}