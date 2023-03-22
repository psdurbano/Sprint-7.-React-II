import { useState, useEffect } from "react";
import { Button, ModalB } from "../src/styled/style";
import Popup from "reactjs-popup";
import "./App.css";

function NumberInput(props) {
  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value);

    if (!isNaN(newValue)) {
      props.onChange(newValue);
    }
  };

  const handleIncrementClick = () => {
    props.onChange(props.value + 1);
  };

  const handleDecrementClick = () => {
    props.onChange(Math.max(props.value - 1, 1));
  };

  return (
    <div>
      <div className="number-input">
        <Button onClick={handleIncrementClick}>+</Button>
        <input
          type="text"
          className="input-text"
          value={props.value}
          onChange={handleInputChange}
        />
        <Button onClick={handleDecrementClick}>-</Button>
        <div>
          <Popup
            trigger={
              <ModalB>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-info-circle"
                  viewBox="0 0 17 14"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </ModalB>
            }
            position="right center"
          >
            <div>
              Este componente debe indicar el numero de paginas que tendra tu
              web
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [servicios, setServicios] = useState({
    web: false,
    seo: false,
    social: false,
    paginas: 1,
    idiomas: 1,
  });

  const [nombrePresupuesto, setNombrePresupuesto] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [presupuestos, setPresupuestos] = useState([]);
  const [orden, setOrden] = useState('default');

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setServicios((prevServicios) => ({
      ...prevServicios,
      [name]: checked,
    }));
  };

  const handleNumberInputChange = (name) => (value) => {
    setServicios((prevServicios) => ({
      ...prevServicios,
      [name]: value,
    }));
  };

  const handleNombrePresupuestoChange = (event) => {
    setNombrePresupuesto(event.target.value);
  };

  const handleNombreClienteChange = (event) => {
    setNombreCliente(event.target.value);
  };

  const handleAgregarPresupuesto = () => {
    const fecha = new Date();
    const nuevoPresupuesto = {
      nombrePresupuesto,
      nombreCliente,
      servicios,
      total: calcularTotal(),
      fecha: fecha.toLocaleDateString(),
    };

    setPresupuestos((prevPresupuestos) => [
      ...prevPresupuestos,
      nuevoPresupuesto,
    ]);
  };

  const calcularTotal = () => {
    let total = 0;

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

    return total;
  };

  const sortByName = () => {
    setOrden('name');
    setPresupuestos([...presupuestos].sort((a, b) => a.nombrePresupuesto.localeCompare(b.nombrePresupuesto)))
  }

  const sortByDate = () => {
    setOrden('date');
    setPresupuestos([...presupuestos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)))
  }

  const resetSort = () => {
    setOrden('default');
    setPresupuestos([...presupuestos])
  }

  useEffect(() => {
    const serviciosGuardados = localStorage.getItem("servicios");

    if (serviciosGuardados) {
      setServicios(JSON.parse(serviciosGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("servicios", JSON.stringify(servicios));
  }, [servicios]);

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
      <p>Precio: ${calcularTotal()}</p>
      <div>
        <label>
          Nombre del presupuesto:
          <input
            type="text"
            value={nombrePresupuesto}
            onChange={handleNombrePresupuestoChange}
          />
        </label>
      </div>
      <div>
        <label>
          Nombre del cliente:
          <input
            type="text"
            value={nombreCliente}
            onChange={handleNombreClienteChange}
          />
        </label>
      </div>
      <Button onClick={handleAgregarPresupuesto}>Agregar presupuesto</Button>
      <div>
        <h3>Presupuestos</h3>
        {presupuestos.length === 0 && <p>No hay presupuestos ingresados</p>}
        <div className="sort-buttons">
          <button onClick={sortByName}>Ordenar por nombre</button>
          <button onClick={sortByDate}>Ordenar por fecha</button>
          <button onClick={resetSort}>Reiniciar orden</button>
        </div>
        {presupuestos.map((presupuesto) => (
          <div key={presupuesto.fecha}>
            <h4>{presupuesto.nombrePresupuesto}</h4>
            <p>Cliente: {presupuesto.nombreCliente}</p>
            <p>Servicios: {JSON.stringify(presupuesto.servicios)}</p>
            <p>Total: ${presupuesto.total}</p>
            <p>Fecha: {presupuesto.fecha}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
