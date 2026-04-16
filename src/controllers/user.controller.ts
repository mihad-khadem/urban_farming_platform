// user controller

import { Request, Response } from "express";
import { userService } from "../services/user.service";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUserIntoDB(req.body);
  sendResponse(res, {
    status: 201,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.getAllUsersFromDB();
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Users retrieved successfully",
    data: users,
  });
});
// get user by id
const getUserById = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUserByIdfromDB(req.params.id as string);
  if (!user) {
    return sendResponse(res, {
      status: 404,
      success: false,
      message: "User not found",
    });
  }
  sendResponse(res, {
    status: 200,
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});
// find user by email
const findUserByEmail = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.findUserByEmailFromDB(req.body.email);
  if (!user) {
    return sendResponse(res, {
      status: 404,
      success: false,
      message: "User not found",
    });
  }
  sendResponse(res, {
    status: 200,
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});
// update user
// const updateUser = catchAsync(async (req: Request, res: Response) => {
//   const user = await userService.updateUserInDB(req.params.id, req.body);
//   if (!user) {
//     return sendResponse(res, {
//       status: 404,
//       success: false,
//       message: "User not found",
//     });
//   }
//   sendResponse(res, {
//     status: 200,
//     success: true,
//     message: "User updated successfully",
//     data: user,
//   });
// });
// delete user
// const deleteUser = catchAsync(async (req: Request, res: Response) => {
//   const user = await userService.deleteUserFromDB(req.params.id);
//   if (!user) {
//     return sendResponse(res, {
//       status: 404,
//       success: false,
//       message: "User not found",
//     });
//   }
//   sendResponse(res, {
//     status: 200,
//     success: true,
//     message: "User deleted successfully",
//     data: user,
//   });
// });

export const userController = {
  createUser,
  getAllUsers,
  getUserById,
  findUserByEmail,
};
