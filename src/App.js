import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' //Routes replaces Switch
import Home from './pages/Home/Home'
import Quiz from './pages/Quiz/Quiz'
import Score from './pages/Score/Score'

function App() {
  return (
      <Router>
        <div className="App">
        <Routes>
          <Route exact path='/' element={ <Home/> } />
          <Route exact path='/quiz' element={ <Quiz/> } /> 
          <Route exact path='/score' element={ <Score/> } /> 
        </Routes>
        </div>
      </Router>
    
  );
}

export default App;
