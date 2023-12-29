import { CommonModule } from '@angular/common';
import { Component, computed, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentItemDetailsComponent } from './components/student-item-details/student-item-details.component';
import { StudentItemComponent } from './components/student-item/student-item.component';
import { StudentService } from './core/services/student.service';
import { Student } from './core/types/student.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, StudentItemComponent, StudentItemDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Trombinoscope';

  constructor(private $Student: StudentService) {
    effect(() => {
      console.log(this.$Student.seletedStudent());
    });
  }

  students: Student[] = this.$Student.getStudents();

  isDetailsOpen = computed(() => this.$Student.seletedStudent() !== null);

}
