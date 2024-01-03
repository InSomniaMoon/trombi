import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StudentService } from '../../core/services/student.service';
import { FileFieldComponent } from '../file-field/file-field.component';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [
    FormsModule,
    FileFieldComponent,
  ],
  template: `
      <form #createStudent="ngForm" (ngSubmit)="submitForm(createStudent)">
        <div style="padding-bottom: 10px;">
          <label for="sexe">Sexe</label>
          <br/>
          <!-- radio btns with the labels Homme, Femme ad the values H, F -->
          <input type="radio" id="Hsexe" name="sexe" value="H" ngModel required />
          <label for="Hsexe">Homme</label>
          <input type="radio" id="Fsexe" name="sexe" value="F" ngModel required />
          <label for="Fsexe">Femme</label>
        </div>
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
        <button type="submit" class="btn btn-success" [disabled]="!createStudent.valid">Create</button>
      </form>
      `,
  styleUrl: './create-student.component.scss',
})
export class CreateStudentComponent {
  @Output("onModalClose")
  modalVisible = new EventEmitter<void>();

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
      sexe: form.value.sexe,
    })
    form.reset();
    this.modalVisible.emit();
  }

  onStudentPictureChange(file: File) {
    this.studentPicture = file;

  }
}
