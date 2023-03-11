import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function InputSearchDate(
    {
        name,
        id,
        value,
        autoComplete,
        required,
        isFocused,
        handleChange,
    },
    ref
) {

    
    const today = new Date().toISOString().split("T")[0];
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);
    return (
        <input
            type="date"
            id={id}
            name={name}
            placeholder="(Date)"
            min={today}
            value={value}
            autoComplete={autoComplete}
            onChange={(e) => handleChange(e)}
        />
    );
});
