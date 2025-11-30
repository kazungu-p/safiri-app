import React from "react";
import Input from "./Input";

function ReusableForm({title, fields, buttonText, onSubmit}){
    return(
        <form action={onSubmit}>
            <h2>{title}</h2>
        {fields.map((field)=>(
            <div className="form-group" key={field.name}>
                <label>{field.label}</label>
                <Input 
                    rows={field.rows || 5}
                    required={field.required}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}                
                />
            </div>
        ))}

            <button type="submit">{buttonText}</button>
        </form>
    )
}

export default ReusableForm;