import { CommonModule, NgIf } from '@angular/common';
import { Component, ElementRef, Input, NgModule, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-smart-editor',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule, CodeEditorModule, CodemirrorModule],
  templateUrl: './smart-editor.component.html',
  styleUrl: './smart-editor.component.css'
})
export class SmartEditorComponent {
  code = 'console.log("Hello, CodeMirror!");';
  editorOptions = {
    mode: 'javascript',
    lineNumbers: true,
    theme: 'material-darker'  // You can choose other themes as well
  };

  saveCode() {
    console.log('Code saved:', this.code);
  }
}
