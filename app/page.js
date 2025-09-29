'use client'; // Necessário para usar Hooks do React (useState, useRouter)

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Constante para o número máximo de tentativas
const MAX_TENTATIVAS = 3; 

export default function Home() {
  const router = useRouter();

  // 1. Variáveis de Estado para o Formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2. Variáveis de Estado Corrigidas: Contagem de Tentativas e Mensagem de Erro
  const [tentativasRestantes, setTentativasRestantes] = useState(MAX_TENTATIVAS);
  const [errorMessage, setErrorMessage] = useState('');
  
  // 3. Estado para desabilitar o formulário após o limite de tentativas
  const [isFormDisabled, setIsFormDisabled] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();

    // Se o formulário estiver desabilitado, não faz nada
    if (isFormDisabled) return; 

    // Lógica de Validação (substitua isso pela sua lógica de API/Autenticação real)
    // Usando um placeholder simples para teste:
    if (email === 'teste@teste.com' && password === '123456') {
      // Login bem-sucedido
      setErrorMessage(''); // Limpa qualquer erro anterior
      router.push('/dashboard');
    } else {
      // Login falhou
      setErrorMessage('Credenciais inválidas.');

      // --- Lógica de Tentativas Corrigida ---
      const novasTentativas = tentativasRestantes - 1;
      setTentativasRestantes(novasTentativas); // Atualiza o estado

      // Verifica se o limite foi atingido
      if (novasTentativas <= 0) { 
        setErrorMessage('Número máximo de tentativas excedido. O login foi bloqueado.');
        setIsFormDisabled(true); // Desabilita o formulário
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      
      {/* Exibe o erro se houver */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      {/* Exibe as tentativas restantes */}
      {!isFormDisabled && (
        <p>Tentativas restantes: {tentativasRestantes}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isFormDisabled} // Desabilita o campo
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isFormDisabled} // Desabilita o campo
          />
        </div>
        <button 
          type="submit" 
          disabled={isFormDisabled} // Desabilita o botão
        >
          Entrar
        </button>
      </form>
    </div>
  );
}