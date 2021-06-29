import { Component, OnInit } from '@angular/core';
import { FilmsService } from 'src/app/services/films.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-naves',
  templateUrl: './naves.component.html',
  styles: [
  ]
})
export class NavesComponent implements OnInit {

  public naves : any;
  nombrePiloto : string | undefined;
  public arrayNaves : any;
  contador = 0;

  constructor( private filmsService : FilmsService, private router : Router) 
  { 
    this.nombrePiloto = this.filmsService.personaje;
  }

  async ngOnInit() {
    /* Inicializamos los urls de las promesas */
    this.naves = this.filmsService.naves || '';

    if ( this.naves == '' || this.naves.length == 0)
    {
      this.router.navigateByUrl( '/' );
    }
    else
    {
      /* Creamos el array de promesas */
      const arrayPromesas = this.filmsService.crearPromesasNaves( this.naves );
      await Promise.all( arrayPromesas )
        .then( async resp => {
          this.contador = 0;
          console.log( resp );
          this.arrayNaves = resp;
          for ( let nave of this.arrayNaves)
          {

            await this.buscarNombres( nave.films );
          
          }

        });
    }

  }

  async buscarNombres( urlsPeliculas : any )
  {
    
    console.log( urlsPeliculas );
    const arrayPromesas = this.filmsService.crearPromesasPeliculas( urlsPeliculas );
    await Promise.all( arrayPromesas )
      .then( resp => {
        console.log( resp );
        this.arrayNaves[this.contador].nombrePeliculas = resp;
        this.contador++
      })
  }

}
