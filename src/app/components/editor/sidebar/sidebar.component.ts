import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileService } from '../../../service/file.service';
import { MatListItem, MatListItemIcon, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule, CommonModule, MatNavList, MatListItem, MatListItemIcon, MatIcon],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  files: any[] = [];

  constructor(private fileService: FileService) { }

  createFile() {
    const filename = prompt('Enter filename');
    if (filename) {
      this.files.push({ name: filename, content: '' });
    }
  }

  openFile(file: any) {
    const filename = prompt('Enter filename to load');
    if (filename) {
      this.fileService.loadFile(filename).subscribe((content: any) => {
        // Pass content to the editor
        console.log(content);
      });
    }
  }

  saveFile() {
    const filename = prompt('Enter filename to save');
    if (filename) {
      const content = ''; // Get content from editor
      this.fileService.saveFile(filename, content).subscribe(() => {
        alert('File saved successfully');
      });
    }
  }

  exportFile() {
    const filename = prompt('Enter filename to export');
    if (filename) {
      const content = ''; // Get content from editor
      this.fileService.exportFile(filename, content).subscribe(() => {
        alert('File exported successfully');
      });
    }
  }

  selectFile(file: any) {
    // Logic to display file content in the editor
  }
}
