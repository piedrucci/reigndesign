import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Article } from './article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  articles: Article;
  displayedColumns: string[] = ['title', 'created_at', 'author'];

  constructor(private dataProvider: AppService) {}

  ngOnInit() {
    const response = this.dataProvider.fetchData();
    response.subscribe((data: Article) => {
      this.articles = data;
    });
  }

  removeArticle(id) {
    alert(id);
  }
}
