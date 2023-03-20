import { useState, useEffect } from "react";
import { Button, ModalB } from "../src/styled/style";
import Popup from 'reactjs-popup';
import "./App.css";

let activo = false;
// Componente reutilizable que muestra un input de número y botones de incrementar y decrementar
function NumberInput(props) {

  // Función que se ejecuta cuando el usuario escribe en el input de número
  const handleInputChange = (event) => {
    // Obtiene el nuevo valor del input y lo convierte a un número entero
    const newValue = parseInt(event.target.value);

    // Si el valor es un número válido, actualiza el valor del componente padre
    if (!isNaN(newValue)) {
      props.onChange(newValue);
    }
  };

  // Función que se ejecuta cuando el usuario hace clic en el botón de incrementar
  const handleIncrementClick = () => {
    // Incrementa el valor del componente padre en 1
    props.onChange(props.value + 1);
  };

  // Función que se ejecuta cuando el usuario hace clic en el botón de decrementar
  const handleDecrementClick = () => {
    // Decrementa el valor del componente padre en 1, pero nunca lo hace menor que 1
    props.onChange(Math.max(props.value - 1, 1));
  };

  // Renderiza el input y los botones de incrementar y decrementar
  return (
    <div>
    <div className="number-input">
      <Button onClick={handleIncrementClick}>
        +
      </Button>
      <input
        type="text"
        className="input-text"
        value={props.value}
        onChange={handleInputChange}
      />
      <Button onClick={handleDecrementClick}>
        -
      </Button>
      <div>
      <Popup trigger={<ModalB ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 17 14">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg></ModalB>} position="right center">
    <div>Este componente debe indicar el numero de paginas que tendra tu web</div>
  </Popup>
      </div>
    </div>
    </div>
  );
}
function App() {
  // Estado inicial de los servicios que ofrecemos
  const [servicios, setServicios] = useState({
    web: false,
    seo: false,
    social: false,
    paginas: 1,
    idiomas: 1,
  });

  // Función que se ejecuta cuando el usuario cambia el estado de una casilla de verificación
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    // Actualiza el estado de los servicios usando la función `setServicios` de React
    // Para mantener los otros valores del estado, usa el operador spread para copiar el objeto anterior
    setServicios((prevServicios) => ({
      ...prevServicios,
      [name]: checked,
    }));
  };

  // Función que se ejecuta cuando el usuario cambia el valor de un input de número
  const handleNumberInputChange = (name) => (value) => {
    // Actualiza el estado de los servicios usando la función `setServicios` de React
    // Para mantener los otros valores del estado, usa el operador spread para copiar el objeto anterior
    setServicios((prevServicios) => ({
      ...prevServicios,
      [name]: value,
    }));
  };

  // Cargar los datos del localstorage al iniciar el componente
  useEffect(() => {
    const serviciosGuardados = localStorage.getItem("servicios");

    if (serviciosGuardados) {
      setServicios(JSON.parse(serviciosGuardados));
    }
  }, []);

  // Actualizar el localstorage cuando se modifica el estado de los servicios
  useEffect(() => {
    localStorage.setItem("servicios", JSON.stringify(servicios));
  }, [servicios]);
  // Inicializar la variable total
  let total = 0;

  // Calcular el precio total en base a los servicios seleccionados
  if (servicios.web) {
    total += 500;
    total += servicios.paginas * servicios.idiomas * 30;
  }

  if (servicios.seo) {
    total += 300;
  }

  if (servicios.social) {
    total += 200;
  }

  console.log(activo);
  // Renderizamos el componente
  return (
    <div className="container">
      <h3>Que quieres hacer?</h3>
      <div>
        <label>
          <input
            type="checkbox"
            name="web"
            checked={servicios.web}
            onChange={handleCheckboxChange}
          />
          Una página web ($500)
        </label>
        {/* Mostrar opciones adicionales si se selecciona "Una página web" */}
        {servicios.web && (
          <div className="web-options">
            <div className="input-container">
              <label>
                Número de páginas:
                <NumberInput
                  value={servicios.paginas}
                  onChange={handleNumberInputChange("paginas")}
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                Número de idiomas:
                <NumberInput
                  value={servicios.idiomas}
                  onChange={handleNumberInputChange("idiomas")}
                />
              </label>
            </div>
          </div>
        )}
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="seo"
            checked={servicios.seo}
            onChange={handleCheckboxChange}
          />
          Una consultoria SEO ($300)
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="social"
            checked={servicios.social}
            onChange={handleCheckboxChange}
          />
          Una campaña de Google ADS ($200)
        </label>
      </div>
      <p>Precio: ${total}</p>
    </div>
    
  );
}

export default App;
