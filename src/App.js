import './App.css';
import Form from './components/form/Form';
import ErrorPage from './components/ErrorPage/ErrorPage';
import All_Forms_Data from './components/all_forms_data/All_Forms_Data';
import NavBar from './components/navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="*" element={<ErrorPage/>}/>
      <Route path="/" element={<Form/>}/>
      <Route path="/allforms" element={<All_Forms_Data/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
