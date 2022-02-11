// Custom error generating function which is quite simple now but adds for
// much flexibility in the future to transmit necessary error messages
// all error calls should go through this function which passes a tailored
// error object for the final error handler
module.exports = function customException(status, message, data) {
    const error = new Error(message);
    error.metadata = data;
    error.status = status;
    return error;
};
