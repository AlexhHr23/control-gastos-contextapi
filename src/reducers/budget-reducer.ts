import {v4 as uuidv4} from 'uuid'
import { DrafExpense, Expense } from "../types"


export type budgetActions = 
{type: 'add-budget', payload: {budget: number}} |
{type: 'show-modal'} |
{type: 'close-modal'} |
{type: 'add-expense', payload: {expense: DrafExpense}}

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[]
}

const createExpense = (drafExpense: DrafExpense) : Expense => {
    return {
        ...drafExpense,
        id: uuidv4()
    }
}

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    expenses: []
}


export const budgetReducer = (
    state: BudgetState = initialState,
    action: budgetActions
) => {

    if(action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if(action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    if(action.type === 'close-modal') {
        return {
            ...state,
            modal: false
        }
    }

    if(action.type === 'add-expense') {

        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            expenses: [...state.expenses, expense]
        }
    }

    return state

}