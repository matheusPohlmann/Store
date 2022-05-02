import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDetailComponent } from './component/admin/admin-detail/admin-detail.component';
import { AdminListComponent } from './component/admin/admin-list/admin-list.component';
import { AdminComponent } from './component/admin/admin.component';
import { CartComponent } from './component/cart/cart.component';
import { ParamDetailComponent } from './component/param/param-detail/param-detail.component';
import { ParamComponent } from './component/param/param.component';
import { ProdutosComponent } from './component/produtos/produtos.component';


const routes: Routes = [
  { path: 'produtos', component: ProdutosComponent },
  { path: 'param', redirectTo: 'param/detail' },
  {
    path: 'param',
    component: ParamComponent,
    children: [
      { path: 'detail', component: ParamDetailComponent }
    ]
  },
  { path: 'admin', redirectTo: 'admin/list' },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'detail/:id', component: AdminDetailComponent },
      { path: 'detail', component: AdminDetailComponent },
      { path: 'list', component: AdminListComponent },
    ],
  },
  { path: 'carrinho', component: CartComponent },
  { path: '', redirectTo: 'produtos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
