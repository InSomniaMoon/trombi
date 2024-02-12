import { ToastType } from "./toast.type";

export class Toast {

  public title: string;
  public message: string;
  public type: string;
  private uid: string;
  public get uuid() {
    return this.uid;
  }
  private uidGen() {
    return crypto.getRandomValues(new Uint32Array(4)).join('-');
  }


  constructor(type: ToastType, title: string, message: string) {
    this.message = message;
    this.title = title;
    this.type = type;
    this.uid = this.uidGen();
  }

}