import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import { ResponseStructure } from "../types/response";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = await User.create(req.body);
    const response = new ResponseStructure(true, user);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json(new ResponseStructure(true,users));
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser | null = await User.findOne({ username:req.params.username}).populate({
        path:"posts",
        populate:{
            path:"author",
            select: "username"
        }
    });
    if(!user){
        throw new Error("Can't find user");
    }
    res.status(200).json(new ResponseStructure(true,user));
  } catch (error) {
    next(error);
  }
};

// Optionally, add DELETE and EDIT functions
