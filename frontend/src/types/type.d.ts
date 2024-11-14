declare type IUser = {
    _id: Types.ObjectId;
    name: string,
    email: string,
    avatar: string
}
// Update user types
declare type UpdateUserParams = {
    name: string | null,
    email: string | null,
    currentPassword: string | null,
    newPassword: string | null,
    avatar: string | null
}

// User types
declare type CreateUserParams = {
    name: string,
    email: string,
    password: string,
    avatar?: string
}

declare type LoginUserParams = {
    email: string,
    password: string,
}

// Task adding types
declare type AddTaskParams = {
    title: string,
    description: string,
    dueDate: string,
    status: string,
    priority: string,
    tags: string
}

// Task type
declare type Task = {
    _id?: Types.ObjectId,
    owner: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    priority: 'High' | 'Medium' | 'Low';
    dueDate: Date;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    tags?: string;
    progress: number;
}

declare type IdType = {
    _id: Types.ObjectId
}