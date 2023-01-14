import { EntryInputDTO, NonvegEntryDTO } from 'dto';
import { Request, Response } from 'express';
import { Entry, NonVeg } from '../models';

// Create entry
export const createEntry = async (req: Request, res: Response) => {
    try {
        const data: EntryInputDTO = req.body;
        const entry = new Entry({
            ...data,
            date: new Date().toLocaleDateString('en-GB'),
            time: new Date().toLocaleTimeString(),
        });
        console.log(entry.date);
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
        const date = new Date().toLocaleDateString('en-GB');
        console.log(date);
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
        const entries = await Entry.find({ sid: id }).sort({
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

// Want non-veg on Friday
export const nonvegEntry = async (req: Request, res: Response) => {
    try {
        const data: NonvegEntryDTO = req.body;
        const entry = new NonVeg(data);

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

// Number of non-veg entries of a student
export const studentNonvegEntries = async (req: Request, res: Response) => {
    try {
        const sid = req.params.sid;
        const entries = await NonVeg.find({ sid });

        return res.status(200).json(entries);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};
