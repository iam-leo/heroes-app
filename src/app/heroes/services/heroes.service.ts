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

  addHero( hero: Hero):Observable<Hero>{
    return this.http.post<Hero>(`${this.apiUrl}/heroes`, hero);
  }

  updateHero( hero: Hero):Observable<Hero>{
    if(!hero) throw Error('Hero id is required');

    return this.http.patch<Hero>(`${this.apiUrl}/heroes/${ hero.id }`, hero);
  }

  deleteHero( id: string ):Observable<boolean>{

    return this.http.delete(`${this.apiUrl}/heroes/${ id }`)
      .pipe(
        catchError( error => of(false)), //Error si no existe
        map( resp => true) //Registro eliminado correctamente
      )
  }
}
