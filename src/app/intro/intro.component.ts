import { Component, signal, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-intro',
  imports: [NgClass],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent {
  closed = output<void>();

  isIntroHidden = signal(false);

  // Hides the intro by setting the `isIntroHidden` signal to true (it starts the 'hide' animation)
  onHideIntro() {
    this.isIntroHidden.set(true);
  }

  // Emits an event when the 'hide' animation ends - action associated with the code in the app component
  onCloseIntro(event: AnimationEvent) {
    if (event.animationName.includes('hide')) {
      this.closed.emit();
    }
  }
}
