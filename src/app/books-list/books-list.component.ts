import { Component, OnInit, TemplateRef } from '@angular/core';
import {Book} from '../book';
import {BooksService} from '../books.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
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
  modalRef: BsModalRef;
  constructor(private service:BooksService , private modalService: BsModalService) { }

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

  delete( index:number){
   this.data.splice(this.index,1);
   this.closeModal();
  }

  openModal(template: TemplateRef<any>,book:Book) {
    this.book = book;
    this.modalRef = this.modalService.show(template);
  }

  closeModal(){
     this.modalRef.hide();
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
