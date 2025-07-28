import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Categoria } from '../../model/categoria';
import { ApiService } from '../../services/api';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria-detalhe',
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule,
    MatCardModule, RouterModule],
  standalone: true,
  templateUrl: './categoria-detalhe.html',
  styleUrl: './categoria-detalhe.scss'
})

export class CategoriaDetalhe {
  isLoadingResults = true;
  categoria = {
    categoriaId: 0,
    nome: '',
    imageUrl: ''
  };

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.params['id']);
    if(id){
      // console.log('Número da Categoria: ' + this.route.snapshot.params['id']);
      //this.api.getCategoria(this.route.snapshot.params['id']);
      this.getCategoria(id);
    } else{
      this.isLoadingResults = false;
      alert('ID de categoria inválido!');
    }
  }

  getCategoria(id: number) {
    this.api.getCategoria(id).subscribe({
      next: (data: Categoria) => {
        this.categoria = data;
        this.isLoadingResults = false;
      },
      error: (err) => {
        console.error('Erro ao obter detalhes da categoria: ', err);
        this.isLoadingResults = false;
        alert('Erro ao obter detalhes da categoria: ' + id);
      }
    });
  }
  deleteCategoria(id: number) {
    this.isLoadingResults = true;
    this.api.deleteCategoria(id).subscribe({
      next: (data: Categoria) => {
        console.log(`Categoria deletada: ${id}`);
        this.router.navigate(['/categorias']);
        this.isLoadingResults = false;
      },
      error: (err) => {
        console.log(`Mensagem de erro: ${err}`);
        this.isLoadingResults = false;
        alert('Categoria deletada: ' + id);
      }
    });
  }
}
