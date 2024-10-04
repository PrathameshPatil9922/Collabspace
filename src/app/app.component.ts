import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DarkModeService } from './services/dark-mode.service';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, CommonModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'collabproject';

  darkModeService: DarkModeService = inject(DarkModeService);
}
