import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from './toast';
import { ToastType } from './toast.type';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);

  constructor() {
  }

  public getAll() { return this.toastsSubject.asObservable() }


  public success(title: string, message: string) {
    this.makeToast(title, message, 'success');
  }

  public warning(message: string) {
    this.makeToast("Attention !", message, 'warning');
  }

  public error(message: string) {
    this.makeToast("Erreur", message, 'danger');
  }

  public info(message: string) {
    this.makeToast("Information", message, 'info')
  }

  private makeToast(title: string, message: string, type: ToastType) {

    this.toastsSubject.next([
      ...this.toastsSubject.value,
      new Toast(type, title, message)
    ]);
  }

  public remove(uid: string) {
    this.toastsSubject.next(this.toastsSubject.value.filter(t => t.uuid !== uid))
  }

}
