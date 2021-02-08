import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.model";
import { PostsService } from "./posts.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private postSvc: PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postSvc
      .createAndStorePost(postData.title, postData.content)
      .subscribe((res) => {
        console.log(res);
        this.onFetchPosts();
      });
  }

  onFetchPosts() {
    this.error = null;
    this.isFetching = true;
    this.postSvc.fetchPosts().subscribe((res) => {
      this.isFetching = false;
      this.loadedPosts = res;
    }, error => {
      this.error = error.message;
      console.log(error);
    });
  }

  onClearPosts() {
    this.postSvc.clearPosts().subscribe(res => {
      this.loadedPosts = [];
    });
  }
}
