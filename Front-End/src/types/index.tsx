export type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  preparation: string[];
  order: number;
  image: string;
  time: number;
  category?: string;
};
