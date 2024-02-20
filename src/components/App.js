import React, { useEffect, useState } from "react";
import "./App.css"
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
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

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setQuestions([...questions, data]);
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const handleDelete = async (questionId) => {
    try {
      await fetch(`http://localhost:4000/questions/${questionId}`, {
        method: "DELETE",
      });

      setQuestions(questions.filter((question) => question.id !== questionId));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onFormSubmit={handleFormSubmit} />
      ) : (
        <QuestionList questions={questions} onDelete={handleDelete} />
      )}
    </main>
  );
}

export default App;
