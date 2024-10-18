import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NotesComponent } from './notes/notes.component';

@Component({
  selector: 'app-notepad',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    MatSidenavModule,
    SidenavComponent,
    NotesComponent,
    ToolbarComponent, NotesComponent],
  templateUrl: './notepad.component.html',
  styleUrl: './notepad.component.css'
})
export class NotepadComponent {
  collapsed = signal(false); // Use the signal API to handle collapsed state

  toggleSidenav() {
    this.collapsed.set(!this.collapsed()); // Toggle the collapsed state
  }

  sidenavwidth(): string {
    return this.collapsed() ? '65px' : '200px';
  }
}
