import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { FormBuilder, FormGroup, NgForm} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'logout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './logout.html',
  styleUrl: './logout.scss'
})
export class Logout implements OnInit {
  logoutForm!: FormGroup;
  isLoadingResults = false;
  constructor(private router: Router, 
    private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit(){
    this.logoutForm = this.formBuilder.group({});
  }

  addLogout() {
    localStorage.removeItem('jwt');
    console.log('Logout efetuado com sucesso!');
    this.isLoadingResults = true;
    this.router.navigate(['/login']);
    console.log('Login efetuado com sucesso');
  }
}
