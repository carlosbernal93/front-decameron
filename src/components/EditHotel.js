import React, {useState, useEffect} from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'
import API from '../api/api';
import Select from 'react-select';

export const EditHotel = () => {
  const [nit, setNit] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudades, setCiudades] = useState([]);
  const [ciudad, setCiudad] = useState(1);
  const [habitaciones, setHabitaciones] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);
  const [errores, setErrores] = useState([]);
  const {id} = useParams();

  const navigate = useNavigate()

  const update = async (e) => {
    e.preventDefault();
    const resp = await API.put(`/hoteles/update/${id}`, {
      nombre: nombre, 
      nit: nit, 
      direccion:direccion, 
      ciudad_id: ciudad, 
      num_habitaciones: habitaciones
    }).catch(function (error) {
      if (error.response) {
        console.log(error.response.data.errors);
        setErrores(error.response.data.errors);
      }
    });
    
    if(typeof resp !== 'undefined' && resp.data.status == 200){
      navigate('/');
    }
  }

  useEffect(() => {
    const getProductById = async () => {
      const response = await API.get(`/hoteles/show/${id}`);
      setSelectedOption({value: response.data.ciudad_id, label: response.data.nombre_ciudad});
      setNombre(response.data.nombre);
      setNit(response.data.nit);
      setDireccion(response.data.direccion);
      setCiudad(response.data.ciudad_id);
      setHabitaciones(response.data.num_habitaciones);
      getCiudades();
    }
    getProductById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCiudades = async () => {
    const response = await API.get('/selects/selectCiudad');
    setCiudades(response.data);
  }
  return (
    <div className='container'>
      <div className="row" style={{"margin-top":15}}>
        <div className="col-md-12 mb-4">
          <div className="card mb-4">
            <div className="card-header py-3">
              <h5 className="mb-0">Editar Hotel</h5>
            </div>

            <div className="card-body">
              <form onSubmit={update}>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label">*NIT:</label>
                      <input 
                        value={nit}
                        onChange={(e) => setNit(e.target.value) }
                        type='text' 
                        className="form-control"
                        placeholder='Ingrese el NIT'
                      />
                      <span className='text-danger'>{errores.nit}</span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label">*Nombre:</label>
                      <input 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value) }
                        type='text' 
                        className='form-control'
                        placeholder='Ingrese el nombre'
                      />
                      <span className='text-danger'>{errores.nombre}</span>
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label">*Direccion:</label>
                      <input 
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value) }
                        type='text' 
                        className='form-control'
                        placeholder='Ingrese direccion'
                      />
                      <span className='text-danger'>{errores.direccion}</span>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-outline">
                      <label className="form-label">*Ciudad:</label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Seleccione una ciudad"
                        isClearable={false}
                        isSearchable={true}
                        options={ciudades}
                        value={selectedOption}
                        onChange={(e) => {
                          setSelectedOption(e);
                          setCiudad(e.value);
                        }}
                      />
                      <span className='text-danger'>{errores.ciudad_id}</span>
                    </div>
                  </div>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">*# Habitaciones:</label>
                  <input 
                    value={habitaciones}
                    onChange={(e) => setHabitaciones(e.target.value) }
                    type='number' 
                    className='form-control'
                    placeholder='Ingrese el numero de habitaciones maxima'
                  />
                  <span className='text-danger'>{errores.num_habitaciones}</span>
                </div>

                <div className="form-check d-flex justify-content-center mb-2">
                  <button type='submit' className='btn btn-primary btn-lg btn-block' style={{ marginRight: 10 }}>Actualizar</button>
                  <Link to="/" className="btn btn-secondary btn-lg btn-block">Cancelar</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
