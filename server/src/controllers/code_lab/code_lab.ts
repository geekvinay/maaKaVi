import { Request, Response } from 'express';
import { createCodelabInDb, getCodelabFromDb, updateCodelabInDb } from '../../repository/code_lab/code_lab';

export const createCodelab = async (req: Request, res: Response) => {
    try {
        const codelab = await createCodelabInDb(req.body);
        res.status(201).json(codelab);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getCodelab = async (req: Request, res: Response) => {
    try {
        const codelabId = req.params.codelabId;
        const codelab = await getCodelabFromDb(codelabId);
        if (codelab) {
            res.json(codelab);
        } else {
            res.status(404).json({ error: 'Codelab not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCodelab = async (req: Request, res: Response) => {
    try {
        const codelabId = req.params.codelabId;
        const codelab = await updateCodelabInDb(codelabId, req.body);
        res.json(codelab);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};