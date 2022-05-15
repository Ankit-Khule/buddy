import { Component, OnInit } from '@angular/core';
import { dataService } from './../../../services/data.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedback : any = {
    studentid : null,
    answer1 : null,
    answer2 : null,
    answer3 : null,
    answer4 : null,
    answer5 : null,
    answer6 : null,
    answer7 : null
  }

  data: any;

  constructor(
    private dataService : dataService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService
  ) { 
    this.dataService.userInfo$.subscribe(userData => {
      this.data = userData;
    });
  }

  ngOnInit(): void {
    this.feedback.studentid = this.data.id;
  }

  saveFeedback(feedback : any){
    this.ngxService.startLoader("loader-feedback-form"); 
    this.dataService.saveFeedback(feedback).subscribe(response => {
      let feedbackResponse : any = response;
      if (feedbackResponse) {
        this.ngxService.stopLoader("loader-feedback-form");
        this.toastr.success(feedbackResponse);
      }
    });
  }

}
