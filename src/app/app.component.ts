import { Component, signal } from '@angular/core';
import { CheckboxState } from './input-state.model';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

const passwordChars = {
  letters: 'abcdefghijklmnopqrstuvwyz',
  numbers: '1234567890',
  symbols: '!@#$%^&*()[]',
};

@Component({
  selector: 'app-root',
  imports: [NgClass, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  inputValue = signal('');
  passwordLength = signal(0);
  password = signal('');
  passwordIsCopied = signal(false);
  passwordIsCopiedText = signal('copy');

  checkboxState = signal<CheckboxState>({
    includeLetters: false,
    includeNumbers: false,
    includeSymbols: false,
  });

  // full reset on clicking tha app title
  resetApp() {
    window.location.reload();
  }

  // password length input - changing password length according to entered value with appropriate validation
  onChangePasswordLength(event: Event): void {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;
    this.inputValue.set(inputValue);

    if (/^[1-9]\d*$/.test(inputValue)) {
      this.passwordLength.set(parseInt(inputValue, 10));
    } else {
      this.passwordLength.set(0);
    }
  }

  // password length input - taking reset actions on input focus
  onClearPasswordLength() {
    this.inputValue.set('');
    this.password.set('');
  }

  // changing state of three checkboxes - each separately
  onChangeCheckboxState(inputType: string): void {
    const key = `include${inputType}` as keyof CheckboxState;
    this.checkboxState.set({
      ...this.checkboxState(),
      [key]: !this.checkboxState()[key],
    });
  }

  // additional string mixing using Knuth Shuffle (Fisher-Yates Shuffle) Algorithm
  shuffleString(validChars: string): string {
    const arr = validChars.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  }

  // generating a random password according to selected checkboxes after click
  onGeneratePassword() {
    let validChars = '';

    this.checkboxState().includeLetters
      ? (validChars +=
          passwordChars.letters + passwordChars.letters.toUpperCase())
      : null;
    this.checkboxState().includeNumbers
      ? (validChars += passwordChars.numbers + passwordChars.numbers)
      : null;
    this.checkboxState().includeSymbols
      ? (validChars += passwordChars.symbols + passwordChars.symbols)
      : null;

    const shuffleChars = this.shuffleString(validChars);

    let generatedPassword = '';
    for (let i = 0; i < this.passwordLength(); i++) {
      const index = Math.floor(Math.random() * shuffleChars.length);
      generatedPassword += shuffleChars[index];
    }
    this.password.set(generatedPassword);
  }

  // copying password to clipboard after click
  onCopyToClipboard() {
    navigator.clipboard
      .writeText(this.password())
      .then(() => {
        this.passwordIsCopied.set(true);
        this.passwordIsCopiedText.set('copied');
        setTimeout(() => {
          this.passwordIsCopied.set(false);
          this.passwordIsCopiedText.set('copy');
        }, 1000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  }
}
