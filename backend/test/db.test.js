import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';

jest.mock('mongoose', () => ({
    connect: jest.fn()
}));

describe('connectDB', () => {
    it('should connect to MongoDB successfully', async () => {
        mongoose.connect.mockResolvedValue({
            connection: { host: 'localhost' }
        });

        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        await connectDB();

        expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
        expect(consoleLogSpy).toHaveBeenCalledWith('MongoDB Connected: localhost');

        consoleLogSpy.mockRestore();
    });

    it('should handle connection errors', async () => {
        const errorMessage = 'Failed to connect';
        mongoose.connect.mockRejectedValue(new Error(errorMessage));

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});

        await connectDB();

        expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to connect to MongoDB', errorMessage);
        expect(processExitSpy).toHaveBeenCalledWith(1);

        consoleErrorSpy.mockRestore();
        processExitSpy.mockRestore();
    });
});