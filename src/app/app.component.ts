import { Component } from '@angular/core';
import { InputState } from './input-state.model';
import { CommonModule } from '@angular/common';

const passwordChars = {
  letters: 'abcdefghijklmnopqrstuvwyz',
  numbers: '1234567890',
  symbols: '!@#$%^&*()[]',
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  passwordLength: number = 0;
  password: string = '';
  inputFocus: boolean = false;

  inputState: InputState = {
    includeLetters: false,
    includeNumbers: false,
    includeSymbols: false,
  };

  onChangePasswordLength(event: any): void {
    const parsedValue = parseInt(event.target.value);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      this.passwordLength = parsedValue;
    }
  }

  onInputFocus() {
    this.inputFocus = true;
  }

  onChangeInputState(inputType: string): void {
    this.inputState[`include${inputType}`] =
      !this.inputState[`include${inputType}`];
  }

  shuffleString(validChars: string): string {
    const arr = validChars.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  }

  onButtonClick() {
    // generating a random password
    let validChars = '';

    this.inputState.includeLetters
      ? (validChars +=
          passwordChars.letters + passwordChars.letters.toUpperCase())
      : null;
    this.inputState.includeNumbers
      ? (validChars += passwordChars.numbers)
      : null;
    this.inputState.includeSymbols
      ? (validChars += passwordChars.symbols)
      : null;

    const shuffleChars = this.shuffleString(validChars);

    let generatedPassword = '';
    for (let i = 0; i < this.passwordLength; i++) {
      const index = Math.floor(Math.random() * shuffleChars.length);
      generatedPassword += shuffleChars[index];
    }
    this.password = generatedPassword;
  }

  // getPassword() {
  //   return this.password;
  // }
  // getName() {
  //   return 'Piotr';
  // }
}
