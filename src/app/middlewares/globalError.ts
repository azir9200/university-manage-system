import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import { ZodError, ZodIssue } from "zod";
import config from "../../config";
import handleValidationError from "../errors/handleValidationError";
import handleZodError from "../errors/handleZodError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/App.Error";


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
    }else if(err.name === 'CastError'){
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }else if(err?.code === 11000){
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError?.statusCode;
        message: simplifiedError.message;
        errorSources: simplifiedError.errorSources;
    }else if(err instanceof AppError){
        statusCode = err?.statusCode;
        message = err.message;
        errorSources = [
            {
                path: '',
            message: err?.message,           
           }
        ]
    }else if(err instanceof Error){
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    };
 
return res.status(statusCode).json({
    success:false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,       
})
};
export default globalErrorHandler;

