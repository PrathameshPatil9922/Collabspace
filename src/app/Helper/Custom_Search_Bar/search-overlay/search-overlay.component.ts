import { Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatActionList, MatListModule } from '@angular/material/list';
import { SearchBarServiceService } from '../services/search-bar-service.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-search-overlay',
  standalone: true,
  imports: [MatDivider, MatListModule, MatIcon, MatIconButton],
  templateUrl: './search-overlay.component.html',
  styleUrl: './search-overlay.component.css'
})
export class SearchOverlayComponent {
  searchBarService = inject(SearchBarServiceService);
  recentSearches = this.searchBarService.recentSearches;
}
