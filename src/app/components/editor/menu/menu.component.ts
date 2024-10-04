import { Component } from '@angular/core';
import { FileService } from '../../../service/file.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  inviteFriends() {
    throw new Error('Method not implemented.');
  }
  saveAsFile() {
    throw new Error('Method not implemented.');
  }
  constructor(private fileService: FileService) { }

  createNewFile() {
    // Logic to create a new file
  }

  openFile() {
    const filename = prompt('Enter filename');
    if (filename) {
      this.fileService.loadFile(filename).subscribe(content => {
        // Pass content to the editor
      });
    }
  }

  saveFile() {
    const filename = prompt('Enter filename');
    if (filename) {
      const content = ''; // Get content from editor
      this.fileService.saveFile(filename, content).subscribe(() => {
        alert('File saved successfully');
      });
    }
  }

  saveFileAs() {
    const filename = prompt('Enter new filename');
    if (filename) {
      const content = ''; // Get content from editor
      this.fileService.saveFile(filename, content).subscribe(() => {
        alert('File saved successfully');
      });
    }
  }

  exportFile() {
    const filename = prompt('Enter filename');
    if (filename) {
      const content = ''; // Get content from editor
      this.fileService.exportFile(filename, content).subscribe(() => {
        alert('File exported successfully');
      });
    }
  }

}
