import { useMemo, useState } from "react";

interface FormData {
  bill: string;
  people: string;
  tipPercent: number;
  customTip: string;
}

interface Errors {
  bill?: string;
  people?: string;
}

export default function Tip() {
  const [formData, setFormData] = useState<FormData>({
    bill: '',
    people: '',
    tipPercent: 0,
    customTip: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const tipBtns = [10, 15, 20];

  function validate(name: string, value: number) {
    let error = "";

    if (!value || value <= 0) {
        error = "Field cannot be empty";
    }

    if (value < 0) {
        error = "Negative values are not allowed";
    }

    if (name === "people" && !Number.isInteger(value)) {
        error = "Must be a whole number";
    }

    setErrors((prev) => ({
        ...prev,
        [name]: error,
    }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (value === "") {
      setFormData((prev) => ({
        ...prev,
        [name]: "",
      }));

      return;
    }

    const parsedValue = Number(value);

    if (!Number.isFinite(parsedValue)) return;

    if (parsedValue < 0) return;

    if (parsedValue > 1_000_000_000) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Value is too large",
      }));
      return;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (name === "customTip") {
      setFormData((prev) => ({
        ...prev,
        customTip: value,
        tipPercent: 0,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validate(name, parsedValue);
  }

  function handleBlur( e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validate(name, Number(value));

  }

  function handleTipClick(value: number) {
    setFormData((prev) => ({
      ...prev,
      tipPercent: value,
      customTip: "",
    }));
  }

  function handleReset() {
    setFormData({
      bill: '',
      people: '',
      tipPercent: 0,
      customTip: "",
    });

    setErrors({});
    setTouched({});
  }

  const bill = Number(formData.bill) || 0;
  const people = Number(formData.people) || 0;
  const customTip = Number(formData.customTip) || 0;

  const finalTipPercent = useMemo(() => {
    return formData.customTip
      ? customTip
      : formData.tipPercent;
  }, [customTip, formData.customTip, formData.tipPercent]);

  const tipAmount = useMemo(() => {
    return (finalTipPercent / 100) * bill;
  }, [finalTipPercent, bill]);

  const total = useMemo(() => {
    return bill + tipAmount;
  }, [bill, tipAmount]);

  const perPerson = useMemo(() => {if (!people) return 0;
    return total / people;
  }, [total, people]);

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="p-4 pb-6 my-6 flex flex-col bg-white justify-center w-10/12 md:w-2/3 backdrop-blur-md  border border-purple-900/20 rounded-2xl shadow-slate-500 shadow-lg max-w-3xl">

        <h1 className="text-center font-bold text-[#6c20df] text-2xl mb-4">
          Tip Calculator
        </h1>

        <div className="flex md:flex-row flex-col gap-4">

          <div className="md:w-1/2 w-full border px-3 py-5 border-purple-400 rounded-lg">

            <div className="flex flex-col mb-6">
                <label>Bill</label>

                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>

                    <input
                    type="number"
                    name="bill"
                    value={formData.bill}
                    onChange={handleChange}
                    max="1000000000"
                    onBlur={handleBlur}
                    className="w-full pl-8 pr-4 py-2 outline-[#6c20df] border rounded-lg border-[#6c20df]"
                    />
                </div>
            {touched.bill && errors.bill && (<p className="text-xs text-red-500 mt-1">{errors.bill} </p>)}
        </div>

            <div className="mb-6">
              <label>Tip Percentage</label>

              <div className="mt-2 flex gap-3 w-full">

                {tipBtns.map((btn) => (
                  <button
                    key={btn}
                    onClick={() => handleTipClick(btn)}
                    className={`flex-1 min-w-0 py-2 rounded-lg cursor-pointer border border-purple-400 ${
                      formData.tipPercent === btn
                        ? "bg-[#6c20df] text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {btn}%
                  </button>
                ))}

                <input
                  type="number"
                  name="customTip"
                  value={formData.customTip}
                  max="1000000"
                  onChange={handleChange}
                  placeholder="Custom"
                  className="flex-1 min-w-0 border text-center border-purple-400 outline-[#6c20df] rounded-lg py-2"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label>Number of People</label>

              <input
                type="number"
                name="people"
                value={formData.people}
                onChange={handleChange}
                onBlur={handleBlur}
                className="outline-[#6c20df] px-4 py-2 border border-purple-400 rounded-lg"
              />

              {touched.people && errors.people && (
                <p className="text-xs text-red-500">
                  {errors.people}
                </p>
              )}
            </div>
          </div>

          <div className="border-purple-400 px-3 py-5 rounded-lg md:w-1/2 border">

            <p className="text-center text-[#6c20df] mb-4 font-bold text-lg">
              Your Results
            </p>

            <div className="flex mb-6 justify-between border border-purple-400 rounded-lg items-center px-4 py-4">
              <p className="font-bold">Tip</p>
              <p className="font-bold">
                ${tipAmount.toFixed(2)}
              </p>
            </div>

            <div className="flex mb-6 justify-between border border-purple-400 rounded-lg px-4 py-4">
              <p className="font-bold">Total</p>
              <p className="font-bold">
                ${total.toFixed(2)}
              </p>
            </div>

            <div className="flex justify-between border border-purple-400 rounded-lg px-4 py-4">
              <p className="font-bold">
                Amount Per Person
              </p>

              <p className="font-bold">
                ${perPerson.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <button
          className="px-4 py-2 rounded-lg mt-4 mx-auto cursor-pointer bg-purple-700 font-bold text-white w-20"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </section>
  );
}