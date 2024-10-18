import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { BottomPanelComponent } from './components/bottom-panel/bottom-panel.component';
import { OutputPanelComponent } from './components/output-panel/output-panel.component';
import { TopPanelComponent } from './components/top-panel/top-panel.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatDrawerContent } from '@angular/material/sidenav'
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopPanelComponent, LeftPanelComponent, RightPanelComponent,
    BottomPanelComponent, OutputPanelComponent, MatDrawerContainer, MatDrawerContent, MatExpansionModule, MatDrawer],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css'
})
export class CodeEditorComponent {
  title = 'code_editor';
}
