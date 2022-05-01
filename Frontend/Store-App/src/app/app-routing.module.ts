import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { ProdutosComponent } from './component/produtos/produtos.component';


const routes: Routes = [
  { path: 'produtos', component: ProdutosComponent },
  { path: 'carrinho', component: CartComponent },
  { path: '', redirectTo: 'produtos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
