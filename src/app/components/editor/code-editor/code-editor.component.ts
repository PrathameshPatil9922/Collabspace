import { Component } from '@angular/core';
import { WebSocketService } from '../../../service/web-socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css'
})
export class CodeEditorComponent {
  code: string = '';
  output: string = '';

  constructor(private wsService: WebSocketService) {
    this.wsService.connect().subscribe(message => {
      this.code = message;
    });
  }

  onCodeChange() {
    this.wsService.sendMessage(this.code);
  }

  runCode() {
    // logic to run the code
  }

  beautifyCode() {
    // logic to beautify the code
  }
}
