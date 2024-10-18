import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CollabDialogComponent } from '../collab-dialog/collab-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-right-panel',
  imports: [CommonModule, FormsModule, MatIcon, MatListModule],
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css'],
  standalone: true
})
export class RightPanelComponent {
  tools = [
    { name: 'Debug', icon: 'bug_report' },
    { name: 'Run', icon: 'play_arrow' },
    { name: 'Settings', icon: 'settings' },
  ];

  selectTool(tool: any) {
    console.log(tool);
  }
}
