import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList:Gif[] = []
  private _tagsHistory: string[] = [];
  private API_KEY_GIPHY:string = "BbjIyBJ6vfUlKo2TkyVt25cUvGRtOH3S";
  private serviceUrl:string = "https://api.giphy.com/v1/gifs"


  constructor( private http:HttpClient ) { }

  get tagsHistory(){
    return [...this._tagsHistory]
  }

  private organizeHistory(tag: string):void{

    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter(element => element !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);

  }


  searchTag(tag:string):void{

    if(tag.length === 0) return;

    this.organizeHistory(tag);

    /* fetch("https://api.giphy.com/v1/gifs/search?api_key=BbjIyBJ6vfUlKo2TkyVt25cUvGRtOH3S&q=valorant&limit=10")
    .then((response)=>{ return response.json() }
    ).then(data => console.log(data)); */


    const params = new HttpParams()
    .set('api_key',this.API_KEY_GIPHY)
    .set('limit', 10)
    .set('q',tag)

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`,{params: params})
    .subscribe( response =>{

      this.gifList = response.data;
      console.log({gifs:this.gifList})
    }
    )



  }


}
