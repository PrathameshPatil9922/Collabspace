import { Component, inject } from '@angular/core';
import { DarkModeService } from '../services/dark-mode.service';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from "../components/search-bar/search-bar.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = "CollabSpace";

  darkModeService: DarkModeService = inject(DarkModeService);

  toggleDarkMode() {
    this.darkModeService.updateDarkMode();
  }
}
