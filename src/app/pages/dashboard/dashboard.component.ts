import { Component, OnInit } from '@angular/core';
import { FilmsService } from 'src/app/services/films.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public peliculas: any;

  constructor( private filmsService : FilmsService, private router : Router ) { }

  ngOnInit(): void {
    this.obtenerFilms();
  }

  obtenerFilms()
  {
    this.filmsService.obtenerFilms()
                     .subscribe( (res : any) => {

                      console.log( res );
                      
                      /* Asignamos la respuesta obtenida a la variable global de la clase */
                      this.peliculas = res.results;

                     })
  }

  masDetallesFilm( pelicula : any)
  {
    
    this.filmsService.pelicula = pelicula;
    localStorage.setItem( "pelicula", pelicula);
    /* Redireccionamos a nueva pagina con información del url */
    this.router.navigateByUrl('/dashboard/informacion');

  }

}
