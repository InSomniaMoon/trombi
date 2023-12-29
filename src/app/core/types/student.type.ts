import { Company } from "./company.type";

export interface Student {
  id: number;
  name: { first: string, last: string };
  email: string;
  phone: string;
  picture: string;
  company: Company;
}
