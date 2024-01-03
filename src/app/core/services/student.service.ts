import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, computed, effect, signal } from '@angular/core';
import { of } from 'rxjs';
import { Student } from '../types/student.type';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
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
      return JSON.parse(localStorage.getItem('students') || '[]');
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
    student.name.first = student.name.first[0].toUpperCase() + student.name.first.slice(1);
    student.name.last = student.name.last[0].toUpperCase() + student.name.last.slice(1);
    student.company.name = student.company.name[0].toUpperCase() + student.company.name.slice(1);
    student.email = student.email.toLowerCase();
    this.students().push(student);
    localStorage.setItem('students', JSON.stringify(this.students()));
    return of();
  }

  /**
   * Delete a student
   * @param student The student to delete
   * @example
   * const student = { name: 'John', age: 20, id: 1 };
   * deleteStudent(student);
   * @returns
   */
  deleteStudent(student: Student) {
    this.students.set(this.students().filter(s => s.id !== student.id));

    localStorage.setItem('students', JSON.stringify(this.students()));
    if (this.selectedStudent() && this.selectedStudent()?.id === student.id) {
      this.selectedStudent.set(null);
    }
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
