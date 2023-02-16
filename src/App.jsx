import { useState } from "react";
import "./App.css";

function App() {
  // Definimos el estado inicial de los valores de los checkboxes y el valor total
  const [servicios, setServicios] = useState({
    web: false,
    seo: false,
    social: false,
    paginas: 1,
    idiomas: 1,
  });

  // Función que se ejecuta cada vez que se produce un cambio en un checkbox
  const handleCheckboxChange = (event) => {
    
    // Obtenemos el nombre y el valor del checkbox que ha cambiado
    const { name, checked } = event.target;

    // Actualizamos el estado de checkboxValues con el nuevo valor del checkbox que ha cambiado
    setServicios((prevServicios) => ({
      ...prevServicios,
      [name]: checked,
    }));
  };

  // Manejador de cambios para los inputs de número
  const handleInputNumberChange = (event) => {
    const { name, value } = event.target;

    // Actualizar el estado de servicios y parsear el valor a un número entero
    setServicios((prevServicios) => ({
      ...prevServicios,
      [name]: parseInt(value),
    }));
  };

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

  // Renderizamos el componente
  return (
    <div className="container">
      <h3>¿Qué quieres hacer?</h3>
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
                <input
                  type="number"
                  name="paginas"
                  value={servicios.paginas}
                  onChange={handleInputNumberChange}
                  min="1"
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                Número de idiomas:
                <input
                  type="number"
                  name="idiomas"
                  value={servicios.idiomas}
                  onChange={handleInputNumberChange}
                  min="1"
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
          Una consultoría SEO ($300)
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
