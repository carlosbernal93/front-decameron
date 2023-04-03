import React, {useState, useEffect} from 'react';
import {useParams, Link } from 'react-router-dom';
import API from '../api/api';

export const ShowHotel = () => {
  const [nit, setNit] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [habitaciones, setHabitaciones] = useState(0);
  const [listadoHabitaciones, setListadoHabitaciones] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    const getHotelById = async () => {
      const response = await API.get(`/hoteles/show/${id}`);
      setNit(response.data.nit);
      setNombre(response.data.nombre);
      setDireccion(response.data.direccion);
      setCiudad(response.data.nombre_ciudad);
      setHabitaciones(response.data.num_habitaciones);
      getHabitacionesByHotel(id);
    };

    const getHabitacionesByHotel = async (hotel_id) => {
        const response = await API.get(`/habitaciones/${hotel_id}`);
        setListadoHabitaciones(response.data);
    };
    getHotelById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <div className='container'>
        <div className="row" style={{"margin-top":15}}>
          <div className="col-md-12 mb-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Ver Hotel</h5>
              </div>

              <div className="card-body">
                <form>
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label">NIT:</label>
                        <label className="form-control">{nit}</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label">Nombre:</label>
                        <label className="form-control">{nombre}</label>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label">Direccion:</label>
                        <label className="form-control">{direccion}</label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-outline">
                        <label className="form-label">Ciudad:</label>
                        <label className="form-control">{ciudad}</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label"># Habitaciones:</label>
                    <label className="form-control">{habitaciones}</label>
                  </div>

                  <div className="form-outline mb-4">
                    <h5 className="mb-0" style={ {margin:10} } >Habitaciones</h5>
                    <table className='table table-striped'>
                        <thead className='bg-primary text-white'>
                            <tr>
                                <th>Cantidad</th>
                                <th>Tipo Habitacion</th>
                                <th>Tipo Acomodacion</th>
                            </tr>
                        </thead>
                        <tbody>
                            { listadoHabitaciones.map( (hab) => (
                                <tr key={hab.id}>
                                    <td>{hab.cantidad}</td>
                                    <td>{hab.nombre_habitacion}</td>
                                    <td>{hab.nombre_acomodacion}</td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                  </div>

                  <div className="form-check d-flex justify-content-center mb-2">
                    <Link to="/" className="btn btn-primary btn-lg btn-block">Regresar</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
