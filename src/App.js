import './App.css';
import { Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';

function App() {
  return (
    <>

     <Navbar />

    <Routes>

     <Route exact path='/' element={<Home/>} />
     <Route exact path='/about' element={<About/>}/>

    </Routes>

     

    </>
  );
}

export default App;
