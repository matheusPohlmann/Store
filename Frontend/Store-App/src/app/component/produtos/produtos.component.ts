import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {

  public productList: any = [];
  public filterCategory: any
  searchKey: string = "";
  totalItem: any = [];
  constructor(private api: ProdutoService, private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getNumItemsOfCart();


    this.api.getAllProdutos().subscribe(
      data => {
        this.productList = data;
        this.filterCategory = data;
        this.productList.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.finalPrice });
          a.finalPrice = Math.round(a.finalPrice).toFixed(2);
        });
        console.log(this.productList)
      });

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  getNumItemsOfCart() {
    this.cartService.getProducts().subscribe(
      data => {
        this.totalItem = data;
      }
    )
  }

  addtocart(item: any) {
    let idProd = this.totalItem.findIndex((a: any) => a.id == item.id);
    if (idProd > -1) {
      this.totalItem[idProd].quantity += 1;
      this.totalItem[idProd].total = (this.totalItem[idProd].finalPrice * this.totalItem[idProd].quantity);
    }
    else {
      item.quantity = 1;
      this.cartService.addToCart(item);
    }

    this.toastr.success(item.name + " foi adicionado!");
  }

}
