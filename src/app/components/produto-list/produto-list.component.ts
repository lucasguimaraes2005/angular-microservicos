import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto.model';
import { ProdutoFormComponent } from '../produto-form/produto-form.component';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent implements OnInit {
  produtos: Produto[] = [];
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'preco', 'quantidade', 'acoes'];
  searchTerm: string = '';

  constructor(
    private produtoService: ProdutoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(): void {
    this.produtoService.findAll().subscribe(data => {
      this.produtos = data;
    });
  }

  search(): void {
    if (this.searchTerm.trim()) {
      this.produtoService.findByNome(this.searchTerm).subscribe(data => {
        this.produtos = data;
      });
    } else {
      this.loadProdutos();
    }
  }

  openDialog(produto?: Produto): void {
    const dialogRef = this.dialog.open(ProdutoFormComponent, {
      width: '400px',
      data: produto || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProdutos();
        this.snackBar.open('Operação realizada com sucesso!', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  deleteProduto(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.delete(id).subscribe(() => {
        this.loadProdutos();
        this.snackBar.open('Produto excluído com sucesso!', 'Fechar', {
          duration: 3000
        });
      });
    }
  }
}