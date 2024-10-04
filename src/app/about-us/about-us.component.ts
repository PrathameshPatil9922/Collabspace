import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  prathamesh: string = "prathamesh.jpg";

  about: string = "We are happy to welcome all of your suggestions.Feel free to contact us. Till then keep learning! keep growing! Thank You !!!!";
}
