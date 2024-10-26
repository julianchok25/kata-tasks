export interface TaskModel {
    _id: number;
    title: string;
    description: string;
    completed?: boolean;
    createdAt: string;
    updatedAt: string;
}