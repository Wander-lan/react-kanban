import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import TaskViewModel from './components/TaskViewModel/TaskViewModel';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Navbar/>
      <TaskViewModel/>
    </div>
  );
}

export default App;
