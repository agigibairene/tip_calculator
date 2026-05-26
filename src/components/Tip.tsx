import { useState } from "react"

interface TipInterface{
    bill: number 
    people: number 
}




export default function Tip(){

    const [userInput, setUserInput] = useState<TipInterface>({
        bill: 0,
        people: 0,
    });

    const [tipPercent, setTipPercent] = useState<number>(0)

    function handleUserInput(e: React.ChangeEvent<HTMLInputElement| HTMLButtonElement>){
        const { name, value } = e.target;
        setUserInput((prev)=>({
            ...prev,
            [name] : value
        }))
    }

    const tipBtns = [10, 15, 20]

    let amount = (tipPercent/100) * userInput.bill;
    let total = Number(amount) + Number(userInput.bill);
    let person = Math.ceil(total/userInput.people)


    return(
        <section className="flex justify-center items-center  h-screen">
            <div className="p-4  flex flex-col justify-center w-2/3 bg-white/10 backdrop-blur-md border border-blue-900/20 rounded-2xl shadow-xl max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-center font-bold">Tip Calculator</h1>
                    <p className="text-center">Enter your details</p>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="w-1/2 border px-3 py-5 border-green-400 rounded-lg">
                        <div className="flex flex-col mb-6">
                            <label htmlFor="">Bill</label>
                            <input className="px-4 py-2 outline-0 border rounded-lg border-blue-500" 
                                name="bill" 
                                value={userInput.bill} 
                                onChange={handleUserInput}
                            />
                        </div>
                        <div className="mb-6 w-full">
                            <label>Tip Percentage</label>
                            <div className="mt-2 w-full mb-1">
                                {
                                   tipBtns.map((btn)=>(
                                    <button
                                        key={btn}
                                        onClick={() => setTipPercent(btn)}
                                        className={`px-5 mr-4 py-2 text-center rounded-lg border transition ${
                                        tipPercent === btn
                                        ? "bg-purple-600 text-white"
                                        : "bg-white text-black"
                                    }`}
                                    >
                                    {btn}%
                                    </button>
                                   ))
                                }
                                <input
                                    type="number"
                                    value={tipPercent}
                                    onChange={(e) => setTipPercent(Number(e.target.value))}
                                    className="border w-7 text-center rounded-lg px-5 py-2"
                                />
                            <p className="text-xs">Select a preset or enter a custom tip %</p>
                            </div>
                            
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Number of People</label>
                            <input 
                                className="outline-0 px-4 py-2 border border-blue-400 rounded-lg"
                                name="people" 
                                value={userInput.people} 
                                onChange={handleUserInput}
                            />
                        </div>
                    </div>

                    <div className="border-green-400 px-3 flex-col gap-8 py-5 rounded-lg w-1/2 border">
                        <p className="text-center mb-4">Your Results</p>

                        <div className="flex mb-6 justify-between border border-blue-400 rounded-lg items-center px-4 py-4 flex-row">
                            <p>Tip</p>
                            <p>$ {amount}</p>
                        </div>

                        <div className="flex  mb-6 justify-between border border-blue-400 rounded-lg px-4 py-4">
                            <p>Total (bill+tip)</p>
                            <p>$ {total}</p>
                        </div>

                        <div className="flex justify-between border border-blue-400 rounded-lg px-4 py-4">
                            <p>Amount Per Person</p>
                            <p>$ {person}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}