import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  public produtos: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProdutos();
  }

  public getProdutos(): void {

    this.http.get('https://localhost:5001/api/produtos').subscribe(
      response => this.produtos = response,
      error => console.log(error)
    );
  }

}
