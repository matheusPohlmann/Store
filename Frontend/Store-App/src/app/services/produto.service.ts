
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Produto } from '../models/Produto';

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

  public post(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.baseURL, produto);
  }

  public put(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.baseURL}/${id}`, produto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  postUpload(produtoId: number, file: File[]): Observable<Produto> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);


    return this.http
      .post<Produto>(`${this.baseURL}/upload-image/${produtoId}`, formData)
      .pipe(take(1));
  }

}
