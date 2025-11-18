import React from "react";
import Input from "./Input";

function Form({fields, buttonText, onSubmit}){
    return (
        <form onSubmit={onSubmit}>
            {fields.map((field, index) =>(
               <Input
                key ={index}
                type ={field.type}
                placeholder ={field.placeholder}
               /> 
            ))}

            <button type="submit">{buttonText}</button>
        </form>
    
    )
}

export default Form;