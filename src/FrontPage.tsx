import React, { useState } from "react";
import styled, { ThemeProvider, DefaultTheme } from "styled-components";
import {
  FaSun,
  FaMoon,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaUniversalAccess,
} from "react-icons/fa";
import Quiz from "./components/Quiz";
import data from "./data.json";

interface Theme {
  background: string;
  color: string;
  cardBackground: string;
  cardHover: string;
}

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizData {
  title: string;
  questions: Question[];
  icon: string;
}

const lightTheme: Theme = {
  background: "#f9f9f9",
  color: "#333",
  cardBackground: "#fff",
  cardHover: "#e0e0e0",
};

const darkTheme: Theme = {
  background: "#1d1f2b", // deep blue background color
  color: "#f9f9f9",
  cardBackground: "#333",
  cardHover: "#444",
};

interface AppProps {
  theme: DefaultTheme;
}

const AppContainer = styled.div<AppProps>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
  transition: all 0.3s;
`;

const TitleSection = styled.div`
  text-align: left;
  flex: 1;
  padding-top: 200px; // Align top padding with ButtonsSection
  padding-left: 300px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 2px;
  display: flex;
  flex-direction: column;
`;

const MainTitle = styled.span`
  margin-bottom: 5px;
`;

const QuizTitle = styled.span`
  color: #fff;
`;

const Subtitle = styled.h3`
  font-size: 15px;
  color: ${(props) => props.theme.color};
`;

const ButtonsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  padding-top: 200px; // Align top padding with TitleSection
  padding-right: 400px;
`;

const Card = styled.button<AppProps>`
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.color};
  padding: 15px 30px;
  margin: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;

  &:hover {
    background-color: ${(props) => props.theme.cardHover};
  }
`;

const ThemeToggle = styled.div<AppProps>`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #9d53c3;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;

  &:hover {
    background-color: ${(props) => props.theme.cardHover};
  }
`;

const Frontend: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const handleQuizSelect = (quizIndex: number) => {
    setSelectedQuiz(data.quizzes[quizIndex]);
  };

  const handleReturn = () => {
    setSelectedQuiz(null);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const getIcon = (title: string) => {
    switch (title) {
      case "HTML":
        return <FaHtml5 />;
      case "CSS":
        return <FaCss3Alt />;
      case "JavaScript":
        return <FaJsSquare />;
      case "Accessibility":
        return <FaUniversalAccess />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <AppContainer theme={theme === "dark" ? darkTheme : lightTheme}>
        <ThemeToggle onClick={toggleTheme}>
          {theme === "dark" ? <FaSun /> : <FaMoon />}
          <span style={{ marginLeft: "10px" }}>
            Toggle {theme === "dark" ? "Light" : "Dark"} Theme
          </span>
        </ThemeToggle>
        {selectedQuiz ? (
          <Quiz quiz={selectedQuiz} theme={theme} onReturn={handleReturn} />
        ) : (
          <>
            <TitleSection>
              <Title>
                <MainTitle>Welcome to the</MainTitle>
                <QuizTitle>Frontend Quiz!</QuizTitle>
              </Title>
              <Subtitle>Pick a subject to get started.</Subtitle>
            </TitleSection>
            <ButtonsSection>
              {data.quizzes.map((quiz, index) => (
                <Card
                  key={index}
                  onClick={() => handleQuizSelect(index)}
                  theme={theme === "dark" ? darkTheme : lightTheme}
                >
                  {getIcon(quiz.title)}
                  <span style={{ marginLeft: "10px" }}>{quiz.title}</span>
                </Card>
              ))}
            </ButtonsSection>
          </>
        )}
      </AppContainer>
    </ThemeProvider>
  );
};

export default Frontend;
