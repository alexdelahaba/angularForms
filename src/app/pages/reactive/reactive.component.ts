import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private validadoresService: ValidadoresService) {
    this.crearFormulario();
    this.cargarDatos();
    this.crearListeners();
  }

  ngOnInit(): void {
  }
  get nombreNoValido() {
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }
  get apellidoNoValido() {
    return this.formulario.get('apellido').invalid && this.formulario.get('apellido').touched;
  }
  get correoNoValido() {
    return this.formulario.get('correo').invalid && this.formulario.get('correo').touched;
  }
  get usuarioNoValido() {
    return this.formulario.get('usuario').invalid && this.formulario.get('usuario').touched;

  }
  get barrioNoValido() {
    return this.formulario.get('direccion.barrio').invalid && this.formulario.get('direccion.barrio').touched;
  }
  get ciudadNoValido() {
    return this.formulario.get('direccion.ciudad').invalid && this.formulario.get('direccion.ciudad').touched;
  }

  get pasatiempos() {
    return this.formulario.get('pasatiempos') as FormArray;
  }

  get pass1NoValido() {
    return this.formulario.get('pass1').invalid && this.formulario.get('pass1').touched;

  }
  get pass2NoValido() {
    const pass1 = this.formulario.get('pass1').value;
    const pass2 = this.formulario.get('pass2').value;
    return (pass1 === pass2) ? false : true;

  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validadoresService.noHerrera]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadoresService.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.formBuilder.group({
        barrio: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.formBuilder.array([])
    }, {
      validators: this.validadoresService.passwordsIguales('pass1', 'pass2'),
    });
  }


  crearListeners() {
    // this.formulario.valueChanges.subscribe(valor => {
    //   console.log(valor);
    // });

    // this.formulario.statusChanges.subscribe(valor => {
    //   console.log(valor);
    // });

    this.formulario.get('pass1').valueChanges.subscribe(valor => {
      console.log(valor);
    });
  }

  cargarDatos() {
    // this.formulario.setValue({
    this.formulario.reset({
      nombre: 'Juana',
      apellido: 'Perez',
      correo: 'jp@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        barrio: 'Triana',
        ciudad: 'Sevilla'
      }
    });

    ['Comer', 'Dormir'].forEach(valor => this.pasatiempos.push(this.formBuilder.control(valor)));
  }

  guardar() {
    if (this.formulario.invalid) {

      Object.values(this.formulario.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        }
        control.markAsTouched();
      });
      console.log(this.formulario);
    }
    this.formulario.reset({
      nombre: 'Reseteado'
    });
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.formBuilder.control('Nuevo elemento', Validators.required));
  }
  borrarPasatiempos(i: number) {
    this.pasatiempos.removeAt(i);
  }

}
