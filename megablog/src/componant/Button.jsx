import React from 'react'

export default function Button({
    children,
    type = "button",
    bgColor = "bg-grey-500 ",
    textColor = " text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-3 bg-blue-200 ${textColor} ${type}  ${children} `}  {...props} >
            {children}
        </button >
    )
}

