export interface Question {
  waypointId: string;
  question: string;
  answer: string;
}

export const questions: Question[] = [
  {
    waypointId: "004",
    question: "Hoeveel treden heeft de trap?",
    answer: "12"
  },
  {
    waypointId: "005",
    question: "Welke kleur heeft de brievenbus?",
    answer: "rood"
  },
  // Add more questions for each waypoint
];
