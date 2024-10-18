import { Component, Input } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-bottom-panel',
  imports: [MatToolbar],
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.css'],
  standalone: true
})
export class BottomPanelComponent {
  @Input() lineCount: number = 0;
}
