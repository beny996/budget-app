import React, { createContext, useContext, useState, useEffect } from "react";

const BudgetContext = createContext();

export const useBudget = () => {
  return useContext(BudgetContext);
};

export const BudgetProvider = ({ children }) => {
  const [incomes, setIncomes] = useState(() => {
    return JSON.parse(localStorage.getItem("listOfIncomes")) || [];
  });
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("listOfExpenses")) || [];
  });

  const addIncome = (description, value) => {
    setIncomes((current) => {
      return [
        ...current,
        {
          id: current.length,
          description: description,
          value: value,
        },
      ];
    });
  };

  const addExpense = (description, value) => {
    setExpenses((current) => {
      return [
        ...current,
        {
          id: current.length,
          description: description,
          value: value,
        },
      ];
    });
  };

  useEffect(() => {
    localStorage.setItem("listOfIncomes", JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem("listOfExpenses", JSON.stringify(expenses));
  }, [expenses]);

  const totalIncomes = () => {
    let total = 0;
    incomes.map((income) => {
      return (total += parseInt(income.value));
    });
    return total;
  };

  const totalExpenses = () => {
    let total = 0;
    expenses.map((expense) => {
      return (total += parseInt(expense.value));
    });
    return total;
  };

  const budget = totalIncomes() - totalExpenses();

  const deleteIncome = (id) => {
    setIncomes(incomes.filter((income) => income.id !== id));
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const format = (number) => {
    return number.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const value = {
    incomes,
    expenses,
    budget,
    totalExpenses,
    totalIncomes,
    addIncome,
    addExpense,
    deleteIncome,
    deleteExpense,
    format,
    setIncomes,
    setExpenses,
  };
  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};
