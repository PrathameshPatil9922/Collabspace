import { Component, computed, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LeftPanelComponent } from "../left-panel/left-panel.component";
import { CodeComponent } from '../../code/code.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-panel',
  imports: [MatToolbarModule, MatIconModule, CommonModule, MatSlideToggle, MatSidenavModule, LeftPanelComponent, CodeComponent],
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css'],
  standalone: true
})
export class TopPanelComponent {

  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '200px');
  isDarkMode: any;

  toggleTheme() {
    throw new Error('Method not implemented.');
  }
  currentFolderName: string = 'No Folder';

  constructor(private dialog: MatDialog) { }

  createNewFolder() {
    const folderName = prompt('Enter folder name');
    if (folderName) {
      this.currentFolderName = folderName;
      // Add logic to create a new folder in the file system
    }
  }

  openFolder() {
    // Logic to open a folder
  }

  exportProject() {
    // Logic to export project
  }

  runCode() {
    // Emit an event or call the backend to run the current code
  }

  help() {
    // Display help information
  }
}
