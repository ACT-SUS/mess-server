import { EntryInputDTO } from 'dto';
import { Request, Response } from 'express';
import { Entry } from '../models';

// Create entry
export const createEntry = async (req: Request, res: Response) => {
    try {
        const data: EntryInputDTO = req.body;
        const entry = new Entry({
            ...data,
            date: new Date().toLocaleDateString('en-GB'),
            time: new Date().toLocaleTimeString(),
        });
        await entry.save();

        return res.status(201).json({
            entry,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Get today's entries
export const entriesToday = async (_req: Request, res: Response) => {
    try {
        const date = new Date().toLocaleDateString();
        const entries = await Entry.find({ date });

        return res.status(200).json({
            entries,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Get entries of a student
export const studentEntries = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const entries = await Entry.find({ id }).sort({
            date: 'desc',
            time: 'desc',
        });

        return res.status(200).json({
            entries,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};
