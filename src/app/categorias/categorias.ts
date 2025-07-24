import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';
import { Categoria } from '../../model/categoria';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [MatTableModule, RouterModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss'
})
export class Categorias implements OnInit{
  displayedColumns: string[] = ['nome', 'imageUrl', 'acao'];
  dataSource!: Categoria[];
  isLoadingResults = true;

  constructor( private api: ApiService){}

  ngOnInit() {
    this.api.getCategorias().subscribe(
      res => {
        this.dataSource = res;
        this.isLoadingResults = false;
        console.log('Categorias carregadas:', this.dataSource);
      }, err => {
        console.error('Erro ao carregar categorias:', err);
        this.isLoadingResults = false;
      }
    );
  }
}
