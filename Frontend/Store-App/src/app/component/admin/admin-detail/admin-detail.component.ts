import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '@app/models/Produto';
import { ProdutoService } from '@app/services/produto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.scss']
})
export class AdminDetailComponent implements OnInit {

  produto = {} as Produto;
  form!: FormGroup;
  modeSave = 'post';
  imageURL = 'assets/upload.png';
  file: any;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private pdService: ProdutoService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.carregarProduto();
    this.validation();
  }

  public carregarProduto(): void {
    const produtoIdParam = this.router.snapshot.paramMap.get('id');
    if (produtoIdParam !== null) {

      this.modeSave = 'put';

      this.pdService.getProdutoById(+produtoIdParam).subscribe({
        next: (produto: Produto) => {
          this.produto = { ...produto };
          this.form.patchValue(this.produto);
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => { }
      });
    }
  }
  get modoEditar(): boolean {
    return this.modeSave === 'put';
  }

  public salvarAlteracao(): void {
    if (this.form.valid) {


      if (this.modeSave == 'post') {
        this.produto = { ...this.form.value };
        this.pdService.post(this.produto).subscribe(
          () => this.toastr.success('Produto salvo com sucesso!', 'Sucesso!'),
          (error: any) => {
            console.error(error);
            this.toastr.error('Erro ao tentar salvar produto', 'Erro');
          }
        );
      } else {
        this.produto = { id: this.produto.id, ...this.form.value };
        this.pdService.put(this.produto.id, this.produto).subscribe(
          () => this.toastr.success('Produto atualizado com sucesso!', 'Sucesso!'),
          (error: any) => {
            console.error(error);
            this.toastr.error('Erro ao tentar atualizar produto', 'Erro');
          }
        );
      }
    }
  }

  public validation(): void {
    this.form = this.fb.group({
      name: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50)
        ]],
      price: ['', Validators.required],
      description: ['',
        [
          Validators.required,
          Validators.maxLength(200)
        ]]
    });
  }

  onFileChange(env: any): void {
    const reader = new FileReader();

    reader.onload = (produto: any) => this.imageURL = produto.target.result;

    this.file = env.target.files;
    reader.readAsDataURL(this.file[0]);

    this.uploadImage();
  }

  uploadImage(): void {
    this.pdService.postUpload(this.produto.id, this.file).subscribe(
      () => {
        this.carregarProduto();
        this.toastr.success('Imagem atualizada com sucesso!', 'Sucesso!');
      },
      (error: any) => {
        this.toastr.error('Erro ao fazer upload', 'Erro');
        console.log(error);
      },
    )
  }

}
