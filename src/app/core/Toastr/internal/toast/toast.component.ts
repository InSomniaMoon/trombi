import { NgClass, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'toastr-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf]

})
export class ToastComponent implements OnInit, AfterViewInit {

  @Input({ required: true }) message!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) type!: string;
  @Input({ required: true }) uid!: string;

  @ViewChild('toast') toast!: ElementRef;
  @ViewChild('dismissButton') dismissButton!: ElementRef;


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // setTimeout((_: any) => {
    //   this.close()
    // }, 3000);
  }

  close = () => {
    this.toast.nativeElement.classList.add('remove-toast');
    setTimeout((_: any) => this.toast.nativeElement.remove(), 300);
  };
}
