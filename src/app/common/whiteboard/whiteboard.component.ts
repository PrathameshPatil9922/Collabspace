import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DrawingCanvasComponent } from './drawing-canvas/drawing-canvas.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'app-whiteboard',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    MatSidenavModule,
    SidenavComponent,
    DrawingCanvasComponent,
    ToolbarComponent],
  templateUrl: './whiteboard.component.html',
  styleUrl: './whiteboard.component.css'
})
export class WhiteboardComponent {
  collapsed = signal(false); // Use the signal API to handle collapsed state

  toggleSidenav() {
    this.collapsed.set(!this.collapsed()); // Toggle the collapsed state
  }

  sidenavwidth(): string {
    return this.collapsed() ? '65px' : '200px';
  }
}
