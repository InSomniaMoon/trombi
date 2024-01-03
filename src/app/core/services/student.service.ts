import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { of } from 'rxjs';
import { Student } from '../types/student.type';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

  }

  seletedStudent = signal<Student | null>(null, { equal: (a, b) => a?.id === b?.id });

  students = signal<Student[]>(this.getStudents());

  getStudents(): Student[] {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('students') || '{}');
    }
    return [];
  }

  addStudent(student: Student) {
    student.id = this.students().length + 1;
    this.students().push(student);
    localStorage.setItem('students', JSON.stringify(this.students()));
    return of();
  }
}
