
import { useContext } from "react"
import { BudgetForm } from "./components/BudgetForm"
import { BudgetContext } from "./context/BudgetContext"

function App() {

  const context = useContext(BudgetContext)
  console.log(context);

  return (
    <>
      <header className="bg-blue-800 py-8 mx-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de gastos
        </h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        <BudgetForm/>
      </div>
    </>
  )
}

export default App
