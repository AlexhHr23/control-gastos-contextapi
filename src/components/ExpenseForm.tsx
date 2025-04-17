import { useState, ChangeEvent, useEffect } from "react";
import type { DrafExpense, Value } from "../types";
import { Select } from "@headlessui/react"
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hook/useBudget";



export const ExpenseForm = () => {

    const [expense, setExpense] = useState<DrafExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')
    const {dispatch, state} = useBudget()

    const hadleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })
    }

    useEffect(() => {
        if(state.editingId) {
            const editingExpense = state.expenses.filter(currenteExpense => currenteExpense.id === state.editingId)[0]
            setExpense(editingExpense)
        }
    }, [state.editingId])


    const hadleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //Validar
        if(Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }

        // Acción: agregar un nuevo gasto o actualiza
        if(state.editingId) {
            dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
        }else {
            dispatch({type: 'add-expense', payload: {expense}})
        }
       


        //Reiniciar el state
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })

    }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
            Nuevo gasto
        </legend>

        {error && (
            <ErrorMessage>
                {error}
            </ErrorMessage>
        )}

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
                Nombre Gasto:
            </label>
            <input 
                type="text" 
                id="expenseName"
                placeholder="Añade el nombre del gasto"
                className="bg-slate-100 p-2"
                name="expenseName"
                value={expense.expenseName}
                onChange={hadleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
                Cantidad:
            </label>
            <input 
                type="number" 
                id="amount"
                placeholder="Añade la cantidad del gasto: ej. 300"
                className="bg-slate-100 p-2"
                name="amount"
                value={expense.amount}
                onChange={hadleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
                Categoria:
            </label>
            <Select 
                id="category"
                aria-placeholder="Añade"
                className="bg-slate-100 p-2"
                name="category"
                value={expense.category}
                onChange={hadleChange}
            >
                <option value="">--- Seleccione ---</option>
                {categories.map(category => (
                    <option 
                    key={category.id}
                    value={category.id}>
                        {category.name}
                    </option>
                ))}
            </Select>
        </div>


        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
                Fecha gasto:
            </label>
           <DatePicker 
            className="bg-slate-100 p-2 border-0"
            value={expense.date}
            onChange={hadleChangeDate}
           />
        </div>


        <input
            type="submit"
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase
            font-bold rounded-lg"
            value={'Registrar gasto'}
        />

    </form>
  )
}
