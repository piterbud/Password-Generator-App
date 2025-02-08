import { Component, signal } from '@angular/core';
import { IntroComponent } from './intro/intro.component';
import { OnInit } from '@angular/core';
import { MainComponent } from './main/main.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [IntroComponent, MainComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isIntro = signal(true);

  // Initializes the component and checks for a saved intro state in sessionStorage.
  // If found, sets `isIntro` to the saved value; otherwise, defaults to showing the intro.
  // After a new session or reset, the intro state is reset to false.
  ngOnInit(): void {
    const savedIntroState = sessionStorage.getItem('introSignalState');
    if (savedIntroState !== null) {
      this.isIntro.set(JSON.parse(savedIntroState));
    }
  }

  // Closes the intro screen by setting `isIntro` to false.
  // Also saves the intro state as 'false' in sessionStorage to persist the state.
  onCloseIntro() {
    this.isIntro.set(false);
    sessionStorage.setItem('introSignalState', JSON.stringify(false));
  }
}
