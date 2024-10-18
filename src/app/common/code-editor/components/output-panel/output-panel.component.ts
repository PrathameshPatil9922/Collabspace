import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-output-panel',
  templateUrl: './output-panel.component.html',
  styleUrls: ['./output-panel.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class OutputPanelComponent {

}
