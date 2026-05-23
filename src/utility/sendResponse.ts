import type { Response } from "express";

type ResponseData<t> = {
    statusCode: number;
    success: boolean;
    message: string;
    data?: t;
}

export const sendResponse = <T>(res: Response, data: ResponseData<T>) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data
    });
}