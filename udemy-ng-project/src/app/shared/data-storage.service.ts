import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  url = "https://udemy-ng-recipe-book-5d926-default-rtdb.firebaseio.com/recipes.json"

  constructor(private http: HttpClient) { }


}
