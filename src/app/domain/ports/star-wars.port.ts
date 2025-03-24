import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';
import { Film } from '../models/film.model';

export interface StarWarsPort {
  getFilms(page: number, search?: string): Observable<Film[]>;
  getFilmById(id: string): Observable<Film>;
  getCharacters(page: number, search?: string): Observable<Character[]>;
  getCharacterById(id: string): Observable<Character>;
}

export const STARWARS_PORT_TOKEN = new InjectionToken<StarWarsPort>(
  'StarWarsPort'
);
