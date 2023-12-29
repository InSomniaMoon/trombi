import { animate, state, style, transition, trigger } from '@angular/animations';

export const popinAnimation = () =>
  trigger('popinModal', [
    state('open', style({
      opacity: 1,
      transform: 'scale(1)',
      height: "100%",
      width: "100%",
    })),
    state('closed', style({
      opacity: 0,
      transform: 'scale(0)',
      height: "0%",
      width: "0%",
    })),
    transition('open => closed', [
      animate('0.3s')
    ]),
    transition('closed => open', [
      animate('0.3s')
    ]),
  ]);