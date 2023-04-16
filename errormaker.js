module.exports.customError = (status, msg) => {
    const err = new Error();
    err.status = status ? status : 502
    err.message = msg ? msg : 'Server Having Issues'
    return err;
}