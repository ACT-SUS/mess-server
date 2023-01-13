import { Request, Response } from 'express';
import { StudentStatus } from '../enums';
import { Student } from '../models';

// Approve student
export const approveStudent = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        await Student.findOneAndUpdate(
            { sid: id },
            {
                $set: {
                    status: StudentStatus.APPROVED,
                    balance: 20000,
                },
            }
        );
        return res.status(200).json({
            message: 'Status updated',
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Reject student
export const rejectStudent = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        await Student.findOneAndUpdate(
            { sid: id },
            {
                $set: {
                    status: StudentStatus.REJECTED,
                },
            }
        );
        return res.status(200).json({
            message: 'Status updated',
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Get students with pending status
export const pendingStudents = async (req: Request, res: Response) => {
    try {
        const students = await Student.find({ status: StudentStatus.PENDING });

        return res.status(200).json({
            students,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Get students with approved status
export const approvedStudents = async (_req: Request, res: Response) => {
    try {
        const students = await Student.find({ status: StudentStatus.APPROVED });

        return res.status(200).json({
            students,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

// Get students with rejected status
export const rejectedStudent = async (_req: Request, res: Response) => {
    try {
        const students = await Student.find({ status: StudentStatus.REJECTED });

        return res.status(200).json({
            students,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};
