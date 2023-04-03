import React, {useState, useEffect} from 'react';
import {useNavigate, Link, useParams} from 'react-router-dom';
import Select from 'react-select';
import API from '../api/api';

export const EditHabitacion = () => {
  const [hotel, setHotel] = useState([]);

  const [habitaciones, setHabitaciones] = useState([]);
  const [habitacion, setHabitacion] = useState(0);
  const [acomodaciones, setAcomodaciones] = useState([]);
  const [acomodacion, setAcomodacion] = useState(0);

  const [cantidad, setCantidad] = useState(0);

  const [selectedHabitacion,  setSelectedHabitacion] = useState(null);
  const [selectedAcomodacion, setSelectedAcomodacion] = useState(null);
  const [errores, setErrores] = useState([]);

  const {id} = useParams();
  const navigate = useNavigate();

  const update = async (e) => {
    e.preventDefault();
    const resp = await API.put(`/habitaciones/update/${id}`, {
      hotel_id: hotel, 
      tipo_habitacion_id: habitacion, 
      tipo_acomodacion_id: acomodacion, 
      cantidad: cantidad, 
    }).catch(function (error) {
      if (error.response) {
        setErrores(error.response.data.errors);
      }
    });

    if(typeof resp !== 'undefined' && resp.data.status === 200){
      navigate(`/habitacion/${hotel}`);
    }
  };

  useEffect(() => {
    const getTipos = async () => {
      const response = await API.get('/selects/selectTipoHabitaciones');
      setHabitaciones(response.data);
    };

    const getHabitacionById = async () => {
      const response = await API.get(`/habitaciones/show/${id}`);
      setSelectedHabitacion({label: response.data.nombre_habitacion, value: response.data.tipo_habitacion_id});
      setSelectedAcomodacion({label: response.data.nombre_acomodacion, value: response.data.tipo_acomodacion_id});
      setHotel(response.data.hotel_id);
      setHabitacion(response.data.tipo_habitacion_id);
      setAcomodacion(response.data.tipo_acomodacion_id);
      setCantidad(response.data.cantidad);
      getTipos();
      getAcomodaciones(response.data.tipo_habitacion_id);
    };
    getHabitacionById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAcomodaciones = async (id) => {
    setHabitacion(id);
    const response = await API.get(`/selects/selectAcomodaciones/${id}`);    
    setAcomodaciones(response.data);
  }

  return (
    <div className='container'>
        <div className="row" style={{"margin-top":15}}>
          <div className="col-md-12 mb-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Editar Habitacion</h5>
              </div>

              <div className="card-body">
                <form onSubmit={update}>
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label">*Tipo Habitacion:</label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder="Seleccione un tipo de habitación"
                          isClearable={false}
                          isSearchable={true}
                          options={habitaciones}
                          value={selectedHabitacion}
                          onChange={(e) => {
                            setSelectedHabitacion(e);
                            getAcomodaciones(e.value);
                          }}
                        />
                        <span className='text-danger'>{errores.tipo_habitacion_id}</span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label">*Acomodacion:</label>
                        <Select 
                          className="basic-single"
                          classNamePrefix="select"
                          options={acomodaciones}
                          placeholder="Seleccione un tipo de acomodacion"
                          isClearable={false}
                          isSearchable={true}
                          value={selectedAcomodacion}
                          onChange={(e) => {
                            setSelectedAcomodacion(e);
                            setAcomodacion(e.value);
                          }}
                        />
                        <span className='text-danger'>{errores.tipo_acomodacion_id}</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">* Cantidad:</label>
                    <input
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value) }
                      type='number' 
                      className='form-control'
                      placeholder='Ingrese la cantidad'
                    />
                    <span className='text-danger'>{errores.cantidad}</span>
                  </div>

                  <div className="form-check d-flex justify-content-center mb-2">
                    <button type='submit' className='btn btn-primary btn-lg btn-block' style={{ marginRight: 10 }}>Actualizar</button>
                    <Link to={`/habitacion/${hotel}`} className="btn btn-secondary btn-lg btn-block">Cancelar</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}
