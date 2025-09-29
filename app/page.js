'use client'; // Necessário para usar Hooks do React (useState, useEffect)

import { useState, useEffect } from 'react';

// Lista de palavras para o jogo
const palavras = ['REACT', 'NEXTJS', 'JAVASCRIPT', 'PROGRAMACAO', 'VERCEL'];

// Componente principal do Jogo da Forca
export default function JogoDaForca() {
  const [palavraSecreta, setPalavraSecreta] = useState('');
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState(new Set());
  const [tentativasRestantes, setTentativasRestantes] = useState(6);
  const [statusJogo, setStatusJogo] = useState('jogando'); // 'jogando', 'ganhou', 'perdeu'
  const [mensagem, setMensagem] = useState('Adivinhe a palavra!');
  const [chute, setChute] = useState('');

  // 1. Inicia um novo jogo
  useEffect(() => {
    iniciarNovoJogo();
  }, []);

  const iniciarNovoJogo = () => {
    // Escolhe uma palavra aleatória
    const palavra = palavras[Math.floor(Math.random() * palavras.length)];
    setPalavraSecreta(palavra);
    setLetrasAdivinhadas(new Set());
    setTentativasRestantes(6);
    setStatusJogo('jogando');
    setMensagem('Adivinhe a palavra!');
    setChute('');
  };

  // 2. Cria a palavra mascarada (ex: P _ _ G R A M A Ç Ã O)
  const palavraMascarada = palavraSecreta
    .split('')
    .map(letra => (letrasAdivinhadas.has(letra) ? letra : '_'))
    .join(' ');

  // 3. Verifica o Status do Jogo
  useEffect(() => {
    if (palavraSecreta && statusJogo === 'jogando') {
      // Condição de vitória: se a palavra mascarada não tiver mais '_'
      if (!palavraMascarada.includes('_')) {
        setStatusJogo('ganhou');
        setMensagem('🎉 Parabéns! Você ganhou!');
      } else if (tentativasRestantes === 0) {
        // Condição de derrota
        setStatusJogo('perdeu');
        setMensagem(`Você perdeu! A palavra era: ${palavraSecreta}`);
      }
    }
  }, [palavraMascarada, tentativasRestantes, palavraSecreta, statusJogo]);


  // 4. Lógica de submissão do chute
  const handleSubmit = (event) => {
    event.preventDefault();
    if (statusJogo !== 'jogando' || !chute) return;

    const letra = chute.toUpperCase().trim();
    setChute(''); // Limpa o campo de input

    if (letrasAdivinhadas.has(letra)) {
      setMensagem(`A letra '${letra}' já foi usada. Tente outra!`);
      return;
    }

    setLetrasAdivinhadas(prev => new Set(prev).add(letra));

    if (palavraSecreta.includes(letra)) {
      setMensagem('Boa! Letra correta.');
    } else {
      setMensagem('Ops! Letra incorreta.');
      setTentativasRestantes(prev => prev - 1);
    }
  };


  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>Jogo da Forca</h1>

      {/* Mensagens de status do jogo */}
      <p style={{ fontSize: '1.2em', color: statusJogo === 'ganhou' ? 'green' : statusJogo === 'perdeu' ? 'red' : 'black' }}>
        {mensagem}
      </p>

      {/* Palavra Mascarada */}
      <h2 style={{ letterSpacing: '10px', margin: '20px 0' }}>
        {palavraMascarada}
      </h2>

      {/* Tentativas e Letras usadas */}
      <p>Tentativas restantes: **{tentativasRestantes}**</p>
      <p>Letras já usadas: **{[...letrasAdivinhadas].join(', ')}**</p>

      {/* Formulário de Chute */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          maxLength="1"
          value={chute}
          onChange={(e) => setChute(e.target.value.toUpperCase())}
          disabled={statusJogo !== 'jogando'}
          style={{ padding: '8px', marginRight: '10px', fontSize: '16px' }}
          placeholder="Digite uma letra"
          required
        />
        <button 
          type="submit" 
          disabled={statusJogo !== 'jogando'}
          style={{ padding: '8px 15px', fontSize: '16px' }}
        >
          Chutar
        </button>
      </form>

      {/* Botão de Novo Jogo */}
      {(statusJogo === 'ganhou' || statusJogo === 'perdeu') && (
        <button
          onClick={iniciarNovoJogo}
          style={{ padding: '10px 20px', fontSize: '18px', marginTop: '20px', cursor: 'pointer' }}
        >
          Novo Jogo
        </button>
      )}

    </div>
  );
}