import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { ShowHoteles } from './components/ShowHoteles';
import { ShowHotel } from './components/ShowHotel';
import { CreateHotel } from './components/CreateHotel';
import { EditHotel } from './components/EditHotel';

import { ShowHabitaciones } from './components/ShowHabitaciones';
import { CreateHabitacion } from './components/CreateHabitacion';
import { EditHabitacion } from './components/EditHabitacion';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <ShowHoteles/> } />
          <Route path='/create' element={ <CreateHotel/> } />
          <Route path='/view/:id' element={ <ShowHotel/> } />
          <Route path='/edit/:id' element={ <EditHotel/> } />

          <Route path='/habitacion/:id' element={ <ShowHabitaciones/> } />
          <Route path='/habitacion/create/:hotel_id' element={ <CreateHabitacion/> } />
          <Route path='/habitacion/edit/:id' element={ <EditHabitacion/> } />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
