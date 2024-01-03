import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StudentService } from '../../core/services/student.service';
import { FileFieldComponent } from '../file-field/file-field.component';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FileFieldComponent,
  ],
  template: `
      <form #createStudent="ngForm" (ngSubmit)="submitForm(createStudent)">
        <div class="form-group">
          <input type="text" id="firstName" name="firstName" placeholder="" class="form-control" ngModel required />
          <label for="firstName">Prénom</label>
        </div>
        <div class="form-group">
          <input type="text" id="lastName" name="lastName" placeholder="" class="form-control" ngModel required />
          <label for="lastName">Nom</label>
        </div>
        <div class="form-group">
          <input type="text" id="etp" name="etp" placeholder="" class="form-control" ngModel required />
          <label for="etp">Entreprise</label>
        </div>
        <app-file-field  name="etpLogo" id="etpLogo" (fileChange)="etpPicture = $event">Logo de l'entreprise</app-file-field>
        
        <div class="form-group">
          <input type="email" id="email" name="email" placeholder="" class="form-control" ngModel required />
          <label for="email">Email</label>
        </div>
        <div class="form-group">
          <input type="tel" id="phone" name="phone" placeholder="" class="form-control" ngModel required />
          <label for="phone">Phone</label>
        </div>
        <app-file-field  name="photo" id="photo" (fileChange)="studentPicture = $event">Photo</app-file-field>
        <button type="submit" class="btn btn-success">Create</button>
      </form>
      `,
  styleUrl: './create-student.component.scss',
})
export class CreateStudentComponent {
  @Output()
  modalVisible = new EventEmitter<boolean>();

  studentPicture!: File;

  etpPicture!: File;

  constructor(private $Student: StudentService) { }


  submitForm(form: NgForm) {

    if (!this.etpPicture)
      return;

    if (!this.studentPicture)
      return;

    this.$Student.addStudent({
      id: 0,
      name: {
        first: form.value.firstName,
        last: form.value.lastName,
      },
      email: form.value.email,
      phone: form.value.phone,
      company: {
        logo: `/${this.etpPicture.name}`,
        name: form.value.etp,
      },
      picture: `/${this.studentPicture.name}`,
    }).subscribe(() => {
      form.reset();
    });
  }

  onStudentPictureChange(file: File) {
    this.studentPicture = file;

  }
}
