import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css'
})
export class CodeEditorComponent {
  language: string = 'java';
  code: string = '';


  onRunCode() {
    // Code to run the current code in the editor
  }
}
