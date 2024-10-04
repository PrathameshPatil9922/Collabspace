import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainDashboardComponent {

}
