import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/error";
import path from "path";

const handleCastError = (
    err: mongoose.Error.CastError,
): TGenericErrorResponse =>{
    const errorSources = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    const statusCode = 400;
    return{
        statusCode,
        message: 'Invalide ID',
        errorSources,
    };
};

export default handleCastError;