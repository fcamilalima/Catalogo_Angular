import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Categorias } from './categorias/categorias';
import { CategoriaNova } from './categoria-nova/categoria-nova';
import { CategoriaDetalhe } from './categoria-detalhe/categoria-detalhe';
import { CategoriaEditar } from './categoria-editar/categoria-editar';
import { Login } from './login/login';
import { Logout } from './logout/logout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CategoriaNova, CategoriaDetalhe, 
    CategoriaEditar, Categorias, Login, Logout, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'categorias';
}
