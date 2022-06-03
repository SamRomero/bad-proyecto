import React, {useState} from 'react';
import '../../../App.css';
import './Users.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

export default function Users() {

  const dataUsers = [
    { id: 1,},
    { id: 2,},
    { id: 3,},
    { id: 4,},
    { id: 5,}
  ];

  const [data, setData] = useState(dataUsers);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [userSeleccionado, setUserSeleccionado] = useState({
    id: '',
    rol: '',
    user: '',
    nombre: '',
    apellido: '',
    dui: '',
    clinica: '',
  });

  const seleccionarUser=(elemento, caso)=>{
setUserSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setUserSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(user=>{
      if(user.id===userSeleccionado.id){
        user.rol=userSeleccionado.rol;
        user.user=userSeleccionado.user;
        user.nombre=userSeleccionado.nombre;
        user.apellido=userSeleccionado.apellido;
        user.dui=userSeleccionado.dui;
        user.clinica=userSeleccionado.clinica;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(user=>user.id!==userSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setUserSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=userSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div className="User">
      <h2>Lista de Usuarios</h2>
      <br />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    <br /><br />
      <table className="table table-bordered table-hover">
        <thead class="table-dark">
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Rol</th>
            <th scope="col">Usuario</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">DUI</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.rol}</td>
              <td>{elemento.user}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.apellido}</td>
              <td>{elemento.dui}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarUser(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger"onClick={()=>seleccionarUser(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Usuario</h3>
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
              value={userSeleccionado && userSeleccionado.id}
            />
            <br />

            <label>Rol</label>
            <input
              className="form-control"
              type="text"
              name="rol"
              value={userSeleccionado ? userSeleccionado.rol: ''}
              onChange={handleChange}
            />
            <br />

            <label>Usuario</label>
            <input
              className="form-control"
              type="text"
              name="user"
              value={userSeleccionado ? userSeleccionado.user: ''}
              onChange={handleChange}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={userSeleccionado ? userSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Apellido</label>
            <input
              className="form-control"
              type="text"
              name="apellido"
              value={userSeleccionado ? userSeleccionado.apellido: ''}
              onChange={handleChange}
            />
            <br />

            <label>Dui</label>
            <input
              className="form-control"
              type="text"
              name="dui"
              value={userSeleccionado ? userSeleccionado.dui: ''}
              onChange={handleChange}
            />
            <br />

            <label>Clinica</label>
            <input
              className="form-control"
              type="text"
              name="clinica"
              value={userSeleccionado ? userSeleccionado.clinica: ''}
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
          Estás Seguro que deseas eliminar el usuario {userSeleccionado && userSeleccionado.nombre}
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
            <h3>Insertar Usuario</h3>
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

            <label>Rol</label>
            <input
              className="form-control"
              type="text"
              name="rol"
              value={userSeleccionado ? userSeleccionado.rol: ''}
              onChange={handleChange}
            />
            <br />

            <label>Usuario</label>
            <input
              className="form-control"
              type="text"
              name="user"
              value={userSeleccionado ? userSeleccionado.user: ''}
              onChange={handleChange}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={userSeleccionado ? userSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Apellido</label>
            <input
              className="form-control"
              type="text"
              name="apellido"
              value={userSeleccionado ? userSeleccionado.apellido: ''}
              onChange={handleChange}
            />
            <br />

            <label>Dui</label>
            <input
              className="form-control"
              type="text"
              name="dui"
              value={userSeleccionado ? userSeleccionado.dui: ''}
              onChange={handleChange}
            />
            <br />

            <label>Clinica</label>
            <input
              className="form-control"
              type="text"
              name="clinica"
              value={userSeleccionado ? userSeleccionado.clinica: ''}
              onChange={handleChange}
            />
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
