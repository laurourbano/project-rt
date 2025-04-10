import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quadro } from '../interfaces/quadro';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuadrosService {
  private apiUrl = environment.apiUrl; // Relativo para Netlify

  constructor(private http: HttpClient) { }

  getQuadros(): Observable<Quadro[]> {
    return this.http.get<Quadro[]>(this.apiUrl);
  }

  getQuadro(id: string): Observable<Quadro> {
    return this.http.get<Quadro>(`${this.apiUrl}/${id}`);
  }

  createQuadro(quadro: Quadro): Observable<Quadro> {
    return this.http.post<Quadro>(this.apiUrl, quadro);
  }

  updateQuadro(id: string, quadro: Quadro): Observable<Quadro> {
    return this.http.put<Quadro>(`${this.apiUrl}/${id}`, quadro);
  }

  deleteQuadro(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
