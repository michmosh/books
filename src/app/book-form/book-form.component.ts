import { Component, OnInit, Input ,OnChanges ,SimpleChanges ,Output ,EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import {Book} from '../book';
import {BooksService} from '../books.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  form_title:string= "Add Book";
  form_button:string = "Add";
  form_type:string = "add";
  myForm:FormGroup;
  autuorError:string;
  dateError:string;
  titleError:string;
  @Input() editBook:Book;
  @Input() index:number;
  @Input() data:any[];
  @Output() event:EventEmitter<any> = new EventEmitter<any>();
    constructor(private fb: FormBuilder , private service:BooksService) {
      this.myForm = fb.group({
        Title:[null,Validators.required],
        Autuor:[null , Validators.compose([Validators.required , Validators.minLength(5) , Validators.maxLength(15)])],
        date:[null , Validators.compose([Validators.required])]
      })
  }

  ngOnInit() {
  }
  
  ngOnChanges(changes:SimpleChanges){
    if(changes['editBook'] && !changes['editBook'].firstChange){
      if(changes['editBook'].currentValue.Title !== "" && changes['editBook'].currentValue.Autuor !== ""  ){
         this.changeForm('edit');
      }
    }
  }

  addBook(form,modal){
    if( this.checkExistingTitle(form) && form.touched && form.status == "VALID" ){
      let book = {
          Title:form.value.Title , 
          Autuor : form.value.Autuor,
          date:form.value.date,
          id:1, 
          imageUrlString : this.service.setImageUrlString(form.value)
        };
        this.service.addBook(book).subscribe(data=>{
          this.event.emit({book:data,action:'add'});
          this.closeModal(modal);
        })
    }else{
      this.showHideErrorMsg(form);
    }
  }

  updateBook(form,modal){
	  if(form.touched){
		  form = this.setBookValues(form);
		  if(this.validateBook(form) && this.checkExistingTitle(form)){
          this.editBook = form.value;
          this.editBook.imageUrlString = this.service.setImageUrlString(this.editBook);
          this.service.updateBook( this.editBook).subscribe(data=>{
            this.event.emit({book:this.editBook,action:'edit'});
            this.closeModal(modal);
          })
        
         
			}else{
        this.showHideErrorMsg(form);
      }
	  }else{
		  this.showHideErrorMsg(form);
	  } 
  }

  delete(form){
    this.service.deleteBook(this.editBook).subscribe(data=>{
      this.event.emit({book:this.editBook,action:'delete'});
	    this.myForm.reset();
    })
	  
  }

  validateBook(form){
	  let valid = false; 
	  if((form.get('Title').valid || (form.value.Title!== null || "")) &&
	  	 (form.get('Autuor').valid || (form.value.Autuor!== null || "") ) &&
		 (form.get('date').valid || (form.value.date!== null || "") ) ){
		 valid = true;
	  }
	  return valid;
  }

  setBookValues(form){
    form.value.Title = form.get('Title').valid ?  form.value.Title : this.editBook.Title;
    form.value.Autuor = form.get('Autuor').valid ?  form.value.Autuor : this.editBook.Autuor;
    form.value.date = form.get('date').valid ?  form.value.date : this.editBook.date;
    return form;
  }

  changeForm(type:string){
    if(type=="edit"){
        this.form_title = "Edit Book";
        this.form_button = "Edit";
        this.form_type="edit";
    }else if(type=="add"){
        this.form_title = "Add Book";
        this.form_button = "Add";
        this.form_type="add";
        this.editBook = {Title:'' , Autuor: '' , date: new Date()};
        this.event.emit(this.editBook);
    }
  }

  showHideErrorMsg(form){
    if(this.titleError !== "title already exists") this.titleError = form.get('Title').valid ? '' : "Title is required";
    this.autuorError = form.get('Autuor').valid ? '' : "Autuor is required and must be at least 5 chars";
    this.dateError = form.get('date').valid ? '' : "Date s required";
  }

  checkExistingTitle(form:any){
    let valid = true;
    this.data.map( item =>{
        if(item.Title.toLowerCase() === form.value.Title.toLowerCase() && this.index !== this.data.indexOf(item)){
          valid = false;
          this.titleError = "title already exists";
        }
    });
    return valid;
  }

  closeModal(modal){
    this.titleError = '';
    this.autuorError = '';
    this.dateError = '';
    modal.click();
  }
 
}
