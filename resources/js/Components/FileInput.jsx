import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function FileInput(
    { type = 'text', name, id, value, multiple, className, autoComplete, required, isFocused, handleChange },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="">
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                multiple={multiple}
                className={
                    `form-control ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
});
