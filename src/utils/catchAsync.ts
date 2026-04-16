// Utility function to catch errors in async functions and pass them to the next middleware
const catchAsync = (fn: Function) => {
  return (req: any, res: any, next: any) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
