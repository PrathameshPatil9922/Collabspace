import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};

@Component({
  selector: 'app-notes-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  sidenavCollapsed = signal(false);

  @Input() set collapsed(val: boolean) {
    this.sidenavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    { icon: 'save', label: 'Save', route: 'save' },
    { icon: 'file_download', label: 'Export', route: 'export' },
    { icon: 'slideshow', label: 'PPT Presentation', route: 'ppt' }
  ]);

  logosize = computed(() => (this.sidenavCollapsed() ? '32' : '100'));

  saveContentAsPDF() {
    const doc = new jsPDF();
    const content = document.getElementById('canvas-content'); // Ensure this ID is correct

    if (!content) {
      console.error('Element with ID "canvas-content" not found.');
      return;
    }

    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190; // Width in mm
      const pageHeight = doc.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
      let heightLeft = imgHeight;

      let position = 0;

      while (heightLeft >= 0) {
        doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;
        if (heightLeft >= 0) {
          doc.addPage(); // Add a new page if content exceeds the page height
        }
      }

      doc.save('saved_doc/document.pdf');
    }).catch(err => {
      console.error('Error generating PDF:', err);
    });
  }

  exportContent() {
    console.log('Exporting content... (you can implement this feature)');
  }

  handlePPTUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected PPT file:', file);
    }
  }
}
