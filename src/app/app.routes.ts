import { Routes } from '@angular/router';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';

export const routes: Routes = [
  { path: 'clientes', component: ClienteListComponent },
  { path: 'produtos', component: ProdutoListComponent },
  { path: '', redirectTo: '/clientes', pathMatch: 'full' }
];