import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/Produto';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal: number = 0;

  constructor(private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit() {
    this.cartService.getProducts().subscribe(
      data => {
        this.products = data;
        this.grandTotal = this.cartService.getTotalPrice();
      }
    )
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
    this.toastr.info(item.name + " deletado!");
  }

  emptyCart() {
    this.cartService.removeAllCart();
    this.toastr.info("Carrinho esvaziado!");
  }


}
