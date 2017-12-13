import { Injectable } from '@angular/core';
import {Book} from './book';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Http , Response} from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class BooksService {
  url:string =  'https://my-json-server.typicode.com/michmosh/'; 
  newUrl:string = 'http://fakerestapi.azurewebsites.net//api/Books';
  headers:HttpHeaders = new HttpHeaders().set( "Content-type","application/json; charset=UTF-8");
  data:Array<Book>;
  constructor(private http:HttpClient) {

   }

   getData(){
     return this.data;
   }
   getApiData(){
     return this.http.get(this.url + 'angular4_Books/books').map(res=>{  
       return this.setDataArray(res);
     })
   }
   setDataArray(data){
     data.map(item=>{
       item.imageUrlString = this.setImageUrlString(item);
     });
     return data;
   }
   setImageUrlString(data_item){
      return data_item.Title.replace(/\s/g, "");
   }
   addBook(book:Book){
     return this.http.post(this.url + 'angular4_Add/add',JSON.stringify(book),{headers:this.headers})
        .map(res=>{
            return res;
        });
   }

   updateBook(book:Book){
     book.id = 1;
     return this.http.post(this.url + 'angular4_Add/add',JSON.stringify(book),{headers:this.headers})
        .map(res=>{
            return res;
        })
   }
   deleteBook(book:Book){
     book.id = 1;
     return this.http.post(this.url + 'angular4_books/books',JSON.stringify(book),{headers:this.headers})
        .map(res=>{
            return res;
        })
   }

}
