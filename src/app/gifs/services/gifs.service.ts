import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] = [];
  private apiKey: string = '8sdK0fiH965n0zAH0YBrT01BdifxquTO';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  public resultados: any[] = [];

  get historial() {

    return [...this._historial];
  }

  constructor(private http: HttpClient ) {
    if(localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
      //this._historial = JSON.parse(localStorage.getItem('resultados')!);
    }
  }

  buscarGifs(query: string) {
  if( query.trim().length === 0) {
    return ;
  }

  const params = new HttpParams()
  .set('api_key', this.apiKey)
  .set('limit', '10')
  .set('q', query);

  console.log(params.toString());

  if(!this._historial.includes(query.toLowerCase())){
    this._historial.unshift(query);
    this._historial = this._historial.splice(0,10);

    localStorage.setItem('resultados', JSON.stringify(this.resultados));
  }

  this.http.get<SearchGifResponse>(`${this.servicioUrl}/search`, {params: params})
    .subscribe( (resp: SearchGifResponse) => {
      console.log(resp.data);
      this.resultados = resp.data;
    })

  }


}
