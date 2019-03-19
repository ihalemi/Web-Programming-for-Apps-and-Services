import { Injectable } from '@angular/core';
import { Position } from './position';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PositionService {
  url = "https://quiet-crag-62906.herokuapp.com/";

  constructor(private http: HttpClient) { }

  getPositions() : Observable<Position[]> {
    return this.http.get<Position[]>(this.url+ "positions");
  }
}
