import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import "./App.css"

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (questionId) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${questionId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setQuestions((prevQuestions) => prevQuestions.filter(q => q.id !== questionId));
      } else {
        console.error('Error deleting question:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions && questions.length > 0 ? (
          questions.map((question) => (
            <QuestionItem key={question.id} question={question} onDelete={handleDelete} />
          ))
        ) : (
          <li>No questions available</li>
        )}
      </ul>
    </section>
  );
}

export default QuestionList;
