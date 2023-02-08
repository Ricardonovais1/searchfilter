// CSS imporys
import './App.css';
import logo from './img/logo.png';
import { faBars } from '@fortawesome/free-solid-svg-icons';


// React imports
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Componentes
import StartScreen from './components/StartScreen';
import ByDecade from './components/ByDecade';
import Local from './components/Local';
import Sex from './components/Sex';



const options = [
  {id: 1, name: 'home'},
  {id: 2, name: 'decade'},
  {id: 3, name: 'local'},
  {id: 4, name: 'sex'}
]


function App() {

  const [decade, setDecade] = useState('');
  const [names, setNames] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [isActive, setIsActive] = useState(window.innerWidth > 799);
  const [option, setOption] = useState(options[0].name);

  useEffect(() => {
    const handleResize = () => {
      setIsActive(window.innerWidth > 799);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (newOption) => {
    setOption(prevState => {
      return newOption;
    })
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
          <div className="nav-header">
            <span>
               <img src={logo} alt="logo" className='logo' />
            </span>
            <button className='nav-toggle' onClick={() => setIsActive(!isActive)}>
               <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        <ul className={`${isActive ? "menu" : "hide"}`}>
          <li className='nav-item' onClick={() => handleClick(options[0].name)}>Home</li>
          <li className='nav-item' onClick={() => handleClick(options[1].name)}>Década</li>
          <li className='nav-item' onClick={() => handleClick(options[2].name)}>Localidade</li>
          <li className='nav-item' onClick={() => handleClick(options[3].name)}>Sexo</li>
        </ul>
      </nav>
      {/* Componente de busca por década: */}
      {option === 'home' && <StartScreen />}
      {option === 'decade' && <ByDecade
                                decade={decade}
                                setDecade={setDecade}
                                handleSubmit={handleSubmit}
                                handleButtonClick={handleButtonClick}
                                clicked={clicked}
                                names={names}
      />}
      {option === 'local' && <Local />}
      {option === 'sex' && <Sex />}

    </div>
  );
}

export default App;
