import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProdutosComponent } from './component/produtos/produtos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProdutoService } from './services/produto.service';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/cart/cart.component';
import { FilterPipe } from './shared/filter.pipe';
import { ToastrModule } from 'ngx-toastr';
import { AdminComponent } from './component/admin/admin.component';
import { AdminListComponent } from './component/admin/admin-list/admin-list.component';
import { AdminDetailComponent } from './component/admin/admin-detail/admin-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    HeaderComponent,
    CartComponent,
    AdminComponent,
    AdminListComponent,
    AdminDetailComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      progressBar: true,

    }),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
