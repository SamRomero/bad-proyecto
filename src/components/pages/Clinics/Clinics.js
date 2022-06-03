import React, {useState} from 'react';
import '../../../App.css';
import './Clinics.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

export default function Clinics() {
  const dataClinics = [
    { id: 1,  },
    { id: 2,  },
    { id: 3, },
  ];

  const [data, setData] = useState(dataClinics);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [clinicSeleccionado, setClinicSeleccionado] = useState({
    id: '',
    nombre: '',
    telefono: '',
    direccion: '',
    municipio: '',
    departamento: ''
  });

  const seleccionarClinic=(elemento, caso)=>{
setClinicSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setClinicSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(clinic=>{
      if(clinic.id===clinicSeleccionado.id){
        clinic.telefono=clinicSeleccionado.telefono;
        clinic.direccion=clinicSeleccionado.direccion;
        clinic.municipio=clinicSeleccionado.municipio;
        clinic.departamento=clinicSeleccionado.departamento;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(clinic=>clinic.id!==clinicSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setClinicSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=clinicSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div class="Clinics">
      <h2>Listado de Clínicas Habilitadas</h2>
      <br />

    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    <br /><br />

      <table className="table table-bordered table-hover">
        <thead class="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Telefono</th>
            <th scope="col">Direccion</th>
            <th scope="col">Municipio</th>
            <th scope="col">Departamento</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td >{elemento.id}</td>
              <td >{elemento.nombre}</td>
              <td >{elemento.telefono}</td>
              <td >{elemento.direccion}</td>
              <td >{elemento.municipio}</td>
              <td >{elemento.departamento}</td>
              <td ><button className="btn btn-primary" onClick={()=>seleccionarClinic(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarClinic(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>


      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Registro</h3>
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
              value={clinicSeleccionado && clinicSeleccionado.id}
            />
            <br />

            <label>Nombre Clínica</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={clinicSeleccionado && clinicSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Telefono</label>
            <input
              className="form-control"
              type="text"
              name="telefono"
              value={clinicSeleccionado && clinicSeleccionado.telefono}
              onChange={handleChange}
            />

            <label>Direccion</label>
            <input
              className="form-control"
              type="text"
              name="direccion"
              value={clinicSeleccionado && clinicSeleccionado.direccion}
              onChange={handleChange}
            />

            <label>Municipio</label>
            <input
              className="form-control"
              type="text"
              name="municipio"
              value={clinicSeleccionado && clinicSeleccionado.municipio}
              onChange={handleChange}
            />

            <label>Departamento</label>
            <input
              className="form-control"
              type="text"
              name="departamento"
              value={clinicSeleccionado && clinicSeleccionado.departamento}
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
          Estás Seguro que deseas eliminar el registro {clinicSeleccionado && clinicSeleccionado.nombre}
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
            <h3>Insertar Registro</h3>
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

            <label>Nombre de Clínica</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={clinicSeleccionado ? clinicSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Telefono</label>
            <input
              className="form-control"
              type="text"
              name="telefono"
              value={clinicSeleccionado ? clinicSeleccionado.telefono: ''}
              onChange={handleChange}
            />

            <label>Direccion</label>
            <input
              className="form-control"
              type="text"
              name="direccion"
              value={clinicSeleccionado ? clinicSeleccionado.direccion: ''}
              onChange={handleChange}
            />

            <label>Municipio</label>
            <input
              className="form-control"
              type="text"
              name="municipio"
              value={clinicSeleccionado ? clinicSeleccionado.municipio: ''}
              onChange={handleChange}
            />

            <label>Departamento</label>
            <input
              className="form-control"
              type="text"
              name="departamento"
              value={clinicSeleccionado ? clinicSeleccionado.departamento: ''}
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
