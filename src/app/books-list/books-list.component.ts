import { Component, OnInit } from '@angular/core';
import {Book} from '../book';
import {BooksService} from '../books.service';
@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  data:any;
  book:Book = {Title:'',Autuor:'',date:new Date()}
  index:number;
  error:string = '';
  constructor(private service:BooksService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.service.getApiData().subscribe(data=>{
      this.data = data;
    })
  }

  edit(book:Book,index:number){
    this.index = index;
    this.book = book;
  }

  delete(book:Book, index:number){
    this.index = index;
    this.book = book;
  }

  onEvent(event:any){
      switch(event.action){
        case 'delete':
          this.data.splice(this.index,1);
          return;
        case 'add':
            this.data.unshift(event.book);
            return;
        case 'edit':
          this.edit(event.book , this.index);
          if(event.book.Title !== "" && event.book.Autuor !== "" && event.book.date !== ""){
            this.book = event.book;
            this.data[this.index] =   this.book;
          }
      return;
    }
  }


}
