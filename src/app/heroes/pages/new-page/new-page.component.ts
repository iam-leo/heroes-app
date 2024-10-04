import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editorial } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent {
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superheroe: new FormControl<string>('', { nonNullable:true }), //Siempre va a ser un string
    editorial: new FormControl<Editorial>( Editorial.MarvelComics ),
    alter_ego: new FormControl<string>(''),
    primera_aparicion: new FormControl<string>(''),
    personajes: new FormControl<string>(''),
    alt_image: new FormControl<string>(''),
  });

  public publishers = [
    { id: 'Dc Comics', value: 'DC - Comics' },
    { id: 'Marvel Comics', value: 'Marvel - Comics' },
  ]

  constructor() { }

  onSubmit(): void {
    console.log( {
      formIsValid: this.heroForm.valid,
      value: this.heroForm.value
    })
  }

}
