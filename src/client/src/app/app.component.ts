import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Article } from './article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  articles: Article[];
  deleteAction: boolean = false;
  displayedColumns: string[] = ['title', 'created_at', 'author'];

  constructor(private dataProvider: AppService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const response = this.dataProvider.getArticles();
    response.subscribe((data: any) => {
      this.articles = data.result;
    });
  }

  removeArticle(id) {
    this.deleteAction = true;
    const response = this.dataProvider.deleteArticle(id);
    response.subscribe((data: any) => {
      if (data.success) {
        this.articles = this.articles.filter((item: Article) => item._id !== id);
      }
    });
  }

  openLink(uri: string) {
    if (!this.deleteAction) {
      if (uri !== null) {
        window.open(uri, '_blank');
      } else {
        alert('Sorry, invalid URL, try another article');
      }
    }

    this.deleteAction = false;
  }
}
