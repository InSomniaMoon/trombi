import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, computed, effect, signal } from '@angular/core';
import { of } from 'rxjs';
import { Student } from '../types/student.type';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  deleteStudent(student: Student) {
    this.students.set(this.students().filter(s => s.id !== student.id));

    localStorage.setItem('students', JSON.stringify(this.students()));
    if (this.selectedStudent() && this.selectedStudent()?.id === student.id) {
      this.selectedStudent.set(null);
    }

  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    effect(() => {
      console.log("students effect");
      
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('students', JSON.stringify(this.students()));
      }
    });
  }

  /**
   * The selected student
   * @example
   * const student = seletedStudent();
   */
  selectedStudent = signal<Student | null>(null, { equal: (a, b) => a?.id === b?.id });

  students = signal<Student[]>(this.getStudents());

  /**
   * Get all students from local storage
   * @returns
   * @example
   * const students = getStudents();
   */
  getStudents(): Student[] {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('students') || '{}');
    }
    return [];
  }

  /**
   * Add a new student to the list
   * @param student
   * @returns
   * @example
   * const student = { name: 'John', age: 20, id: 1 };
   * addStudent(student);
   */
  addStudent(student: Student) {
    student.id = this.getNewId();
    this.students().push(student);
    return of();
  }

  private studentsIds = computed(() => this.students().map(s => s.id));

  /**
   * Get a new id for a student
   * takes the students Ids, remove them from an array of all possible ids (1 to 99) and return a random one
   */
  private getNewId(): number {
    const allIds = Array.from(Array(99).keys());
    const ids = allIds.filter(id => !this.studentsIds().includes(id));
    return ids[Math.floor(Math.random() * ids.length)];
  }
}
