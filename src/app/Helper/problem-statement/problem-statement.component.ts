import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-problem-statement',
  standalone: true,
  imports: [],
  templateUrl: './problem-statement.component.html',
  styleUrl: './problem-statement.component.css'
})
export class ProblemStatementComponent {
  @Input() contentType: 'problem' | 'notes' = 'problem';
  @Input() content: string = '';

  getTitle(): string {
    return this.contentType === 'problem' ? 'Problem Statement' : 'Personal Notes';
  }
}
