import './App.css';
import logo from './img/logo.png';
import { useState } from 'react';
import ByDecade from './components/ByDecade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [decade, setDecade] = useState('');
  const [names, setNames] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleMenu = () => {
    setIsActive(!isActive);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(decade)
  };

  const handleButtonClick = () => {
    setClicked(true);
    fetchData(decade);
  };

  const fetchData = async (decade) => {
    try {
      const res = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking/?decada=${decade}`);
      const data = await res.json();
      setNames(data[0].res);
    } catch (error) {
      setNames(error);
    }
  }

  return (
    <div className="App">
      <nav className='app-header'>
        <div className="nav-center">
          <div className="nav-header">
            <span>
               <img src={logo} alt="logo" className='logo' />
            </span>
            <button className='nav-toggle' onClick={handleMenu}>
               <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
        <ul className={`${isActive ? "menu" : "hide"}`}>
          <li className='nav-item'>Home</li>
          <li className='nav-item'>Decade</li>
          <li className='nav-item'>Localidade</li>
          <li className='nav-item'>Sexo</li>
        </ul>
      </nav>
      <ByDecade
        decade={decade}
        setDecade={setDecade}
        handleSubmit={handleSubmit}
        handleButtonClick={handleButtonClick}
        clicked={clicked}
        names={names}
      />
    </div>
  );
}

export default App;
