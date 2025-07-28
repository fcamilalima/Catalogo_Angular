import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api';
import { Categoria } from '../../model/categoria';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-categoria-editar',
  imports: [ CommonModule, ReactiveFormsModule, 
    MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  standalone: true,
  templateUrl: './categoria-editar.html',
  styleUrls: ['./categoria-editar.scss']
})
export class CategoriaEditar implements OnInit {
  categoriaId!: number;
  categoriaForm!: FormGroup;
  isLoadingResults = false;
  nome: String = '';
  imageUrl: String = '';


  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCategoria(this.route.snapshot.params['id']);
    this.categoriaForm = this.formBuilder.group({
      categoriaId: [null],
      nome: [null, Validators.required],
      imageUrl: [null, Validators.required]
    });
  }

  getCategoria(id: number) {
    this.api.getCategoria(id).subscribe({
      next: (data: Categoria) => {
        this.categoriaId = data.categoriaId;
        this.categoriaForm.setValue({
          categoriaId: data.categoriaId,
          nome: data.nome,
          imageUrl: data.imageUrl
        });
      },
      error: (err) => {
        console.error('Erro ao buscar categoria:', err);
      }
    });
  }

  updateCategoria() {
    this.isLoadingResults = true;
    this.api.updateCategoria(this.categoriaId, this.categoriaForm.value).subscribe({
      next: (data: Categoria) => {
        this.isLoadingResults = false;
        this.router.navigate(['/categoria-detalhe/', this.categoriaId]);
        console.log('Edição de categoria realizada com sucesso!');
      },
      error: (err: any) => {
        console.log('Erro de atualização de categoria: ', err);
        this.isLoadingResults = false;
      }
    });
  }
}