import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Param } from '../models/Param';

@Injectable({
  providedIn: 'root'
})
export class ParamService {

  baseURL = 'https://localhost:5001/api/Param';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Param> {
    return this.http.get<Param>(this.baseURL);
  }

  public put(id: number, param: Param): Observable<Param> {
    return this.http.put<Param>(`${this.baseURL}/${id}`, param);
  }

}
