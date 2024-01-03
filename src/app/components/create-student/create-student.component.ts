import { JsonPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PhoneFormatDirective } from '../../core/directives/phone.directive';
import { PhonePipe } from '../../core/pipes/phone.pipe';
import { StudentService } from '../../core/services/student.service';
import { FileFieldComponent } from '../file-field/file-field.component';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
    FileFieldComponent,
    PhoneFormatDirective,
    PhonePipe,

  ],
  template: `
      <form [formGroup]="fg" (ngSubmit)="submitForm()">
        <div style="padding-bottom: 10px;">
          <p>Sexe</p>
          <br/>
          <!-- radio btns with the labels Homme, Femme ad the values H, F -->
          <input type="radio" id="Hsexe" formControlName="sexe" value="H"  required />
          <label for="Hsexe">Homme</label>
          <input type="radio" id="Fsexe" formControlName="sexe" value="F"  required />
          <label for="Fsexe">Femme</label>
        </div>
        <div class="form-group">
          <input type="text" id="firstName" formControlName="firstName" placeholder="" class="form-control" required />
          <label for="firstName">Prénom</label>
          <!-- error if there is  -->
        </div>
        <div class="error" *ngIf="fg.controls.firstName.errors?.['required'] && fg.controls.firstName.touched" class="alert alert-danger">Le prénom est obligatoire</div>
        <div class="form-group">
          <input type="text" id="lastName" formControlName="lastName" placeholder="" class="form-control"  required />
          <label for="lastName">Nom</label>
        </div>
        <div class="error" *ngIf="fg.controls.lastName.errors?.['required'] && fg.controls.firstName.touched" class="alert alert-danger">Le nom de famille est obligatoire</div>

        <div class="form-group">
          <input type="text" id="etp" formControlName="etp" placeholder="" class="form-control"  required />
          <label for="etp">Entreprise</label>
        </div>
        <div class="error" *ngIf="fg.controls.etp.errors?.['required'] && fg.controls.firstName.touched" class="alert alert-danger">Le nom de l'entreprise est obligatoire</div>

        <app-file-field  name="etpLogo" id="etpLogo" (fileChange)="etpPicture = $event">Logo de l'entreprise</app-file-field>
        
        <div class="form-group">
          <input type="email" id="email" formControlName="email" placeholder="" class="form-control"  required />
          <label for="email">Email</label>
        </div>
        <div class="error" *ngIf="fg.controls.email.errors?.['required'] && fg.controls.firstName.touched" class="alert alert-danger">L'email est obligatoire</div>
        <div class="error" *ngIf="fg.controls.email.errors?.['email'] && fg.controls.firstName.touched" class="alert alert-danger">L'email doit être valide</div>

        <div class="form-group">
          <input phoneFormat type="tel" id="phone" formControlName="phone" placeholder="" class="form-control"  required />
          <label for="phone">Phone</label>
        </div>
        <div class="error" *ngIf="fg.controls.phone.errors?.['required'] && fg.controls.firstName.touched" class="alert alert-danger">Le numéro de téléphone est obligatoire</div>
        <div class="error" *ngIf="fg.controls.phone.errors?.['error'] && fg.controls.firstName.touched" class="alert alert-danger">{{fg.controls.phone.errors?.['error']}}</div>
        
        <app-file-field  name="photo" id="photo" (fileChange)="studentPicture = $event">Photo</app-file-field>

        <button type="submit" class="btn btn-success" [disabled]="!isFromValid()">Create</button>
      </form>
      `,
  styleUrl: './create-student.component.scss',
})
export class CreateStudentComponent {
  @Output("onModalClose")
  modalVisible = new EventEmitter<void>();

  studentPicture?: File;

  etpPicture?: File;

  constructor(private $Student: StudentService) { }

  fg = new FormGroup({
    sexe: new FormControl<string>('', Validators.required),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', Validators.compose([Validators.required])),
    etp: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    phone: new FormControl('', Validators.compose([Validators.required, this.validatePhone()])),
  })

  private validatePhone(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      // Supprime tous les caractères non numériques
      const numericValue = value.replace(/\D/g, '');
      if (!value) {
        return null;
      }
      // Formatage du numéro de téléphone
      if (numericValue.length != 10) {
        return { error: 'Le numéro de téléphone doit contenir 10 chiffres' };
      }
      return null;
    }
  }

  isFromValid() {
    return this.fg.valid && this.studentPicture && this.etpPicture;
  }

  submitForm() {

    if (!this.etpPicture)
      return;

    if (!this.studentPicture)
      return;

    this.$Student.addStudent({
      id: 0,
      name: {
        first: this.fg.value.firstName!,
        last: this.fg.value.lastName!,
      },
      email: this.fg.value.email!,
      phone: this.fg.value.phone!,
      company: {
        logo: `/${this.etpPicture.name}`,
        name: this.fg.value.etp!,
      },
      picture: `/${this.studentPicture.name}`,
      sexe: this.fg.value.sexe!,
    })
    this.fg.reset();
    this.modalVisible.emit();
  }
}
