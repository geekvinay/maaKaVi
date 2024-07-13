import { Request, Response } from 'express';
import { createUserInDb, getUserFromDb } from '../../repository/user/user';

export const healthcheck = (req: Request, res: Response) => {
  res.send('OK');
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserInDb(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await getUserFromDb(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};