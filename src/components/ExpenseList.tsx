import { useMemo } from "react"
import { useBudget } from "../hook/useBudget"
import { ExpenseDetail } from "./ExpenseDetail"


export const ExpenseList = () => {

    const {state} = useBudget()

    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses])
  return (
    <div className="mt-10">
        {isEmpty 
        ? <p className="text-gray-400 text-2xl font-bold">No hay gastos</p> 
        : (
            <>
                <p className="text-gray-600 text-2xl font-bold my-5">Listado de gastos.</p>
                {state.expenses.map( expense => (
                    <ExpenseDetail
                        key={expense.id}
                        expense={expense}
                    />
                ))}
            </>
        )}
    </div>
  )
}
