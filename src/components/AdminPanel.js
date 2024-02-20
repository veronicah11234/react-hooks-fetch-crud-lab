
import React, { useState, useEffect } from 'react';

const QuestionList = ({ questions }) => {


    return (
      <div>
        <h2>Question List</h2>
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              <strong>{question.prompt}</strong>
              <ul>
                {question.answers.map((answer, index) => (
                  <li key={index}>{answer}</li>
                ))}
              </ul>
              <p>Correct Answer Index: {question.correctIndex}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      </div>
    );
  };

c

const AdminPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    prompt: '',
    answers: [],
    correctIndex: 0,
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:4000/questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });

      const data = await response.json();
      setQuestions([...questions, data]);
      setNewQuestion({ prompt: '', answers: [], correctIndex: 0 });
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <div>
      <NewQuestionForm
        newQuestion={newQuestion}
        setNewQuestion={setNewQuestion}
        onSubmit={handleFormSubmit}
      />
      <QuestionList questions={questions} />
    </div>
  );
};

export default AdminPanel;