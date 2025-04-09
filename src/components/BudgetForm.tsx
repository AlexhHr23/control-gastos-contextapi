import { useState, ChangeEvent } from "react"

export const BudgetForm = () => {

    const [budget, useBudget] = useState(0)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name);
        console.log(e.target.id);
    }
    return (
        <form className="space-y-5">
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                    Definir presupuesto
                </label>
                <input
                    id="budgetID"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                value="Definir presupeusto"
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase"
            />
        </form>
    )
}
