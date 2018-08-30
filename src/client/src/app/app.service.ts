import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get('http://localhost:3000/api/articles');
  }

  deleteArticle(id) {
    return this.http.delete(`http://localhost:3000/api/articles/${id}`);
  }
}
