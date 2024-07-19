import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizProps {
  quiz: {
    title: string;
    questions: Question[];
  };
  theme: "light" | "dark";
  onReturn: () => void;
}

const QuizContainer = styled.div<{ theme: string }>`
  margin-top: 20px;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  background-color: ${(props) => (props.theme === "dark" ? "#333" : "#f9f9f9")};
  color: ${(props) => (props.theme === "dark" ? "#f9f9f9" : "#333")};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionButton = styled.button<{
  selected?: boolean;
  highlighted?: boolean;
  correct?: boolean;
  wrong?: boolean;
}>`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  cursor: pointer;
  border-radius: 5px;
  transition: border 0.3s, background-color 0.3s;
  background-color: ${(props) =>
    props.highlighted ? "#e0e0e0" : props.selected ? "#9d53c3" : "white"};
  border: ${(props) =>
    props.correct
      ? "4px solid #28a745"
      : props.wrong
      ? "4px solid #dc3545"
      : "1px solid #ddd"};

  &:hover {
    background-color: #9d53c3;
    border: 4px solid #9d53c3;
  }
`;

const CorrectAnswerText = styled.p`
  margin-top: 10px;
  color: #28a745;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  margin-top: 10px;
  color: #9d53c3;
  font-weight: bold;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #9d53c3;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const QuizCompleted = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const QuestionNumber = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  color: #9d53c3;
  font bold
`;

const ReturnButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #9d53c3;
  }
`;

const Quiz: React.FC<QuizProps> = ({ quiz, theme, onReturn }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [highlightedOption, setHighlightedOption] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const currentQuestion = quiz.questions[currentQuestionIndex];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setHighlightedOption((prev) =>
          prev < currentQuestion.options.length - 1 ? prev + 1 : 0
        );
      } else if (event.key === "ArrowUp") {
        setHighlightedOption((prev) =>
          prev > 0 ? prev - 1 : currentQuestion.options.length - 1
        );
      } else if (event.key === "Enter") {
        if (currentQuestion && currentQuestion.options[highlightedOption])
          handleAnswerSelect(currentQuestion.options[highlightedOption]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [highlightedOption, currentQuestion]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setErrorMessage("");
  };

  const handleSubmit = () => {
    if (!selectedAnswer) {
      setErrorMessage("Please give an answer");
    } else {
      setShowResult(true);
      if (selectedAnswer === currentQuestion.answer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer("");
    setHighlightedOption(0);
    setShowResult(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setErrorMessage("");
  };

  return (
    <QuizContainer theme={theme}>
      <h2>{quiz.title}</h2>
      {currentQuestion ? (
        <QuestionContainer>
          <QuestionNumber>
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </QuestionNumber>
          <h3>{currentQuestion.question}</h3>
          <OptionsContainer>
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isHighlighted = index === highlightedOption;
              const isCorrect = showResult && option === currentQuestion.answer;
              const isWrong =
                showResult && isSelected && option !== currentQuestion.answer;

              return (
                <OptionButton
                  key={index}
                  selected={isSelected}
                  highlighted={isHighlighted}
                  correct={isCorrect}
                  wrong={isWrong}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                >
                  {option}
                </OptionButton>
              );
            })}
          </OptionsContainer>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {showResult && selectedAnswer !== currentQuestion.answer && (
            <CorrectAnswerText>
              Correct answer: {currentQuestion.answer}
            </CorrectAnswerText>
          )}
          {showResult ? (
            <SubmitButton onClick={handleNextQuestion}>
              Next Question
            </SubmitButton>
          ) : (
            <SubmitButton onClick={handleSubmit}>Submit Answer</SubmitButton>
          )}
        </QuestionContainer>
      ) : (
        <QuizCompleted>
          <h3>You've completed the quiz!</h3>
          <p style={{ color: "#9d53c3" }}>
            Your score: {score} out of {quiz.questions.length}
          </p>
          <ReturnButton onClick={onReturn}>Return to Quiz Options</ReturnButton>
        </QuizCompleted>
      )}
    </QuizContainer>
  );
};

export default Quiz;
