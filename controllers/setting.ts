import { settingRoutes } from 'api'
import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { Setting } from '../models'

export const getMenu = async (_: Request, res: Response) => {
    try {
        const data = await Setting.findOne({ _id: new ObjectId(process.env.SETTING_ID) })
        const menu = data?.menu
        return res.json(menu)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateMenu = async (req: Request, res: Response) => {
    try {
        const newMenu = req.body
        // console.log(newPrices);
        const data = await Setting.findOne({ _id: new ObjectId(process.env.SETTING_ID) })
        // console.log(data);
        const newSettings = new Setting({
            _id: data?._id,
            menu: newMenu,
            price: data?.price,
            semCycle: data?.semCycle,
            // price: newPrices
        })
        Setting.updateOne({ _id: new ObjectId(process.env.SETTING_ID) }, newSettings).then(
            () => {
                res.status(201).json({
                    message: 'Menu updated successfully!'
                });
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
        // console.log(newSettings);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })

    }
}

export const getPrices = async (_: Request, res: Response) => {
    try {
        const data = await Setting.findOne({ _id: new ObjectId(process.env.SETTING_ID) })
        console.log(data);
        const prices = data?.price
        return res.json(prices)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updatePrices = async (req: Request, res: Response) => {
    try {
        const newPrices = req.body
        // console.log(newPrices);
        const data = await Setting.findOne({ _id: new ObjectId(process.env.SETTING_ID) })
        // console.log(data);
        const newSettings = new Setting({
            price: newPrices,
            _id: data?._id,
            menu: data?.menu,
            semCycle: data?.semCycle,
            // price: newPrices
        })
        Setting.updateOne({ _id: new ObjectId(process.env.SETTING_ID) }, newSettings).then(
            () => {
                res.status(201).json({
                    message: 'price updated successfully!'
                });
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
        // console.log(newSettings);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })

    }
}

export const getSemCycle = async (_: Request, res: Response) => {
    try {
        const data = await Setting.findOne({ _id: new ObjectId(process.env.SETTING_ID) })
        const semCycle = data?.semCycle
        return res.json(semCycle)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}



export const updateSemCycle = async (req: Request, res: Response) => {
    try {
        const newSemCycle = req.body
        // console.log(newPrices);
        const data = await Setting.findOne({ _id: new ObjectId(process.env.SETTING_ID) })
        // console.log(data);
        const newSettings = new Setting({
            _id: data?._id,
            menu: data?.menu,
            price: data?.price,
            semCycle: newSemCycle,
            // price: newPrices
        })
        Setting.updateOne({ _id: new ObjectId(process.env.SETTING_ID) }, newSettings).then(
            () => {
                res.status(201).json({
                    message: 'Semcycle updated successfully!'
                });
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
        // console.log(newSettings);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })

    }
}
