import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompileRunService {

  private apiUrl = 'http://localhost:8080/api/compile';

  constructor(private http: HttpClient) { }

  compileAndRun(code: string, language: string): Observable<any> {
    return this.http.post(this.apiUrl, { code, language });
  }

}
