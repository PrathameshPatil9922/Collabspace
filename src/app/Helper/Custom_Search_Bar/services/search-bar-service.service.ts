import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchBarServiceService {

  overlayOpen = signal(false);
  recentSearches = signal<string[]>(["Angular", "Java", "Spring Boot", "AWS"]);

  constructor() { }

  search(searchTerm: string) {

  }
}
