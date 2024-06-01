const catchAsync = fn => (req, res, next) => {
    // eslint-disable-next-line promise/no-callback-in-promise
    Promise.resolve(fn(req, res, next)).catch(err => next(err));
  };
  
  module.exports = catchAsync;
  