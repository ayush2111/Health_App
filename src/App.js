import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './pages/Form.js';
import DisplayData from './pages/DisplayData.js';
import Home from './pages/Home.js'
import Error from './pages/Error.js'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/form' element={<Form/>}/>
          <Route path='/:id' element={<DisplayData/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
