import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksService } from './books.service';
import { BookFormComponent } from './book-form/book-form.component';
import { FormsModule ,ReactiveFormsModule }   from '@angular/forms';
import { TitlePipePipe } from './title-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookFormComponent,
    TitlePipePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
