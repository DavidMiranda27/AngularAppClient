import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;
  liginError!: boolean;
  cadastrando!: boolean;

  constructor(
    private router: Router,
  ) { }

  onSubmit() {
    this.router.navigate(['/home']);
  }

  preparaCadastrar(event: any) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;
  }

}
