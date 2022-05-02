import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Param } from '@app/models/Param';
import { ParamService } from '@app/services/param.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-param-detail',
  templateUrl: './param-detail.component.html',
  styleUrls: ['./param-detail.component.scss']
})
export class ParamDetailComponent implements OnInit {

  form!: FormGroup;
  param = {} as Param;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private paramService: ParamService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.carregarParametro();
    this.validation();
  }

  public carregarParametro(): void {
    this.paramService.getAll().subscribe(
      data => {
        this.param = data;
        this.form.patchValue(this.param);
      }
    )
  }

  public salvarAlteracao(): void {
    if (this.form.valid) {
      this.param = { id: this.param.id, ...this.form.value };
      this.paramService.put(this.param.id, this.param).subscribe(
        () => {
          this.toastr.success('Produto atualizado com sucesso!', 'Sucesso!');
          this.router.navigate([`produtos`]);
        },
        (error: any) => {
          console.error(error);
          this.toastr.error('Erro ao tentar atualizar produto', 'Erro');
        }
      );
    }
  }

  public resetForm(): void {
    this.router.navigate([`produtos`]);
  }

  public validation(): void {
    this.form = this.fb.group({
      margemLucroPrcnt: ['', Validators.required],
      despesasTotais: ['', Validators.required],
    });
  }

}
