export class Book {
    Title:string; 
    Autuor:string;
    date:Date;
    imageUrlString?:string;
    id?:number;
    constructor(title:string, autuor:string, date:Date, imageUrlString ?:string,id?:number){
        this.Autuor = autuor;
        this.Title = title; 
        this.date = date;
    }
}
