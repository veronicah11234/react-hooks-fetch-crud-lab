import React from "react";
import "./App.css"


function QuestionItem({ question, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = Array.isArray(answers)
    ? answers.map((answer, index) => (
        <option key={index} value={index}>
          {answer}
        </option>
      ))
    : null;

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <li style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button  className="delete" onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
