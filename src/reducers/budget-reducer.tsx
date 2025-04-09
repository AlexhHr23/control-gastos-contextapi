



export type budgetActions = 
{type: 'add-budget', payload: {budget: number}}

export type BudgetState = {
    budget: number,
}



export const initialState: BudgetState = {
    budget: 0
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

    return state

}