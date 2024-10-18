import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  @Input() collapsed: boolean | null = false; // Input for collapsed state
  @Output() toggleSidenav = new EventEmitter<void>(); // Output event to trigger the sidenav toggle

  toggle() {
    this.toggleSidenav.emit(); // Emit the event to toggle sidenav
  }
}


