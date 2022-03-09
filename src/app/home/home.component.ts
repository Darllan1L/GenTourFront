import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tipos } from '../model/Tipos';
import { Turismo } from '../model/Turismo';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { TipoService } from '../service/tipo.service';
import { TurismoService } from '../service/turismo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  tipo: Tipos = new Tipos();
  listaTipos: Tipos[];
  idTipos: number

  usuario: Usuario = new Usuario();
  idUsuario = environment.id

  turismo: Turismo = new Turismo();
  listaTurismo: Turismo[]

  constructor(
    private router: Router, 
    private turismoService: TurismoService, 
    private tipoService: TipoService, 
    private authService: AuthService) { 
  }

  ngOnInit() {
    if (environment.token == '') {
      alert('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }
  }
  getAllTipos(){
    this.tipoService.getAllTipo().subscribe((resp: Tipos[])=>{
      this.listaTipos = resp
    })
  }
  findTiposById(){
    this.tipoService.getByIdTipo(this.idTipos).subscribe((resp: Tipos)=>{
      this.tipo = resp
    })
  }
  getAllTurismos(){
    this.turismoService.getAllTurismo().subscribe((resp: Turismo[])=>{
      this.listaTurismo = resp
    })
  }
  findUsuarioById(){
    this.authService.getUsuarioById(this.idUsuario).subscribe((resp: Usuario)=>{
      this.usuario = resp
    })
  }
  cadastrar(){
    this.tipo.id = this.idTipos
    this.turismo.tipo = this.tipo

    this.usuario.id = this.idUsuario
    this.turismo.usuario = this.usuario

    this.turismoService.postTurismo(this.turismo).subscribe((resp: Turismo)=>{
      this.turismo = resp
    alert('Cadastrado com sucesso! 🏖')
    this.turismo = new Turismo()
    this.getAllTurismos()
    })
  }
}
