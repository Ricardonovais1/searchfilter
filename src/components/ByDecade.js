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

    return (
    <div>
        <header>
            <h1>Ranking de nomes por década</h1>
            <p>Consulte por década (1930 - 2010):</p>
        </header>
        <body>
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
        {error ? (
        <div>{error}</div>
        ) : (
            <div className='namesContainer'>

                <table align='center'>
                {clicked &&
                    <tr>
                        <th align='left'>Ranking</th>
                        <th align='left'>Nome</th>
                        <th align='left'>Ocorrências</th>
                    </tr>
                }
                    {names.map((item, index) => (
                    <tr key={index}>
                        <td align='left'>{item.ranking}º</td>
                        <td align='left'>{item.nome}</td>
                        <td align='left'>{item.frequencia}</td>
                    </tr>
                    ))}
                </table>
            </div>
        )}
        </body>

    </div>
  )
}

export default ByDecade
