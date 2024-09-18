export interface Task {
  id: number;
  name: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    email: string;
  };
}

export enum AuthOptions {
  USER = "user",
  ADMIN = "admin",
}

export enum Completed {
  YES = "Yes",
  NO = "No",
  ALL = "All",
}

export interface User {
  id: number;
  email: string;
  role: AuthOptions;
}

export interface EditTask {
  name?: string;
  completed?: boolean;
}
