import { Component, OnInit } from '@angular/core';
import { FilmsService } from 'src/app/services/films.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styles: [
  ]
})
export class InformacionComponent implements OnInit {

  public pelicula : any;
  public personajes : any;

  constructor( private filmsService : FilmsService, private router : Router) 
  { }

  async ngOnInit() 
  {
    
    this.pelicula = this.filmsService.pelicula  || '';
    await this.listarData( this.pelicula );

  }

  async listarData( pelicula : any)
  {
    /* En caso de querer navegar a información sin haber hecho al menos un click en un enlace, debemos devolverlo a pagina de dashboard */
    console.log( pelicula );
    if ( pelicula == '')
    {
      this.router.navigateByUrl('/');
    } 
    else
    {
      /* Cargamos la información de los personajes de la pelicula */
      const arrayPromesas = this.filmsService.crearPromesasPersonajes( this.pelicula.characters );
      await Promise.all( arrayPromesas )
        .then( resp => {
          
          /* La respuesta contiene toda la información de todos los personajes */
          console.log( resp )

          /* Asignamos el valor a nuestro array de personajes */
          this.personajes = resp;

        })
    }

  }

  Naves( arrayNaves : any, personaje : string )
  {
    this.filmsService.personaje = personaje;
    console.log( arrayNaves );
    this.filmsService.naves =  arrayNaves;
    this.router.navigateByUrl( '/dashboard/naves' );
  }



}
