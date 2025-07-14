import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Categorias } from './categorias/categorias';
import { CategoriaNova } from './categoria-nova/categoria-nova';
import { CategoriaDetalhe } from './categoria-detalhe/categoria-detalhe';
import { CategoriaEditar } from './categoria-editar/categoria-editar';
import { Login } from './login/login';
import { Logout } from './logout/logout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuComponent } from './menu/menu.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CategoriaNova, CategoriaDetalhe, 
    CategoriaEditar, Categorias, Login, Logout, RouterLink, 
    RouterLinkActive, MatButtonModule, MatCardModule, MatIconModule,
    MatInputModule, MatListModule, MatProgressSpinnerModule, MatSelectModule,
    MatSidenavModule, MatTableModule, MatToolbarModule, MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'categorias';
}

