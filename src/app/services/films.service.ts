import { Injectable } from '@angular/core';

/* Http client */
import { HttpClient } from '@angular/common/http';

/* Enviroments */
import { environment } from 'src/environments/environment';


import { catchError, map, tap } from "rxjs/operators";


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  public url : string | undefined;
  public pelicula : any;
  public arrayPromesasPersonajes : any = [];
  public arrayPromesasNaves : any = [];
  public naves : any;
  public personaje : string | undefined;
  public arrayPromesasNombres : any;

  constructor( private http : HttpClient) 
  { }

  obtenerFilms()
  {
    console.log( 'Se llaman films de api');

    return this.http.get( `${ base_url}` )
                    
                      
  }

  crearPromesasPersonajes( arrayPersonajes : any)
  {
    /* Inicializamos el array de promesas */
    this.arrayPromesasPersonajes = [];
    console.log( arrayPersonajes );
    for ( let personaje of arrayPersonajes )
    {
      var temporal = this.http.get( personaje ).toPromise();
      this.arrayPromesasPersonajes.push( temporal );
    }

    /* Devolvemos el array de promesas */
    return this.arrayPromesasPersonajes


  }

  crearPromesasNaves( arrayNaves : any)
  {
    /* Inicializamos el array de promesas */
    this.arrayPromesasNaves = [];
    for ( let nave of arrayNaves )
    {
      var temporal = this.http.get( nave ).toPromise();
      this.arrayPromesasNaves.push( temporal );
    }

    return this.arrayPromesasNaves;
    
  }

  crearPromesasPeliculas( arrayPeliculas : any)
  {
    /* Inicializamos el array de promesas */
    this.arrayPromesasNombres = [];
    for ( let pelicula of arrayPeliculas )
    {
      var temporal = this.http.get( pelicula ).toPromise();
      this.arrayPromesasNombres.push( temporal );
    }

    return this.arrayPromesasNombres;
    
  }


  
}
