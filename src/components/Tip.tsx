import { useState } from "react"

interface TipInterface{
    bill: number 
    people: number 
    tipPercent: number
}




export default function Tip(){

    const [userInput, setUserInput] = useState<TipInterface>({
        bill: 0,
        people: 0,
        tipPercent: 0
    });

    const [tipPercent, setTipPercent] = useState<number>(0);
    const [customTip, setCustomTip] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({
        bill: '',
        people: ''
    });
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({
        bill: false,
        people: false
    });


    const validate = (name: string, value: any) => {
        let errorMsg = '';
        if (value==='' || value===0) {
            errorMsg = 'Field cannot be empty';
        } 
        else if (isNaN(value) || Number(value) < 0 || !Number.isInteger(Number(value))) {
            errorMsg = 'Please enter a valid number';
        } 
       
        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    function handleUserInput(e: React.ChangeEvent<HTMLInputElement| HTMLButtonElement>){
        const { name, value } = e.target;
        setUserInput((prev)=>({
            ...prev,
            [name] : value
        }));
        validate(name, value)
    }

    function handleReset(){
        setCustomTip('')
        setErrors({})
        setTipPercent(0)
        setUserInput({bill:0, people:0, tipPercent: 0})
    }

    const tipBtns = [10, 15, 20]

    const finalTipPercent = customTip ? Number(customTip) : tipPercent || 0;
    let amount = (finalTipPercent/100) * userInput.bill;
    let total = Number(amount) + Number(userInput.bill);
    let person = userInput.people ? Math.ceil(total/userInput.people) : 0


    return(
        <section className="flex justify-center items-center  h-screen">
            <div className="p-4 pb-6  flex flex-col justify-center w-4/5 md:w-2/3 bg-white/10 backdrop-blur-md border border-blue-900/20 rounded-2xl shadow-xl max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-center font-bold">Tip Calculator</h1>
                    <p className="text-center">Enter your details</p>
                </div>
                <div className="flex md:flex-row flex-col gap-4">
                    <div className="md:w-1/2 w-full border px-3 py-5 border-green-400 rounded-lg">
                        <div className="flex flex-col mb-6">
                            <label htmlFor="">Bill</label>
                            <input className="px-4 py-2 outline-0 border rounded-lg border-blue-500" 
                                name="bill" 
                                value={userInput.bill} 
                                onChange={handleUserInput}
                                onBlur={handleBlur}
                            />
                            {touched.bill && errors.bill && (<p className="text-xs text-red-500">{errors.bill}</p>)}
                        </div>
                        <div className="mb-6 w-full">
                            <label>Tip Percentage</label>

                            <div className="mt-2 flex gap-3 w-full flex-nowrap">
                                {tipBtns.map((btn) => (
                                <button
                                    key={btn}
                                    onClick={() => setTipPercent(btn)}
                                    className={`flex-1 py-2 cursor-pointer text-center rounded-lg border transition ${
                                    tipPercent === btn
                                        ? "bg-purple-600 text-white"
                                        : "bg-white text-black"
                                    }`}
                                >
                                    {btn}%
                                </button>
                                ))}

                                <input
                                    type="number"
                                    value={customTip}
                                    onChange={(e) => setCustomTip(e.target.value)}
                                    className="flex-1 border text-center rounded-lg py-2 min-w-0"
                                    placeholder="Custom"
                                />
                            </div>

                            <p className="text-xs mt-1">
                                Select a preset or enter a custom tip %
                            </p>
                            </div>
                        <div className="flex flex-col gap-2">
                            <label>Number of People</label>
                            <input 
                                className="outline-0 px-4 py-2 border border-blue-400 rounded-lg"
                                name="people" 
                                value={userInput.people} 
                                onChange={handleUserInput}
                            />
                            {errors.people && <p className="text-xs text-red-500">{errors.people}</p>}

                        </div>
                    </div>

                    <div className="border-green-400 px-3 flex-col gap-8 py-5 rounded-lg md:w-1/2 border">
                        <p className="text-center mb-4 font-bold text-lg">Your Results</p>

                        <div className="flex mb-6 justify-between border border-blue-400 rounded-lg items-center px-4 py-4 flex-row">
                            <p className="font-bold">Tip</p>
                            <p className="font-bold">$ {amount.toFixed(2)}</p>
                        </div>

                        <div className="flex  mb-6 justify-between border border-blue-400 rounded-lg px-4 py-4">
                            <p className="font-bold">Total (bill+tip)</p>
                            <p className="font-bold">$ {total}</p>
                        </div>

                        <div className="flex justify-between border border-blue-400 rounded-lg px-4 py-4">
                            <p className="font-bold ">Amount Per Person</p>
                            <p className="font-bold ">$ {person}</p>
                        </div>
                    </div>

                </div>
                    <button className="px-4 py-2 rounded-lg mt-4 mx-auto cursor-pointer bg-blue-700 font-bold text-white w-20" onClick={handleReset}>Reset</button>
            </div>
        </section>
    )
}