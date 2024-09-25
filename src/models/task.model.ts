import mongoose, { Document, Schema } from 'mongoose';
import Joi from "joi"

export interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
  owner: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  completed: { type: Boolean, default: false },
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}, {
  timestamps: true
});

export const TaskModel = mongoose.model<ITask>('Task', taskSchema);

export const validateTask = (task: any) => {
  const schema = Joi.object({
    title: Joi.string().required().min(1).max(100),
    description: Joi.string().max(500),
    completed: Joi.boolean()
  });

  return schema.validate(task, { abortEarly: false });
};

export const validateTaskUpdate = (task: any) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(100),
    description: Joi.string().max(500),
    completed: Joi.boolean()
  }).min(1);

  return schema.validate(task, { abortEarly: false });
};