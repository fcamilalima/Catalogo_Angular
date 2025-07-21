import { Routes } from '@angular/router';
import { Categorias } from './categorias/categorias';
import { CategoriaNova } from './categoria-nova/categoria-nova';
import { CategoriaDetalhe } from './categoria-detalhe/categoria-detalhe';
import { CategoriaEditar } from './categoria-editar/categoria-editar';
import { Login } from './login/login';  
import { Logout } from './logout/logout';

export const routes: Routes = [
    {
        path: 'login',
        component: Login,
        data: { title: 'Login' }
    },
    {
        path: 'logout',
        component: Logout,
        data: { title: 'Logout' }
    },
    {
        path: 'categorias',
        component: Categorias,
        data: { title: 'Lista de Categorias' }
    },
    {
        path: 'categoria-detalhe/:id',
        component: CategoriaDetalhe,
        data: { title: 'Detalhe da Categoria' }
    },
    {
        path: 'categoria-nova',
        component: CategoriaNova,
        data: { title: 'Adicionar Categoria' }
    },
    {
        path: 'categoria-editar/:id',
        component: CategoriaEditar, 
        data: { title: 'Editar a Categoria' }
    },
    {
        path: '',
        redirectTo: '/categorias',  
        pathMatch: 'full'
    }
];
