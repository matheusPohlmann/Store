import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/Produto';
import { CartService } from 'src/app/services/cart.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal: number = 0;
  modalRef?: BsModalRef;
  message?: string;

  constructor(private cartService: CartService, private toastr: ToastrService, private modalService: BsModalService, private router: Router) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', backdrop: 'static' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef?.hide();
    this.toastr.success("Parabéns! Compra realizada com sucesso!");
    this.cartService.removeAllCart();
    this.router.navigate([`produtos`]);
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

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
