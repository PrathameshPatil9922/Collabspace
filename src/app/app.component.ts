import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule, NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/internal/operators/filter';
import { FooterComponent } from './pages/common/footer/footer.component';
import { HeaderComponent } from './pages/common/header/header.component';
import { HomeComponent } from './pages/common/home/home.component';
import { DarkModeService } from './services/darkMode/dark-mode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, CommonModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})




export class AppComponent {
  title = 'collabproject';

  showHeaderFooter: boolean = true;
  hiddenRoutes: string[] = ['/user/individual/code_editor', '/user/individual/whiteboard', '/user/individual', '/user/individual/notes', 'user/individual/notes/note-editor'];

  constructor(private router: Router) {
    // Listen to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Check if the route is '/code', if so hide header and footer
      this.showHeaderFooter = !this.hiddenRoutes.includes(event.url);
    });
  }

  darkModeService: DarkModeService = inject(DarkModeService);
}
