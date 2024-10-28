import { createTask, updateTask } from '../controllers/task.controller';
import mongoose from 'mongoose';
import Task from '../models/task.model'; // Asegúrate de que la ruta sea correcta

jest.mock('../models/task.model'); // Mock del modelo Task

describe('Task Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        data: { title: 'Test Task', description: 'Test Description' }
      },
      params: { id: '507f191e810c19729de860ea' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      Task.prototype.save = jest.fn().mockResolvedValue(req.body.data);

      await createTask(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should handle errors', async () => {
      const error = new Error('Save failed');
      Task.prototype.save = jest.fn().mockRejectedValue(error);

      await createTask(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: `Server Error on Save: ${error.message}` });
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', async () => {
      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
      Task.findByIdAndUpdate = jest.fn().mockResolvedValue(req.body.data);

      await updateTask(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: req.body.data });
    });

    it('should handle invalid task ID', async () => {
      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(false);

      await updateTask(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Invalid Task ID NOT FOUND' });
    });

    it('should handle errors', async () => {
      const error = new Error('Update failed');
      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
      Task.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

      await updateTask(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: `Server Error on Update: ${error.message}` });
    });
  });
});