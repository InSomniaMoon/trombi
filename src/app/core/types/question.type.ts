import { User } from "./user.type";

export interface Question {
  askerId: string;
  question: string;
  answers: Answer[];
}

export interface Answer {
  name: string;
  users: User[];
}