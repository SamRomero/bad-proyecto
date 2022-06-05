import React, {useState, useEffect} from 'react';
import '../../../App.css';
import './Muestra.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

export default function Muestra() {

  function getData(){
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/Muestra"
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

      const dataMuestra =[]
      
      for (let index = 0; index < response.length; index++) {
        dataMuestra[index] = {
          id : response[index].id, 
          descripcion : response[index].descripcionMuestra, 
          usuario : response[index].usuarioId, 
          apellido : response[index].apellidoUsuario, 
          tipo_examen : response[index].tipoExamenId,
          orden_examen : response[index].ordenExamenId
        }
      }
      console.log(dataMuestra)
      setData(dataMuestra)
    });
  }

  const [data, setData] = useState([]);
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

  useEffect(()=>{
    getData()
  }, []);

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

  const eliminar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/Muestra/"+muestraSeleccionado.user
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
      alert("Muestra eliminada con exito")
      getData()
      setModalEliminar(false)
    })
    .catch(error =>{ 
      alert("La muestra no es candidata a eliminacion")
      setModalEliminar(false)
    });
  }

  const abrirModalInsertar=()=>{
    setMuestraSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/Muestra"
    const params = {
      method: 'POST',
      headers:{
        'accept': '*/*',
        'content-type':'application/json',
        'Authorization': 'Bearer '+process.env.REACT_APP_TOKEN
      }, 
      body:JSON.stringify({
        id : muestraSeleccionado.id,
        descripcionMuestra : muestraSeleccionado.descripcion,
        usuarioId :muestraSeleccionado.usuario,
        tipoExamenId : parseInt(muestraSeleccionado.tipo_examen),
        ordenExamenId : parseInt(muestraSeleccionado.orden_examen),
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
            <label>Descripción</label>
            <input
              className="form-control"
              type="text"
              name="descripcion"
              value={muestraSeleccionado ? muestraSeleccionado.rol: ''}
              onChange={handleChange}
            />
            <br />

            <label>Usuario</label>
            <input
              className="form-control"
              type="text"
              name="usuario"
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
            <label>Descripción</label>
            <input
              className="form-control"
              type="text"
              name="descripcion"
              value={muestraSeleccionado ? muestraSeleccionado.rol: ''}
              onChange={handleChange}
            />
            <br />

            <label>Usuario</label>
            <input
              className="form-control"
              type="text"
              name="usuario"
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