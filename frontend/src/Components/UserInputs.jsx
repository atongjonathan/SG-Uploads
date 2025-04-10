import { Field, Label, Input as HInput } from "@headlessui/react"
import { useState } from "react"

export const Message = ({ label, placeholder }) => {
    return (
        <div className="text-sm w-full">
            <label className="text-border font-semibold">{label}</label>
            <textarea className="w-full h-40 mt-2 p-6 bg-main border border-border rounded" placeholder={placeholder}></textarea></div>
    )
}

export const Select = ({ label, options, onChange }) => {
    return (
        <>
            <label className="text-border font-semibold">{label}</label>
            <select className="w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded" name="" id="" onChange={onChange}>
                {options.map((option, idx) => (<option key={idx} value={option.value}>
                    {option.title}
                </option>)
                )}
            </select></>

    )
}
export const Input = ({ label, name, placeholder, type, bg, error = null, regex = null, required = true, initialValue }) => {

    const [value, setValue] = useState(initialValue);

    return (
        <Field className="text-sm w-full">
            <Label className="text-border font-semibold" htmlFor={label}>{label}</Label>
            <HInput pattern={regex} id={label} name={name} type={type} placeholder={placeholder} className={`w-full text-sm mt-2 p-2 border border-border rounded text-white  focus:border-b-subMain focus: bg-${bg ? 'main' : 'dry'}`} required={required} value={value} onInput={(e) => {
                let input = e.target
                setValue(input.value)
            }} />
            {
                error && <div className="text-oldMain w-full mt-2 text-xs font-medium">
                    <p>Error</p>
                </div>
            }

        </Field>
    )
}