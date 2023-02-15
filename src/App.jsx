import React, { useState } from 'react';

function App() {
  // Definimos el estado inicial de los valores de los checkboxes y el valor total
  const [checkboxValues, setCheckboxValues] = useState({
    option1: false,
    option2: false,
    option3: false,
  });
  const [totalValue, setTotalValue] = useState(0);

  // Función que se ejecuta cada vez que se produce un cambio en un checkbox
  const handleCheckboxChange = (event) => {
    // Obtenemos el nombre y el valor del checkbox que ha cambiado
    const { name, checked } = event.target;

    // Actualizamos el estado de checkboxValues con el nuevo valor del checkbox que ha cambiado
    setCheckboxValues({ ...checkboxValues, [name]: checked });

    // Calculamos el nuevo valor total
    let newValue = totalValue;
    if (checked) {
      // Si se ha marcado el checkbox, sumamos su valor al valor total
      switch (name) {
        case 'option1':
          newValue += 500;
          break;
        case 'option2':
          newValue += 300;
          break;
        case 'option3':
          newValue += 200;
          break;
        default:
          break;
      }
    } else {
      // Si se ha desmarcado el checkbox, restamos su valor al valor total
      switch (name) {
        case 'option1':
          newValue -= 500;
          break;
        case 'option2':
          newValue -= 300;
          break;
        case 'option3':
          newValue -= 200;
          break;
        default:
          break;
      }
    }

    // Actualizamos el valor total
    setTotalValue(newValue);
  };

  // Renderizamos los checkboxes y el total del valor de los servicios
  return (
    <div>
      <label>
        <input
          type="checkbox"
          name="option1"
          checked={checkboxValues.option1}
          onChange={handleCheckboxChange}
        />
        Una página web ($500)
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="option2"
          checked={checkboxValues.option2}
          onChange={handleCheckboxChange}
        />
        Una consultoria SEO ($300)
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="option3"
          checked={checkboxValues.option3}
          onChange={handleCheckboxChange}
        />
        Una campaña de Google ADS ($200)
      </label>
      <br />
      <br />
      <p>Precio: ${totalValue}</p>
    </div>
  );
}

export default App;
