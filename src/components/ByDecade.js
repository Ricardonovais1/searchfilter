import React from 'react'
import './ByDecade.css';
import { useRef } from 'react';

const ByDecade = ({ decade,
                    setDecade,
                    handleSubmit,
                    handleButtonClick,
                    clicked,
                    error,
                    names
                }) => {

    const inputGeneral = useRef(null);
    const modifyFrequency = (frequency) => {
        let str = frequency.toString();
        let result = '';

        for (let i = 0; i < str.length; i++) {
          if (i > 0 && (str.length - i) % 3 === 0) {
            result += '.';
          }
          result += str[i];
        }
        return result;
      }


    return (
    <div className='compBody'>
        <header>
            <h1>Ranking de nomes por década</h1>
            <p>Consulte por década (1930 - 2010):</p>
        </header>
        <form onSubmit={handleSubmit}>
            <input
                className='nameInput'
                type="text"
                placeholder="Insira a década"
                value={decade}
                onChange={e => setDecade(e.target.value)}
                ref={inputGeneral}
            />
            <button
                className='inputButton'
                type="submit"
                onClick={handleButtonClick}>Buscar
            </button>
        </form>
        {clicked && <p className='tableTitle'>Ranking de nomes para a década de {decade}</p>}
        <div className='namesContainer'>
            <table align='center'>
            {clicked &&
                <thead>
                    <tr>
                        <th align='left'>Ranking</th>
                        <th align='left'>Nome</th>
                        <th align='left'>Ocorrências</th>
                    </tr>
                </thead>
            }
                {names.map((item, index) => (
                <tbody key={index}>
                    <tr>
                        <td align='left'>{item.ranking}º</td>
                        <td align='left'>{item.nome}</td>
                        <td align='left'>{modifyFrequency(item.frequencia)}</td>
                    </tr>
                </tbody>
                ))}
            </table>
        </div>
    </div>
  )
}

export default ByDecade
