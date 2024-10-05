import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editorial, Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit{
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

  constructor(
    private heroesServices: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const editHero = this.router.url.includes('edit');

    if(!editHero) return

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesServices.getHeroById( id )),
      ).subscribe( hero => {

        if(!hero) return this.router.navigateByUrl('/');

        this.heroForm.reset(hero)

        return

      })
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;

    return hero;
  }
  onSubmit(): void {
    if(this.heroForm.invalid) return;

    if( this.currentHero.id ){
      this.heroesServices.updateHero( this.currentHero )
        .subscribe( hero => {
          this.router.navigate(['heroes/', hero.id]);
          this.showSnackBar(`${hero.superheroe} actualizado!`);
        });

        console.log(this.currentHero)
        return;
    }

    // NOTE:  si se crea un nuevo superheroe, se setea el id con el nombre del superheroe
    this.currentHero.id = this.currentHero.superheroe;

    this.heroesServices.addHero( this.currentHero )
      .subscribe( hero => {
          this.router.navigate(['heroes/', hero.id]);
          this.showSnackBar(`${hero.superheroe} guardado!`)
        });

  }

  showSnackBar( message: string ): void {
    this.snackbar.open(message, 'Aceptar', {
      duration: 3000
    })
  }

}
