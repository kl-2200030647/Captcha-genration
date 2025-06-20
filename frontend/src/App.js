//import logo from './logo.svg';
import { Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Navbar from './components/NavBar';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="flex justify-center items-center mt-10">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
