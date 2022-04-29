import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/Produto';

@Injectable(
  // { providedIn: 'root' }
)
export class ProdutoService {

  baseURL = 'https://localhost:5001/api/produtos';

  constructor(private http: HttpClient) { }

  public getAllProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseURL);
  }

  public getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseURL}/${id}`);
  }

}
