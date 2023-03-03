import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import Cliente from '../cliente';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors!: String[];
  id!: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {this.cliente = new Cliente();}

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.paramMap.get('id');
    if (params) {
      this.id = Number(params);
      this.service.getClientById(this.id)
      .subscribe({
        next: (response) => {
          this.cliente = response;
        },
        error: (error) => {
          this.cliente = new Cliente();
        }
      })
    }
  }

  onSubmit() {

    if (this.id) {

      this.service.atualizar(this.cliente)
      .subscribe(
        {
          next: (response) => {
            this.success = true;
            this.errors = [];
          },
          error: (error) => {
            this.success = false;
            this.errors = ['Erro ao atualizar o cliente.'];
          }
        }
      );

    } else {

      this.service.salvar(this.cliente)
        .subscribe(
          {
            next: (response) => {
              this.success = true;
              this.errors = [];
              this.cliente = response;
            },
            error: (error) => {
              this.success = false;
              this.errors = error.error.errors;
              console.log('Erro: ' + error.error);
            }
          }
        );
      }
  }

  voltarParaListagem() {
    this.router.navigate(['/clientes-lista']);
  }

}
