import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { Categoria } from '../../model/categoria';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-categoria-nova',
  standalone: true,
  templateUrl: './categoria-nova.html',
  styleUrls: ['./categoria-nova.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule]
})
export class CategoriaNova implements OnInit {
  categoriaForm!: FormGroup;
  nome: string = '';
  imageUrl: string = '';

  isLoadingResults = false;
  constructor(private router: Router, private api: ApiService,
    private formBuider: FormBuilder) { }

  ngOnInit() {
    this.categoriaForm = this.formBuider.group({
      'nome': [null, Validators.required],
      'imageUrl': [null, Validators.required]
    });
  }

  addCategoria() {
    this.isLoadingResults = true;
    this.api.addCategoria(this.categoriaForm.value).subscribe({
      next: (data: Categoria) => {
        const id = data['categoriaId'];
        this.isLoadingResults = false;
        this.router.navigate(['/categorias']);
        console.log('Adicionada a categoria com sucesso!');
      },
      error: (err) => {
        console.log('Erro ao adicionar a categoria!');
        this.isLoadingResults = false;
      }
    });
  }
}
