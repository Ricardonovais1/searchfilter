import './App.css';
import { useState } from 'react';
import ByDecade from './components/ByDecade';

function App() {

  const [decade, setDecade] = useState('');
  const [names, setNames] = useState([]);
  const [clicked, setClicked] = useState(false);


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
