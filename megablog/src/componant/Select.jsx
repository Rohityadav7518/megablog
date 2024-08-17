import React, { useId } from "react"


function Select({
    option, label, className = "", ...props
}, ref) {
    const id = useId()


    return (
        <div className="w-full ">

            {label && <label htmlFor={id} className="" >  </label>}
            <select {...props} ref={ref} id={id} className={`py-3 px-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}   >  {option?.map((option) => (<option key={option} value={option}>  {option}  </option>))}  </select>
        </div>
    )
}

export default React.forwardRef(Select) 