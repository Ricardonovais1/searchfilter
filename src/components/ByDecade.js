import React from 'react'

const ByDecade = ({ decade, setDecade, handleSubmit, handleButtonClick, clicked, error, names }) => {

    return (
    <div>
        <h1>Ranking de nomes por década</h1>
        <p>Insira a década que deseja consultar:</p>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Insira a década" value={decade} onChange={e => setDecade(e.target.value)} />
            <button type="submit" onClick={handleButtonClick}>Buscar</button>
        </form>
        {clicked && <p>Ranking de nomes para a década de {decade}</p>}
        {error ? (
        <div>{error}</div>
        ) : (
            <div className='namesContainer'>
            <ul className="names">
                {names.map((item, index) => (
                <li key={index}>{`${item.ranking} - ${item.nome} - Ocorrências: ${item.frequencia}`}</li>
                ))}
            </ul>
            </div>
        )}
    </div>
  )
}

export default ByDecade
