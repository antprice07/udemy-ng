import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  //error = new Subject<string>();
  //if you subscribe here, you can this.error.next from here to your component
  url = "https://http-01-start-4232e-default-rtdb.firebaseio.com/";

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    return this.http.post(`${this.url}/posts.json`, postData, {
      observe: "response",
    });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(`${this.url}/posts.json`, {
        headers: new HttpHeaders({ "Custom-Header": "Hello" }),
        params: new HttpParams().set("print", "pretty")
      })
      .pipe(
        map((response) => {
          const postArray: Post[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              postArray.push({ ...response[key], id: key });
            }
          }
          return postArray;
        }),
        catchError((errorRes) => {
          //send to analytics server
          return throwError(errorRes);
        })
      );
  }

  clearPosts() {
    return this.http
      .delete(`${this.url}/posts.json`, {
        observe: "events",
        responseType: "text",
      })
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            //...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
