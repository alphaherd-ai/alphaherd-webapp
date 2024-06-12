import { SetStateAction } from "react";
import { ZodError } from "zod";

export function setValidationErrorsForForm(err: ZodError, setValidationErrors : any,step : any, stepFields : any) {
    let fieldErrors = err.flatten().fieldErrors;
    console.log(fieldErrors);
    let fields: string[] = Object.keys(fieldErrors);
    let errors = {}
    console.log(fields);
    let foundError=false;
    stepFields[step].forEach((element: String) => {
        console.log(element);
        // console.log(fieldErrors[element]);
        if(element in fieldErrors){
            errors[element] = fieldErrors[element].length > 0 ? fieldErrors[element][0] : '';
            foundError=true;
        }
        else errors[element]='';
    });
    console.log(errors);
    // fields.forEach((element: String) => {
    //     console.log(element);
    //     console.log(fieldErrors[element]);
    //     errors[element] = fieldErrors[element].length > 0 ? fieldErrors[element][0] : ''
    // });
    console.log(errors);
    setValidationErrors(errors);
    return foundError;
}

export function setValidationErrorsForField(){

}