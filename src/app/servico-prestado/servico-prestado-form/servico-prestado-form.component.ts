import { Component, OnInit } from '@angular/core';
import Cliente from 'src/app/clientes/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { ServicoPrestado } from '../servicoPrestado';
import { ServicoPrestadoService } from 'src/app/services/servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servicoPrestado: ServicoPrestado;
  success: boolean = false;
  errors!: String[];

  constructor(
    private clienteService: ClientesService,
    private servicoPrestadoService: ServicoPrestadoService) {
    this.servicoPrestado = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.clienteService.getClientes()
      .subscribe(response => this.clientes = response);
  }

  onSubmit() {
    this.servicoPrestadoService.salvar(this.servicoPrestado)
      .subscribe({
        next: (response) => {
          this.success = true;
          this.errors = [];
          this.servicoPrestado = new ServicoPrestado();
        },
        error: (response) => {
          this.success = false;
          this.errors = response.error.errors;
        }
      }
      )
  }
}
