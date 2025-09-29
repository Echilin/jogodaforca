<div className="container">
  <h1>🎮 Jogo da Forca</h1>
  <svg height="250" width="200" className="forca">
    {/* Base da forca */}
    <line x1="10" y1="240" x2="150" y2="240" stroke="#000" strokeWidth="4"/>
    <line x1="30" y1="240" x2="30" y2="20" stroke="#000" strokeWidth="4"/>
    <line x1="30" y1="20" x2="100" y2="20" stroke="#000" strokeWidth="4"/>
    <line x1="100" y1="20" x2="100" y2="40" stroke="#000" strokeWidth="4"/>

    {/* Cabeça */}
    {tentativas <= 5 && <circle cx="100" cy="60" r="20" stroke="#000" strokeWidth="4" fill="transparent"/>}

    {/* Corpo */}
    {tentativas <= 4 && <line x1="100" y1="80" x2="100" y2="140" stroke="#000" strokeWidth="4"/>}

    {/* Braço esquerdo */}
    {tentativas <= 3 && <line x1="100" y1="100" x2="70" y2="120" stroke="#000" strokeWidth="4"/>}

    {/* Braço direito */}
    {tentativas <= 2 && <line x1="100" y1="100" x2="130" y2="120" stroke="#000" strokeWidth="4"/>}

    {/* Perna esquerda */}
    {tentativas <= 1 && <line x1="100" y1="140" x2="80" y2="180" stroke="#000" strokeWidth="4"/>}

    {/* Perna direita */}
    {tentativas <= 0 && <line x1="100" y1="140" x2="120" y2="180" stroke="#000" strokeWidth="4"/>}
  </svg>

  <h2>{palavraExibida}</h2>
  <p>Tentativas restantes: {tentativas}</p>

  {status === "jogando" && (
    <div className="input-area">
      <input
        type="text"
        maxLength={1}
        value={letra}
        onChange={(e) => setLetra(e.target.value)}
      />
      <button onClick={enviarLetra}>Enviar</button>
    </div>
  )}

  <div className="tentativas">
    <p>Letras corretas: {acertos.join(", ")}</p>
    <p>Letras erradas: {erros.join(", ")}</p>
  </div>

  {status === "venceu" && <h2 className="venceu">🎉 Parabéns! Você venceu! A palavra era {palavra}.</h2>}
  {status === "perdeu" && <h2 className="perdeu">💀 Você perdeu! A palavra era {palavra}.</h2>}

  <button className="reiniciar" onClick={novaPalavra}>Reiniciar</button>
</div>
