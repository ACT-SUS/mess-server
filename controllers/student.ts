import { Request, Response } from 'express';
import fs from 'fs';

import { StudentLoginDTO, StudentRegisterDTO } from '../dto';
import { Student } from '../models';
import { s3 } from '../utils';

// Register student
export const register = async (req: Request, res: Response) => {
    try {
        const data: StudentRegisterDTO = req.body;
        const student = new Student(data);
        await student.save();

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
        console.log(data);
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
        const student = await Student.findById(req.params.id);
        return res.json({
            student: student,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};
