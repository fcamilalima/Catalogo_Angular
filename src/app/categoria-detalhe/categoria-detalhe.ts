import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Categoria } from '../../model/categoria';
import { ApiService } from '../../services/api';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria-detalhe',
  imports: [ CommonModule, MatIconModule, MatProgressSpinnerModule, 
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
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService){}

  ngOnInit(){
    this.api.getCategoria(this.route.snapshot.params['id']);
  }

  getCategoria(id: number){
    this.api.getCategoria(id).subscribe(data => {
      this.categoria = data;
      console.log('Categoria Detalhes: ' + this.categoria);
      this.isLoadingResults = false;
    });
  }
  deleteCategoria(id: number) {
    this.isLoadingResults = true;
    this.api.deleteCategoria(id).subscribe(res => {

    },
    (err) => {
      console.log(`Mensgem de erro: ${err}`);
      this.isLoadingResults = false;
      });
    alert('Categoria deletada: ' + id);
  }
}
