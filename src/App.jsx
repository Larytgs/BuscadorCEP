import {useState} from 'react'
import {FiSearch} from 'react-icons/fi'
import './style.css'
import api from './services/api'

function App() {
  
  const [input, setInput] = useState('')
  const [cep, setCep] = useState('')

  async function handleSearch(){ //função assincrona

    //ver se o usuario digitou algo
    if (input === ''){
      alert("Preencha algum CEP!")
      return;
    }

    try{ //try: tentativa doq eu quero fazer, mas q pode dar errado
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')

    }catch{ //caso der errado, faça isso:
      alert("Opss.. erro ao buscar o CEP.")
      setInput('')
    }
  }



  return (
    <>
      <div className="container">
        <h1 className="title">Buscador CEP</h1>
          
          <div className="containerInput">
            <input 
              type="text" 
              placeholder="Digite seu CEP..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button className="button" onClick={handleSearch}>
              <FiSearch size={25} color='#fff'/>
            </button>
          </div>

          {Object.keys(cep).length > 0 &&(
            <main className='main'>
              <h2>CEP: {cep.cep}</h2>
              <span>Rua: {cep.logradouro}</span>
              <span>Complemento:{cep.complemento}</span>
              <span>Bairro: {cep.bairro}</span>
              <span>{cep.localidade}-{cep.uf}</span>
            </main>
          )} 
      </div>
    </>
  )
}

export default App
