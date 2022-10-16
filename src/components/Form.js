import React, { useState, useRef } from "react";
import { useBudget } from "../context/BudgetContext";

const Form = () => {
  const { addIncome, addExpense } = useBudget();

  const [selection, setSelection] = useState();
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const selectRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectRef.current?.value === "-") {
      addExpense(description, value);
    } else {
      addIncome(description, value);
    }
    setDescription("");
    setValue("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex align-items-center justify-content-center"
    >
      <select
        required
        ref={selectRef}
        onChange={() => {
          setSelection(selectRef.current.value);
        }}
      >
        <option value="-">-</option>
        <option value="+">+</option>
      </select>

      <input
        placeholder="Add a description"
        maxLength={50}
        required
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      <input
        type="number"
        required
        min={1}
        placeholder="Value"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />

      <button type="submit">
        <div
          className="circle"
          style={{ background: selection === "+" ? "green" : "red" }}
        >
          <div className="checkmark"></div>
        </div>
      </button>
    </form>
  );
};

export default Form;
