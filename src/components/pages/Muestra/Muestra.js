import React, {useState} from 'react';
import '../../../App.css';
import './Muestra.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

export default function Muestra() {

  const dataMuestra = [
    { id: 1,},
    { id: 2,},
    { id: 3,},
    { id: 4,},
    { id: 5,}
  ];

  const [data, setData] = useState(dataMuestra);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [muestraSeleccionado, setMuestraSeleccionado] = useState({
    id: '',
    descripcion: '',
    usuario: '',
    tipo_examen: '',
    orden_examen: '',
  });

  const seleccionarMuestra=(elemento, caso)=>{
setMuestraSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setMuestraSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(muestra=>{
      if(muestra.id===muestraSeleccionado.id){
        muestra.rol=muestraSeleccionado.descripcion;
        muestra.user=muestraSeleccionado.usuario;
        muestra.nombre=muestraSeleccionado.tipo_examen;
        muestra.apellido=muestraSeleccionado.orden_examen;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(muestra=>muestra.id!==muestraSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setMuestraSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=muestraSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div className="Muestra">
      <h2>Lista de Muestras</h2>
      <br />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    <br /><br />
      <table className="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Usuario</th>
            <th>Tipo de Exámen</th>
            <th>Orden de Exámen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.descripcion}</td>
              <td>{elemento.usuario}</td>
              <td>{elemento.tipo_examen}</td>
              <td>{elemento.orden_examen}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarMuestra(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger"onClick={()=>seleccionarMuestra(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Muestra</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={muestraSeleccionado && muestraSeleccionado.id}
            />
            <br />

            <label>Descripción</label>
            <input
              className="form-control"
              type="text"
              name="descripcion"
              value={muestraSeleccionado ? muestraSeleccionado.rol: ''}
              onChange={handleChange}
            />
            <br />

            <label>Tipo de Exámen</label>
            <input
              className="form-control"
              type="text"
              name="tipo_examen"
              value={muestraSeleccionado ? muestraSeleccionado.user: ''}
              onChange={handleChange}
            />
            <br />

            <label>Orden de Exámen</label>
            <input
              className="form-control"
              type="text"
              name="orden_examen"
              value={muestraSeleccionado ? muestraSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el usuario {muestraSeleccionado && muestraSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Muestra</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br />

            <label>Descripción</label>
            <input
              className="form-control"
              type="text"
              name="descripcion"
              value={muestraSeleccionado ? muestraSeleccionado.rol: ''}
              onChange={handleChange}
            />
            <br />

            <label>Tipo de Exámen</label>
            <input
              className="form-control"
              type="text"
              name="tipo_examen"
              value={muestraSeleccionado ? muestraSeleccionado.user: ''}
              onChange={handleChange}
            />
            <br />

            <label>Orden de Exámen</label>
            <input
              className="form-control"
              type="text"
              name="orden_examen"
              value={muestraSeleccionado ? muestraSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}