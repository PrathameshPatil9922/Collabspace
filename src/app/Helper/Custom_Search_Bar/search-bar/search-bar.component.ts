import { OverlayModule } from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SearchBarServiceService } from '../services/search-bar-service.service';
import { SearchOverlayComponent } from "../search-overlay/search-overlay.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatIconButton, MatIcon, OverlayModule, SearchOverlayComponent, NgClass],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  searchbarService = inject(SearchBarServiceService);
  overlayOpen = this.searchbarService.overlayOpen;

  search(searchTerm: string) {

    if (!searchTerm) return;
  }

}
