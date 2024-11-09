import logo from './logo.svg';
import './App.css';
import Navbar from './component/navbar/Navbar';
import Router from './router/Router';


function App() {
  return (
    <div className="App overflow-x-hidden  relative ">
      <Navbar/>
      <Router/>
    </div>
  );
}

export default App;
