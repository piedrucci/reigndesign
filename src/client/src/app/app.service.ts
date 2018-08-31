import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiEndPoint = 'http://localhost:3000/api/articles';
@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get(apiEndPoint);
  }

  deleteArticle(id) {
    return this.http.delete(`${apiEndPoint}/${id}`);
  }
}
