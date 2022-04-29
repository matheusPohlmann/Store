import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/Produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
  // providers: [ProdutoService]
})
export class ProdutosComponent implements OnInit {

  public produtos: Produto[] = [];
  public produtosFiltereds: Produto[] = [];
  private _filter: string = '';

  public get filter() {
    return this._filter;
  }

  public set filter(value: string) {
    this._filter = value;
    this.produtosFiltereds = this.filter ? this.filterProducts(this.filter) : this.produtos;
  }

  public filterProducts(filterFor: string): Produto[] {
    filterFor = filterFor.toLocaleLowerCase();
    return this.produtos.filter(
      (x: any) => x.name.toLocaleLowerCase().indexOf(filterFor) !== -1
    );
  }

  constructor(private produtoService: ProdutoService) { }

  public ngOnInit(): void {
    this.getProdutos();
  }

  public getProdutos(): void {

    this.produtoService.getAllProdutos().subscribe({
      next: (data: Produto[]) => {
        this.produtos = data;
        this.produtosFiltereds = this.produtos;
      },
      error: (error: any) => console.log(error)
    });
  }

}
