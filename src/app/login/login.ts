import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { Usuario } from '../../model/usuario';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'login',
  templateUrl: './login.html',
  standalone: true,
  imports: [
    MatButtonModule, MatToolbarModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule
  ],
})
export class Login implements OnInit{
  loginForm!: FormGroup;
  userName: String = '';
  password: String = '';
  dataSource!: Usuario;
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, 
    private formBuider: FormBuilder){}
ngOnInit(){
  this.loginForm = this.formBuider.group({
    'userName': [null, Validators.required],
    'password': [null, Validators.required]
});
}

addLogin(){
  this.isLoadingResults = true;
  this.api.Login(this.loginForm.value).subscribe({
    next: (res: Usuario) => {
      console.log('Login efetuado com sucesso');
      this.dataSource = res;
      localStorage.setItem('jwt', this.dataSource.token);
      this.isLoadingResults = false;
      this.router.navigate(['/categorias']);
  },
  
  error: (err: any) => {
    console.error(err);
    this.isLoadingResults = false;
  }
});
}

}

  