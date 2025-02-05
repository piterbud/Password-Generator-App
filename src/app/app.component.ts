import { Component, signal } from '@angular/core';
import { IntroComponent } from './intro/intro.component';
import { OnInit } from '@angular/core';
import { MainComponent } from './main/main.component';

@Component({
  selector: 'app-root',
  imports: [IntroComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isIntro = signal(true);

  ngOnInit(): void {
    const savedState = sessionStorage.getItem('introSignalState');
    if (savedState !== null) {
      this.isIntro.set(JSON.parse(savedState));
    } else {
      setTimeout(() => {
        this.isIntro.set(false);
        sessionStorage.setItem('introSignalState', JSON.stringify(false));
      }, 5000);
    }
  }
}
