import { ZodError } from "zod";

export function setValidationErrorsForForm(err: ZodError, setValidationErrors: ) {
    let fieldErrors = err.flatten().fieldErrors;
    let fields: string[] = Object.keys(fieldErrors);
    let errors = {}
    console.log(fields);
    fields.forEach((element: String) => {
        console.log(element);
        console.log(fieldErrors[element]);
        errors[element] = fieldErrors[element].length > 0 ? fieldErrors[element][0] : ''
    });
    console.log(errors);
    setValidationErrors(errors);
}