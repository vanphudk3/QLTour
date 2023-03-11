import { forwardRef, useEffect, useRef } from 'react';

export default  forwardRef(function Textarea({
    name, id, value, className, placeholder, autoComplete, required, isFocused, handleChange
}, ref) {
    const textarea = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            textarea.current.focus();
        }
    }, []);


    return (
        <div>
            <textarea 
            name={name}
            id={id}
            value={value}
            className={
                `form-control ` +
                className
            }
            ref={textarea}
            autoComplete={autoComplete}
            required={required}
            placeholder={placeholder}
            style={{height: "100px"}}
            onChange={(e) => handleChange(e)}
            >
            </textarea>
        </div>
        );
});