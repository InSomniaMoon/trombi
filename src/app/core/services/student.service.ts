import { Injectable, signal } from '@angular/core';
import { Student } from '../types/student.type';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }

  seletedStudent = signal<Student | null>(null, { equal: (a, b) => a?.id === b?.id });

  getStudents(): Student[] {
    return [
      {
        id: 1,
        name: {
          first: 'John',
          last: 'Doe',
        },
        email: 'john.doe@test.fr',
        company: {
          name: 'Test',
          logo: '/70',
        },
        phone: '0123456789',
        picture: '/90x120',
      },
      {
        id: 2,
        name: {
          first: 'Jane',
          last: 'Doe',
        },
        email: "jane.doe@test.fr",
        company: {
          name: 'Test',
          logo: '/70',
        },
        phone: '0123456789',
        picture: '/90x120',
      }

    ];

  }

}
