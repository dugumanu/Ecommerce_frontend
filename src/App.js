import logo from './logo.svg';
import './App.css';
import Navbar from './component/navbar/Navbar';
import Router from './router/Router';
import ShortcutBar from './component/common/ShortCutBar';
import Footer from './component/common/Footer';


function App() {
  return (
    <div className="App overflow-x-hidden  relative ">
      <Navbar/>
      <ShortcutBar/>
      
      <Router/>
      <Footer/>
    </div>
  );
}

export default App;
