import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Character } from '../../domain/models/character.model';
import { Film } from '../../domain/models/film.model';
import { StarWarsPort } from '../../domain/ports/star-wars.port';
import {
  SwapiCharacter,
  SwapiFilm,
  SwapiMultipleResponse,
  SwapiSingleResponse,
} from './swapi-response';

@Injectable({ providedIn: 'root' })
export class StarWarsApiService implements StarWarsPort {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  getFilms(): Observable<Film[]> {
    const url = `${this.baseUrl}/films`;
    return this.http.get<SwapiMultipleResponse<SwapiFilm>>(url).pipe(
      map((response) => {
        const filmsData = response.result ?? response.results ?? [];
        return filmsData.map((film) => this.mapFilm(film));
      })
    );
  }

  getFilmById(id: string): Observable<Film> {
    const url = `${this.baseUrl}/films/${id}`;
    return this.http
      .get<SwapiSingleResponse<SwapiFilm>>(url)
      .pipe(map((response) => this.mapFilm(response.result)));
  }

  getCharacters(page: number): Observable<Character[]> {
    const url = `${this.baseUrl}/people?page=${page}&limit=10&expanded=true`;
    return this.http.get<SwapiMultipleResponse<SwapiCharacter>>(url).pipe(
      map((response) => {
        const charsData = response.results ?? [];
        return charsData.map((char) => this.mapCharacter(char));
      })
    );
  }

  getCharacterById(id: string): Observable<Character> {
    const url = `${this.baseUrl}/people/${id}`;
    return this.http
      .get<SwapiSingleResponse<SwapiCharacter>>(url)
      .pipe(map((response) => this.mapCharacter(response.result)));
  }

  private mapFilm(apiFilm: SwapiFilm): Film {
    const props = apiFilm.properties;
    return {
      uid: apiFilm.uid,
      title: props.title,
      episode_id: +props.episode_id,
      opening_crawl: props.opening_crawl,
      director: props.director,
      producer: props.producer,
      release_date: props.release_date,
    };
  }

  private mapCharacter(apiChar: SwapiCharacter): Character {
    const props = apiChar.properties;
    return {
      uid: apiChar.uid,
      name: props.name,
      height: props.height,
      mass: props.mass,
      hair_color: props.hair_color,
      skin_color: props.skin_color,
      eye_color: props.eye_color,
      birth_year: props.birth_year,
      gender: props.gender,
      homeworld: props.homeworld,
      films: props.films || [],
      species: props.species || [],
      vehicles: props.vehicles || [],
      starships: props.starships || [],
    };
  }
}
