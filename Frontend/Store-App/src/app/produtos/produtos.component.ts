import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  public produtos: any = [];
  public produtosFiltereds: any = [];
  private _filter: string = '';

  public get filter() {
    return this._filter;
  }

  public set filter(value: string) {
    this._filter = value;
    this.produtosFiltereds = this.filter ? this.filterProducts(this.filter) : this.produtos;
  }

  filterProducts(filterFor: string): any {
    filterFor = filterFor.toLocaleLowerCase();
    return this.produtos.filter(
      (x: any) => x.name.toLocaleLowerCase().indexOf(filterFor) !== -1
    );
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProdutos();
  }

  public getProdutos(): void {

    this.http.get('https://localhost:5001/api/produtos').subscribe(
      response => {
        this.produtos = response;
        this.produtosFiltereds = this.produtos;
      },
      error => console.log(error)
    );
  }

}
