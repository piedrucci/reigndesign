import { Component, OnInit, Inject } from '@angular/core';
import { AppService } from './app.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import { Article } from './article';
import { ConfirmDialog } from '../dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  articles: Article[];
  deleteAction = false;
  displayedColumns: string[] = ['title', 'created_at', 'author'];
  dialogRef: MatDialogRef<ConfirmDialog>;

  constructor(
    private dataProvider: AppService,
    public dialog: MatDialog
  ) { }

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

    this.dialogRef = this.dialog.open(ConfirmDialog, {
      width: '300px'
    });

    this.dialogRef.afterClosed().subscribe(acept => {
      if (acept) {
        const response = this.dataProvider.deleteArticle(id);
        response.subscribe((data: any) => {
          if (data.success) {
            this.articles = this.articles.filter((item: Article) => item._id !== id);
          }
        });
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
