import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Setting } from '../models';

export const getMenu = async (_: Request, res: Response) => {
    console.log(process.env.SETTING_ID);
    try {
        const data = await Setting.findOne({
            _id: new ObjectId(process.env.SETTING_ID),
        });
        // const data = await Setting.findById(process.env.SETTING_ID)
        console.log(data);
        return res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Erro',
        });
    }
};
