export const errorhandler = (statuscode,message) =>{
    const err = new Error();
    err.statuscode = statuscode;
    err.message = message;
    return err;
};