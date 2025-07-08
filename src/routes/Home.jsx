import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px; 

  @media (max-width: 768px) {
    padding-top: 60px;
  }
`;

const HeroSection = styled.section`
  width: 100%;
  height: 400px;
  background: linear-gradient(to right, ${({ theme }) => theme.colors.primary.x500}, ${({ theme }) => theme.colors.primary.x700});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.x100};
  text-align: center;
  padding: 0 2rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    height: auto;
    padding: 4rem 2rem;

    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 24px;
  border: none;
  cursor: pointer;
  background-color: ${({ theme, primary }) => (primary ? theme.colors.background.x700 : 'transparent')};
  color: ${({ theme, primary }) => (primary ? theme.colors.primary.x500 : theme.colors.text.x100)};
  border: 2px solid ${({ theme }) => theme.colors.background.x700};
  margin: 0 1rem;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
    width: 100%;
  }
`;

const FeaturesSection = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 4rem 2rem;
  display: flex;
  justify-content: space-around;
  text-align: center;

  div {
    max-width: 300px;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primary.x600};
  }

  p {
    color: ${({ theme }) => theme.colors.text.x200};
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    div {
      margin-bottom: 2rem;
    }
  }
`;

const CallToActionSection = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.status.success};
  padding: 4rem 2rem;
  text-align: center;

  h2 {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text.x100};
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <HeroSection>
        <h1>Bem-vindo ao ASCII Hub</h1>
        <p>A plataforma para conectar e fortalecer Empresas Juniores.</p>
        <div>
          <Button primary onClick={() => navigate('/login')}>Cadastre sua EJ</Button>
          <Button onClick={() => navigate('/ranking')}>Conheça as EJs</Button>
        </div>
      </HeroSection>
      <FeaturesSection>
        <div>
          <h2>Ranking</h2>
          <p>Acompanhe o desempenho das Empresas Juniores em nosso ranking atualizado em tempo real.</p>
        </div>
        <div>
          <h2>Parcerias</h2>
          <p>Encontre e estabeleça parcerias estratégicas com outras EJs para impulsionar seus projetos.</p>
        </div>
        <div>
          <h2>Perfil</h2>
          <p>Crie um perfil detalhado para sua EJ, mostrando seus projetos, membros e conquistas.</p>
        </div>
      </FeaturesSection>
      <CallToActionSection>
        <h2>Pronto para começar?</h2>
        <Button primary onClick={() => navigate('/login')}>Cadastro Verde</Button>
      </CallToActionSection>
    </HomeContainer>
  );
};

export default Home;