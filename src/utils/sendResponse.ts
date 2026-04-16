// custom response
import httpStatus from "http-status";
import { ApiResponse } from "../types/common.types";
const sendResponse = (res: any, data: ApiResponse) => {
  res.status(data.status ?? httpStatus.OK).json({
    success: data.success ?? true,
    meta: data.meta ?? null,
    statusCode: data.status ?? httpStatus.OK,
    message: data.message ?? null,
    data: data.data ?? null,
  });
};
export default sendResponse;
