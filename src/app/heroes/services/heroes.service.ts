import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private apiUrl: string = environments.baseUrl

  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.apiUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero | undefined>(`${this.apiUrl}/heroes/${id}`)
      .pipe(
        catchError( error =>  of(undefined) )
      )
  }

  getSuggestions(query: string): Observable<Hero[]> {
  return this.http.get<Hero[]>(`${this.apiUrl}/heroes`).pipe(
    map((heroes: Hero[]) => {
      return heroes.filter(hero => 
        hero.superheroe.toLowerCase().includes(query.toLowerCase()) // Filtrado local en el frontend
      );
    }),
    catchError(() => of([])) // Manejar errores devolviendo un array vacío
  );
}

}
