import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/Produto';
import { CartService } from '@app/services/cart.service';
import { ProdutoService } from '@app/services/produto.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  public products: Produto[] = [];
  searchKey: string = "";
  modalRef?: BsModalRef;
  message?: string;
  public produtoId = 0;

  constructor(
    private productCompenent: ProdutoService,
    private cartService: CartService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  openModal(event: any, template: TemplateRef<any>, produtoId: number): void {
    event.stopPropagation();
    this.produtoId = produtoId;
    this.modalRef = this.modalService.show(
      template,
      {
        class: 'modal-sm',
        backdrop: 'static'
      }
    );
  }

  confirm(): void {
    this.modalRef?.hide();
    this.productCompenent.delete(this.produtoId).subscribe(
      (data: any) => {
        if (data.message === 'Deletado') {
          this.toastr.success('O Produto foi deletado com sucesso!', 'Deletado!');
          this.getProdutos();
        }
      },
      (error: any) => {
        this.toastr.error('Erro ao tentar deletar o produto', 'Erro');
      }
    )

  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

  ngOnInit() {
    this.getProdutos();

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  getProdutos() {
    this.productCompenent.getAllProdutos().subscribe(
      data => {
        this.products = data;
      }
    )
  }

  detailProduct(id: number): void {
    this.router.navigate([`admin/detail/${id}`]);
  }

}
