import React from "react";
import { useBudget } from "../context/BudgetContext";
import uuid from "react-uuid";
import { FaTimes } from "react-icons/fa";

const ShowCase = () => {
  const { incomes, expenses, deleteIncome, deleteExpense, totalIncomes } =
    useBudget();

  const percent = (expense) => {
    if (totalIncomes() > 0) {
      return Math.round(100 / (totalIncomes() / expense));
    } else {
      return null;
    }
  };

  return (
    <div className="d-flex justify-content-center flex-row gap-5">
      <div style={{ width: "40%", color: "#659e97" }}>
        {incomes.length > 0 && <span className="income">Incomes</span>}
        <ul>
          {incomes.map((income) => {
            return (
              <div key={uuid()}>
                <li key={uuid()}>
                  <FaTimes
                    className="icon"
                    onClick={() => {
                      deleteIncome(income.id);
                    }}
                  />

                  <span className="span1">{income.description}</span>
                  <span className="span2 income">{income.value}</span>
                </li>
                <br />
              </div>
            );
          })}
        </ul>
      </div>
      <div style={{ width: "40%", color: "#659e97" }}>
        {expenses.length > 0 && <span className="expense">Expenses</span>}
        <ul>
          {expenses.map((expense) => {
            return (
              <div key={uuid()}>
                <li key={uuid()}>
                  <FaTimes
                    className="icon"
                    onClick={() => {
                      deleteExpense(expense.id);
                    }}
                  />
                  <span className="span1">{expense.description}</span>
                  <span className="span2 expense">{expense.value}</span>

                  {percent(expense.value) > 0 && (
                    <span className="span3">{percent(expense.value)}%</span>
                  )}
                </li>
                <br />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ShowCase;
