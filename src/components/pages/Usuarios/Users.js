import React, {useState, useEffect} from 'react';
import '../../../App.css';
import './Users.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

export default function Users() {

  function getData(){
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/User/estado?estado=true"
    const params = {
      method: 'GET',
      headers:{
        'accept': '*/*',
        'Authorization': 'Bearer '+process.env.REACT_APP_TOKEN
      }, 
    }
    fetch(url, params).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {

      const dataUsers =[]
      
      for (let index = 0; index < response.length; index++) {
        dataUsers[index] = {
          id : response[index].id, 
          user : response[index].userName, 
          nombre : response[index].nombreUsuario, 
          apellido : response[index].apellidoUsuario, 
          dui : response[index].usuarioDui,
          clinica : response[index].clinicaId
        }
      }
      console.log(dataUsers)
      setData(dataUsers)
    });
  }

  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [userSeleccionado, setUserSeleccionado] = useState({
    id: '',
    user: '',
    password: '',
    email: '',
    jvpm: '',
    nombre: '',
    apellido: '',
    dui: '',
    clinica: '',
  });

  useEffect(()=>{
    getData()
  }, []);

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

  const eliminar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/User/"+userSeleccionado.user
    const params = {
      method: 'DELETE',
      headers:{
        'accept': '*/*',
        'Authorization': 'Bearer '+process.env.REACT_APP_TOKEN
      } 
    }
    fetch(url, params).then(res => {
      if(!res.ok){
        const error = (data && data.message) || res.status;
        return Promise.reject(error)
      }
      alert("Usuario eliminada con exito")
      getData()
      setModalEliminar(false)
    })
    .catch(error =>{ 
      alert("El usuario no es candidata a eliminacion")
      setModalEliminar(false)
    });
  }

  const abrirModalInsertar=()=>{
    setUserSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/User"
    const params = {
      method: 'POST',
      headers:{
        'accept': '*/*',
        'content-type':'application/json',
        'Authorization': 'Bearer '+process.env.REACT_APP_TOKEN
      }, 
      body:JSON.stringify({
        id : userSeleccionado.id,
        userName : userSeleccionado.user,
        password :userSeleccionado.password,
        email : userSeleccionado.email,
        jvpm : parseInt(userSeleccionado.jvpm),
        nombreUsuario : userSeleccionado.nombre,
        apellidoUsuario :userSeleccionado.apellido,
        usuarioDui : userSeleccionado.dui,
        clinicaId : parseInt(userSeleccionado.clinica),
      })
    }
    fetch(url, params).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response)
      getData()
      setModalInsertar(false)
    });
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
              <td>{elemento.user}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.apellido}</td>
              <td>{elemento.dui}</td>
              <td>{"   "} 
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
            <label>Nombre de Empleado</label>
            <input
              className="form-control"
              type="text"
              name="id"
              value={userSeleccionado ? userSeleccionado.id: ''}
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

            <label>Password</label>
            <input
              className="form-control"
              type="text"
              name="password"
              value={userSeleccionado ? userSeleccionado.password: ''}
              onChange={handleChange}
            />
            <br />

            <label>Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={userSeleccionado ? userSeleccionado.email: ''}
              onChange={handleChange}
            />
            <br />

            <label>JVPM</label>
            <input
              className="form-control"
              type="text"
              name="jvpm"
              value={userSeleccionado ? userSeleccionado.jvpm: ''}
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
          <button className="btn btn-primary">
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
            <label>Nombre de Empleado</label>
            <input
              className="form-control"
              type="text"
              name="id"
              value={userSeleccionado ? userSeleccionado.id: ''}
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

            <label>Password</label>
            <input
              className="form-control"
              type="text"
              name="password"
              value={userSeleccionado ? userSeleccionado.password: ''}
              onChange={handleChange}
            />
            <br />

            <label>Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={userSeleccionado ? userSeleccionado.email: ''}
              onChange={handleChange}
            />
            <br />

            <label>JVPM</label>
            <input
              className="form-control"
              type="text"
              name="jvpm"
              value={userSeleccionado ? userSeleccionado.jvpm: ''}
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
