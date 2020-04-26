import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  paises: any[] = [];
  usuario = {
    nombre: 'juana',
    apellido: 'perez',
    email: 'a@a.com',
    pais: 'CRI',
    genero: ''
  };

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe( paises => {
      this.paises = paises;
      this.paises.unshift({
        nombre: '[Seleccione su país]',
        codigo: ''
      });
    });
  }


  guardar(formulario: NgForm) {
    console.log(formulario);
    console.log(formulario.value);
    if (formulario.invalid) {

      Object.values(formulario.controls).forEach(control => {
        control.markAsTouched();
      });

      return;
    }
  }
}
