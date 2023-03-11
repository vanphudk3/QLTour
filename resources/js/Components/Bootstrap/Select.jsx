import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function Select({ children, className, id, name, value, autoComplete, required, isFocused, handleChange }, ref
    ){

        const input = ref ? ref : useRef();

        useEffect(() => {
            if (isFocused) {
                input.current.focus();
            }
        }, []);

    return (
        <div>
            <select 
            name={name}
            id={id}
            value={value}
            ref={input}
            autoComplete={autoComplete}
            required={required}
            className={
                `form-select ` +
                className
            } 
            aria-label="Default select example"
            onChange={(e) => handleChange(e)}
            >
                {children}
            </select>
        </div>
    );
});