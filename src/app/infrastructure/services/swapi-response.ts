export interface SwapiBaseResponse {
  message: string;
  apiVersion: string;
  timestamp: string;
  support?: any;
  social?: any;
}

export interface SwapiSingleResponse<T> extends SwapiBaseResponse {
  result: T;
}

export interface SwapiMultipleResponse<T> extends SwapiBaseResponse {
  results?: T[];
  result?: T[];
  total_records?: number;
}

export interface SwapiFilm {
  uid: string;
  properties: {
    title: string;
    episode_id: string;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    url?: string;
    created?: string;
    edited?: string;
  };
}

export interface SwapiCharacter {
  uid: string;
  properties: {
    name: string;
    gender: string;
    skin_color: string;
    hair_color: string;
    height: string;
    eye_color: string;
    mass: string;
    homeworld: string;
    birth_year: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    url?: string;
    created?: string;
    edited?: string;
  };
}
