import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatTableModule, MatIconModule, MatListModule,
  MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ConfirmDialog } from './../dialog/dialog.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { DateFormatPipe } from './date-format.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DateFormatPipe,
    ConfirmDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialog]
})

export class AppModule { }
