import { Component } from '@angular/core';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { ProblemStatementComponent } from '../problem-statement/problem-statement.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ResizableModule } from 'angular-resizable-element';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { SmartEditorComponent } from '../smart-editor/smart-editor.component';

@Component({
  selector: 'app-code-editor-dash',
  standalone: true,
  imports: [CodeEditorComponent, ProblemStatementComponent, CommonModule, SmartEditorComponent],
  templateUrl: './code-editor-dash.component.html',
  styleUrl: './code-editor-dash.component.css'
})
export class CodeEditorDashComponent {
}
