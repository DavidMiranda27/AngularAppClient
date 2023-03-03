import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import Cliente from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado!: Cliente;
  mensagemSucesso!: string;
  mensagemErro!: string;

  constructor(private service: ClientesService, private router: Router) { }

  ngOnInit(): void {
    this.service.getClientes()
      .subscribe(
        {
          next: (response) => {
            this.clientes = response;
          },
          error: (error) => {
            console.log(error);
          }
        }
      );
  }

  novoCadastro() {
    this.router.navigate(['/clientes-form']);
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletarCliente() {
    this.service.deletar(this.clienteSelecionado).subscribe(
      {
        next: (response) => {
          this.mensagemSucesso = 'Cliente deletado com sucesso!';
          this.ngOnInit();
        },
        error: (error) => {
          this.mensagemErro = 'Erro ao deletar o cliente.';
        }
      }
    )
  }

}
