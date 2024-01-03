import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-field',
  standalone: true,
  imports: [
  ],
  template: `
  <div class="form-group">
    <input type="file" [id]="id" [name]="name" placeholder="" class="form-control" ngModel required />
    <label [for]="id">
      <ng-content /> <!-- affiche le contenu de la balise <app-file-field> -->
    </label>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileFieldComponent {

  @HostListener("change", ["$event.target.files"]) onFileChange(input: FileList) {
    //liste des fichiers uploadés
    if (input.item(0))
      this.fileChange.emit(input.item(0)!);
  }

  @Input({ required: true }) name!: string;
  @Input({ required: true }) id!: string;

  @Output() fileChange = new EventEmitter<File>();

}
