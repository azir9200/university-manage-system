import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse =>{
    
    const match = err.message.match(/"([^"]*)"/);

    
  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
        path: '',
        message: `${extractedMessage} is already exist !`
    }
  ]

    const statusCode = 400;

    return {
      statusCode,
      message: 'Invalid ID',
      errorSources,
    };
  };
  
  export default handleDuplicateError;