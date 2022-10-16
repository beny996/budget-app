import Form from "./components/Form";
import Header from "./components/Header";
import ShowCase from "./components/ShowCase";
import { BudgetProvider } from "./context/BudgetContext";
import "./style.css";

function App() {
  return (
    <div className="App">
      <BudgetProvider>
        <Header />
        <Form />
        <ShowCase />
      </BudgetProvider>
    </div>
  );
}

export default App;
