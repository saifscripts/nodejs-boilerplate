import { Request, Response } from 'express';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const result = await userServices.createUserIntoDB(user);

    res.status(200).json({
      success: true,
      message: 'User is created successfully.',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something Went Wrong',
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userServices.getSingleUserFromDB(id);

    res.status(200).json({
      success: true,
      message: 'User is retrieved successfully.',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong.',
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users are retrieved successfully.',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong.',
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userServices.deleteUserFromDB(id);

    res.status(200).json({
      success: true,
      message: 'User is deleted successfully.',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong.',
    });
  }
};

export const userControllers = {
  createUser,
  getSingleUser,
  getAllUsers,
  deleteUser,
};
