import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/Produto';
import { map } from 'rxjs/operators';

@Injectable(
  { providedIn: 'root' }
)
export class ProdutoService {

  baseURL = 'https://localhost:5001/api/produtos';

  constructor(private http: HttpClient) { }

  public getAllProdutos() {
    return this.http.get<any>(this.baseURL)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  public getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseURL}/${id}`);
  }

}
