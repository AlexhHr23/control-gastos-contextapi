import { useReducer, createContext, ActionDispatch, ReactNode  } from "react"
import { budgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: ActionDispatch<[action: budgetActions]>
}

type BudgetProviderProps = {
    children: ReactNode
}


export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider =  ({children}: BudgetProviderProps) =>{


    const [state, dispatch] = useReducer(budgetReducer, initialState)
 
    return (
        <BudgetContext.Provider 
        value={{
            state, dispatch
        }}>
            {children}
        </BudgetContext.Provider>
    )
}