import {v4 as uuidv4} from 'uuid'
import { DrafExpense, Expense } from "../types"


export type budgetActions = 
{type: 'add-budget', payload: {budget: number}} |
{type: 'show-modal'} |
{type: 'close-modal'} |
{type: 'add-expense', payload: {expense: DrafExpense}} |
{type: 'remove-expense', payload: {id: Expense['id']}} |
{type: 'get-expense-by-id', paylaod: {id: Expense['id']}} |
{type: 'update-expense', payload: {expense: Expense}} |
{type: 'reset-app'}

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editingId: Expense['id']
}


const createExpense = (drafExpense: DrafExpense) : Expense => {
    return {
        ...drafExpense,
        id: uuidv4()
    }
}

const initalBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState: BudgetState = {
    budget: initalBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: ''
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
            modal: false,
            editingId: ''
        }
    }

    if(action.type === 'add-expense') {

        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    if(action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }

    if(action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.paylaod.id,
            modal: true
        }
    }

    if(action.type === 'update-expense') {
        return  {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id 
                ? action.payload.expense 
                : expense) ,
            modal: false,
            editingId: ''
        }
    }

    if(action.type === 'reset-app' ) {
        return {
            ...state,
            budget: 0,
            expenses: []
        }
    }

    return state

}