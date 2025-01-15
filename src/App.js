import logo from './logo.svg';
import './App.css';
import Navbar from './component/navbar/Navbar';
import Router from './router/Router';
import ShortcutBar from './component/common/ShortCutBar';


function App() {
  return (
    <div className="App overflow-x-hidden  relative ">
      <Navbar/>
      <ShortcutBar/>
      <Router/>
    </div>
  );
}

export default App;
