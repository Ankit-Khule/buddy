import { Component, OnInit} from '@angular/core';
import { dataService } from './../../../services/data.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-college-news',
  templateUrl: './college-news.component.html',
  styleUrls: ['./college-news.component.css']
})
export class CollegeNewsComponent implements OnInit {

  collegeNews: any = [{
    heading : '',
    author : '',
    date : '',
    content : ''
  }];

  student: any = {
    "email": null, 
    "id": null, 
    "username": ""
  }

  selectedNews: any = [{
    heading : '',
    author : '',
    date : '',
    content : ''
  }];

  constructor(
    private dataService : dataService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService
  ) { 
    this.dataService.userInfo$.subscribe(userData => {
      let data: any = userData;
      this.student = data;
      if(this.student == null || this.student == undefined){
        this.student = {
          "email": null, 
          "id": null, 
          "username": ""
        }
      }
    });
  }

  ngOnInit(): void {
  this.getCollegeNews();
  }

  getCollegeNews(){
     this.ngxService.startLoader("loader-get-collegenews"); 
     this.dataService.getCollegeNews().subscribe( response => {
        this.collegeNews = response;
        this.ngxService.stopLoader("loader-get-collegenews"); 
     });
  }

  updateNews(news : any){
    this.dataService.updateNews(news).subscribe( response => {
       let updatedNews: any = response;
       this.collegeNews.forEach((news: any) => {
         if(news.id === updatedNews.id){
            news = updatedNews;
         }
       });
       this.toastr.success("News is updated successfully.");
    });
  }

  deleteNews(news : any){
    this.dataService.deleteNews(news).subscribe( response => {
      let updatedNews: any = response;
      this.collegeNews.forEach((element: any) => {
        if(element.news_id === news.news_id){
          const isItem = (element: any) => element.news_id === news.news_id;
          let index = this.collegeNews.findIndex(isItem);
          this.collegeNews.splice(index,1);
        }
      });
      this.toastr.success("News is deleted successfully.");
   });
  }

  selectCurrentNews(currentNews: any){
    this.selectedNews = currentNews;
  }

}
