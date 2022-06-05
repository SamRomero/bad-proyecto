import React, {useState, useEffect} from 'react'; //useEffect paa la tablas
import '../../../App.css';
import './Resultados.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';


export default function Resultados() {
  function getData(){
    let baseurl = process.env.REACT_APP_URL_BASE //url base, var de entrada en .env debe apuntar a localhosto 7008
    const url = baseurl+"/api/ResultadoExamen" //url de donde se consume, dependiendo de los cruds
    const params = { //
      method: 'GET', //se usa tal cual, solo se modifica el token, la cadena, dependiendo del usuario logueado.
      headers:{
        'accept': '*/*',
        'Authorization': 'Bearer '+ process.env.REACT_APP_TOKEN
      }, 
    }
    fetch(url, params).then(res => res.json()) //copiar y pegar, mapeo 
    .catch(error => console.error('Error:', error))
    .then(response => {
      const dataResultado =[]
      for (let index = 0; index < response.length; index++) {
        dataResultado[index] = { //arreglo de data clinics. todos los datos que devuelve clinica
          id : response[index].id,  // react -> api
          orden : response[index].ordenExamenId, 
          tipo : response[index].tipoExamenId, 
          parametro : response[index].parametroId, 
          valor : response[index].valor 
        }
      }
      console.log(dataResultado) //quitar
      setData(dataResultado)
    });
  }
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const [resultadoSeleccionado, setResultadoSeleccionado] = useState({
    id: '',
    orden: '',
    tipo: '',
    parametro: '',
    valor: ''
  });

  useEffect(()=>{ //copy and page
    getData()
  }, []);

  const seleccionarResultado=(elemento, caso)=>{
setResultadoSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setResultadoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  //
  const eliminar=()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/ResultadoExamen"+resultadoSeleccionado.id //cambiar url, concatenar id
    const params = {
      method: 'DELETE', //metodo delete
      headers:{
        'accept': '*/*',
        'Authorization': 'Bearer '+ process.env.REACT_APP_TOKEN //cambiar token, si tira 401, significa que el token se venció.
      } 
    }
    fetch(url, params).then(res => {
      if(!res.ok){
        const error = (data && data.message) || res.status;
        return Promise.reject(error)
      }
      alert("Resultado eliminado con exito")
      getData()
      setModalEliminar(false)
    })
    .catch(error =>{ 
      alert("El resultado no es candidato a eliminacion")
      setModalEliminar(false)
    });
  }

  //EDITAR
  const editar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/ResultadoExamen"+resultadoSeleccionado.id //no tocar nada, mas que url y el id
    const params = {
      method: 'PUT',
      headers:{
        'accept': '*/*',
        'content-type':'application/json', //esto es pa editar.
        'Authorization': 'Bearer '+ process.env.REACT_APP_TOKEN //modificar key
      }, 
      body:JSON.stringify({ //depende de los campos.
        id : resultadoSeleccionado.id,
        ordenExamenId :  parseInt(resultadoSeleccionado.orden), //api -> front
        tipoExamenId :  parseInt(resultadoSeleccionado.tipo),
        parametroId : parseInt(resultadoSeleccionado.parametro),
        valor : parseInt(resultadoSeleccionado.valor) //todos los id hay que parsearlos a enteros.
      })
    }
    fetch(url, params).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      //console.log(response)
      getData()
      setModalEditar(false)
    });
  }

  const abrirModalInsertar=()=>{
    setResultadoSeleccionado(null);
    setModalInsertar(true);
  }

  //insertar
  const insertar =()=>{
    let baseurl = process.env.REACT_APP_URL_BASE
    const url = baseurl+"/api/ResultadoExamen" //modificar url
    const params = {
      method: 'POST', //metodo post
      headers:{
        'accept': '*/*',
        'content-type':'application/json', //json
        'Authorization': 'Bearer '+ process.env.REACT_APP_TOKEN //modificar key
      }, 
      body:JSON.stringify({ //api -> front     
        ordenExamenId :  parseInt(resultadoSeleccionado.orden), //api -> front
        tipoExamenId :  parseInt(resultadoSeleccionado.tipo),
        parametroId : parseInt(resultadoSeleccionado.parametro),
        valor : parseInt(resultadoSeleccionado.valor) //todos los id hay que parsearlos a enteros.
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
        <div class="Resultados">
          <h2>Resultados de Examenes</h2>
          <br />
        <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
        <br /><br />
        <table className="table table-hover">
            <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th>Orden</th>
                <th>Tipo</th>
                <th>Parametro</th>
                <th>Valor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map(elemento=>(
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.orden}</td>
                  <td>{elemento.tipo}</td>
                  <td>{elemento.parametro}</td>
                  <td>{elemento.valor}</td>
                  <td><button className="btn btn-primary" onClick={()=>seleccionarResultado(elemento, 'Editar')}>Editar</button> {"   "} 
                  <button className="btn btn-danger" onClick={()=>seleccionarResultado(elemento, 'Eliminar')}>Eliminar</button></td>
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
                  value={resultadoSeleccionado && resultadoSeleccionado.id}
                />
                <br />
    
                <label>Orden</label>
                <input
                  className="form-control"
                  type="text"
                  name="orden"
                  value={resultadoSeleccionado && resultadoSeleccionado.orden}
                  onChange={handleChange}
                />
                <br />
    
                <label>Tipo Examen</label>
                <input
                  className="form-control"
                  type="text"
                  name="tipo"
                  value={resultadoSeleccionado && resultadoSeleccionado.tipo}
                  onChange={handleChange}
                />
                <br />
    
                <label>Parametro</label>
                <input
                  className="form-control"
                  type="text"
                  name="parametro"
                  value={resultadoSeleccionado && resultadoSeleccionado.parametro}
                  onChange={handleChange}
                />
                <br />

                <label>Valor</label>
                <input
                  className="form-control"
                  type="text"
                  name="valor"
                  value={resultadoSeleccionado && resultadoSeleccionado.valor}
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
              Estás Seguro que deseas eliminar el registro {resultadoSeleccionado && resultadoSeleccionado.nombre}
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
                <h3>Ingrese Registro</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
              <label>Orden</label>
                <input
                  className="form-control"
                  type="text"
                  name="orden"
                  value={resultadoSeleccionado && resultadoSeleccionado.orden}
                  onChange={handleChange}
                />
                <br />
    
                <label>Tipo Examen</label>
                <input
                  className="form-control"
                  type="text"
                  name="tipo"
                  value={resultadoSeleccionado && resultadoSeleccionado.tipo}
                  onChange={handleChange}
                />
                <br />
    
                <label>Parametro</label>
                <input
                  className="form-control"
                  type="text"
                  name="parametro"
                  value={resultadoSeleccionado && resultadoSeleccionado.parametro}
                  onChange={handleChange}
                />
                <br />

                <label>Valor</label>
                <input
                  className="form-control"
                  type="text"
                  name="valor"
                  value={resultadoSeleccionado && resultadoSeleccionado.valor}
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