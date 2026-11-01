function Home({ onEntrar }) {
  return (
    <div>
      <h1>Clínica Odontológica</h1>
      <p>Bem-vindo! Agende sua consulta.</p>
      <button onClick={onEntrar}>Área do profissional</button>
    </div>
  )
}

export default Home