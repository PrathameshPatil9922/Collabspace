import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  getFiles(): Observable<string[]> {
    return this.http.get<string[]>('/api/files');
  }

  loadFile(filename: string): Observable<string> {
    return this.http.get(`/api/files/load?filename=${filename}`, { responseType: 'text' });
  }

  saveFile(filename: string, content: string): Observable<void> {
    return this.http.post<void>('/api/files/save', { filename, content });
  }

  exportFile(filename: string, content: string): Observable<void> {
    return this.http.post<void>('/api/files/export', { filename, content });
  }
}
