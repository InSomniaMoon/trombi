export interface Question {
  id: string;
  question: string;
  answers: Answer[];
}

export interface Answer {
  name: string;
  answeredPeopleId: string[];
}