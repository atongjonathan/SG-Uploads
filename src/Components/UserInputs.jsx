export const Message = ({ label, placeholder }) => {
    return (
        <div class="text-sm w-full">
            <label class="text-border font-semibold">{label}</label>
            <textarea class="w-full h-40 mt-2 p-6 bg-main border border-border rounded" placeholder={placeholder}></textarea></div>
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
export const Input = ({ label, placeholder, type, bg }) => {
    return (
        <div className="text-sm w-full">
            <label className="text-border font-semibold" htmlFor={label}>{label}</label>
            <input id={label} type={type} placeholder={placeholder} className={`w-full text-sm mt-2 p-5 border border-border rounded text-white bg-${bg ? 'main' : 'dry'}`} required />
        </div>
    )
}