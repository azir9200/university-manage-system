import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import { ZodError, ZodIssue } from "zod";
import config from "../../config";
import handleValidationError from "../errors/handleValidationError";
import handleZodError from "../errors/handleZodError";


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next,) => {
    let  statusCode = err.statusCode ||  500;
    let message = err.message || 'Hey Azir, Something going wrong here !';

    let errorSources: TErrorSources = [{
        path: "",
        message: "Something going wrong here collana!",
    }];

    if(err instanceof ZodError){
        const simplifiedError = handleZodError(err);
        statusCode: simplifiedError?.statusCode;
        message: simplifiedError?.message;
        errorSources: simplifiedError?.errorSources;
    }else if(err.name === 'ValidationError'){
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError?.statusCode;
        message: simplifiedError.message;
        errorSources: simplifiedError?.errorSources;
    }

return res.status(statusCode).json({
    success:false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,       
})
};
export default globalErrorHandler;

