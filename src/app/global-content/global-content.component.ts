import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-global-content',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './global-content.component.html',
  styleUrl: './global-content.component.css'
})
export class GlobalContentComponent {

}
