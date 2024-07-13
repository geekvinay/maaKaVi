import { Request, Response } from 'express';

export function healthcheck(req: Request, res: Response) {
    res.json('Hello World!!! from users')
}