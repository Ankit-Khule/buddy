import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Constants } from './../app-constants';

@Injectable({
  providedIn: 'root'
})
export class dataService {

  student$ = new BehaviorSubject(null);
  userInfo$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

//   public uploadProfileImage(image: File): Observable<Response> {
//     const formData = new FormData();

//     formData.append('image', image);

//     return this.http.post('/api/student/upload-profile-picture', formData);
//   }

addStudentInfo(student: any){
  this.student$.next(student);
  return this.http.post(Constants.url +'saveProfile', student);
}

updateProfile(student: any){
  this.student$.next(student);
  return this.http.put(Constants.url + 'updateProfile?id='+ student.studentid, student);
}

getStudentInfo(id: any){
  return this.http.get(Constants.url + 'getProfile?id='+ id);
}

updateStudentInfo(student: any){
  this.student$.next(student);
}

getUnassignedBuddies(){
  return this.http.get(Constants.url + 'getUnassignedBuddys');
}

getYourAssignedBuddy(id: any){
  return this.http.get(Constants.url + 'getYourAssignedBuddy?id='+ id);
}

getConnections(student: any){
  return this.http.get(Constants.url + 'getConnections?module=' + student.module +'&startdate=' + student.startdate);
}

getCollegeNews(){
  return this.http.get(Constants.url + 'getCollegeNews');
}

postNews(news: any){
  return this.http.post(Constants.url + 'postCollegeNews', news);
}

updateNews(news: any){
  return this.http.put(Constants.url + 'updateCollegeNews?news_id='+ news.news_id, news);
}

deleteNews(news: any){
  return this.http.delete(Constants.url + 'deleteCollegeNews?news_id='+ news.news_id);
}

registerNewUser(user: any){
  return this.http.post(Constants.url + 'register', user);
}

loginUser(user: any){
  return this.http.post(Constants.url + 'login', user);
}

saveUserLoginInfo(user: any){
  this.userInfo$.next(user);
}

saveFeedback(feedback: any){
  return this.http.post(Constants.url + 'buddyFeedback', feedback);
}

getMessages(messagers_id: any){
  return this.http.get(Constants.url + 'getMessages?messagers_id=' + messagers_id);
}

sendMessages(messageBody: any){
  return this.http.post(Constants.url + 'sendMessages', messageBody);
}
 
}