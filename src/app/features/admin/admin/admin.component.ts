import { Component, OnInit } from '@angular/core';
import { dataService } from './../../../services/data.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  news : any = {
    heading : null,
    content : null,
    author : null,
    dateofnews : null
  }

  constructor(
    private dataService : dataService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService
  ) { 
  }

  ngOnInit(): void {
  }

  postNews(news: any){
    this.ngxService.startLoader("loader-post-news"); 
    this.dataService.postNews(news).subscribe(response => {
      if (response) {
        this.ngxService.stopLoader("loader-post-news");
        this.toastr.success("News is posted successfully.");
      }
    });
  }

}
