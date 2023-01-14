import { Request, Response } from 'express';
import fs from 'fs';
import { ObjectId } from 'mongodb'
import { StudentLoginDTO, StudentRegisterDTO } from '../dto';
import { Entry, Setting, Student } from '../models';
import { s3 } from '../utils';

// Register student
export const register = async (req: Request, res: Response) => {
    try {
        const data: StudentRegisterDTO = req.body;
        const student = new Student(data);
        await student.save();

        console.log(student);
        return res.status(201).json({
            student,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Login student
export const login = async (req: Request, res: Response) => {
    try {
        const data: StudentLoginDTO = req.body;
        const student = await Student.findOne({ sid: data.sid });

        if (!student) {
            return res.status(404).json({
                message: 'Not found',
            });
        }

        if (student.password === data.password) {
            return res.status(200).json({
                message: 'Login successful',
                token: data.sid,
            });
        }

        return res.status(400).json({
            message: 'Invalid credentials',
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Request for approval
export const requestApproval = (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(204).json({
                message: 'Please upload file',
            });
        }

        const receipt = req.file;
        s3.upload(
            {
                Bucket: process.env.BUCKET_NAME!,
                Key: `${receipt.originalname}`,
                Body: fs.readFileSync(receipt.path),
            },
            (err: any, data: any) => {
                if (err) {
                    console.log(err);
                }

                return res.status(201).json({
                    message: 'File uploaded successfully',
                    url: data.Location,
                });
            }
        );

        return res.status(200).json({ message: 'Not uploaded' });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const getAllStudents = async (_: Request, res: Response) => {
    try {
        const students = await Student.find();
        return res.json({
            students: students,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

export const getStudent = async (req: Request, res: Response) => {
    try {
        const { sid, firstName, lastName, status, balance, expense } =
            await Student.findOne({
                sid: req.params.id,
            });
        const entries = await Entry.find({ sid: req.params.id });

        let extraFood = 0;
        let guests = 0;

        entries.map((entry) => {
            extraFood += entry.extraFood;
            guests += entry.numberOfGuests;
        });
        return res.json({
            student: {
                sid,
                firstName,
                lastName,
                status,
                balance,
                expense,
                extraFood,
                guests,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

export const billGeneration = async (req: Request, res: Response) => {
    try {
        const student = await Student.findOne({ sid: req.params.id });
        const entries = await Entry.find({
            sid: req.params.id
        })
        const settings = await Setting.findOne({ _id: new ObjectId(process.env.SETTING_ID) })
        const filteredEntries = entries.filter((entry) => {
            return parseInt(entry.date.slice(3, 5)) === parseInt(req.params.month);
        })
        const totalGuest = filteredEntries.reduce((total, entry) => {
            return total + entry.numberOfGuests
        }, 0)
        const guestCost = totalGuest * settings?.price?.vegMeal
        const totalExtraFood = filteredEntries.reduce((total, entry) => {
            return total + entry.extraFood
        }, 0)
        const extraFoodCost = totalExtraFood * settings?.price?.nonVegMeal
        const totalDaysAttend = (new Set(filteredEntries.map(entry => {
            return { date: entry.date }
        }))).size
        const dailyCost = totalDaysAttend * (settings?.price?.breakfast + settings?.price?.vegMeal * 2)
        console.log(totalGuest, totalExtraFood, totalDaysAttend);
        console.log(guestCost, extraFoodCost, dailyCost);
        const allCost = {
            'totalGuest': totalGuest,
            'guestCost': guestCost,
            'totalExtraFood': totalExtraFood,
            'extraFoodCost': extraFoodCost,
            'attendance': totalDaysAttend,
            'dailyCost': dailyCost,
            'totalCost': guestCost + extraFoodCost + dailyCost
        }

        console.log(student);


        return res.json({
            name: student.firstName + " " + student.lastName,
            rollno: student.sid,
            balance: student.balance,
            expense: student.expense,
            allCost: allCost
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
// Student stats
export const studentMonthlyStats = async (req: Request, res: Response) => {
    try {
        const sid = req.params.sid;
        const month = new Date().getMonth() + 1;
        const entries = await Entry.find({ sid });
        entries.filter(
            (entry) =>
                month.toString() ==
                entry.date?.substring(0, entry.date.indexOf('/'))
        );

        const totalMeals = entries.length;
        let guests = 0;
        let extraFood = 0;

        entries.map((entry) => {
            guests += entry.numberOfGuests;
            extraFood += entry.extraFood;
        });
        return res.json({ entries, totalMeals, guests, extraFood });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

