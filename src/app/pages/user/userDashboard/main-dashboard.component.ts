import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { IndividualWorkspaceComponent } from '../individual-workspace/individual-workspace.component';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, IndividualWorkspaceComponent, RouterOutlet],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainDashboardComponent {

  router: Router = inject(Router);

  navigate() {
    this.router.navigateByUrl('/user/individual');
  }

}
