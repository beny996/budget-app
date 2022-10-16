import React from "react";
import { useBudget } from "../context/BudgetContext";
import img from "../assets/images/budget.png";

const Header = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[new Date().getMonth()];
  const year = new Date().getFullYear();

  const { budget, totalIncomes, totalExpenses, format } = useBudget();

  const percent =
    totalIncomes() > 0
      ? Math.round(100 / (totalIncomes() / totalExpenses()))
      : null;

  return (
    <div
      className="d-flex align-items-center flex-column"
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "300px",
      }}
    >
      <h2>
        Available budget in {month} {year} :
      </h2>
      <>
        <h1>{budget > 0 ? `+${format(budget)}` : `${format(budget)}`}</h1>
        <div>
          <div className="incomesContainer d-flex flex-column justify-content-center">
            <div className="incomesDescription">Income</div>
            <div className="incomesValue">
              {totalIncomes() > 0 && `+${format(totalIncomes())}`}
            </div>
          </div>
          <div className="expensesContainer d-flex flex-column justify-content-center">
            <div className="expensesDescription">Expense</div>
            <div className="expensesValue">
              {totalExpenses() > 0 && `-${format(totalExpenses())}`}
            </div>

            {percent > 0 && <div className="expensesPercent"> {percent}%</div>}
          </div>
        </div>
      </>
    </div>
  );
};

export default Header;
