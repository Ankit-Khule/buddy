import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonComponentsModule } from './common/common-components.module';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './features/profile/profile/profile.component';
import { YourBuddyComponent } from './features/your-buddy/your-buddy/your-buddy.component';
import { ConnectionsComponent } from './features/connections/connections/connections.component';
import { ProfileDetailsComponent } from './layout/profile-details/profile-details.component';
import { ChatComponent } from './layout/chat/chat.component';
import { ProfileInfoComponent } from './layout/profile-info/profile-info.component'
import { CollegeNewsComponent } from './features/college-news/college-news/college-news.component';
import { GroupsComponent } from './features/groups/groups/groups.component';
import { QueriesComponent } from './features/queries/queries/queries.component';
import { AdminComponent } from './features/admin/admin/admin.component';
import { LoginComponent } from './features/login/login/login.component';
import { RegisterComponent } from './features/register/register/register.component';
import { FeedbackComponent } from './features/feedback/feedback/feedback.component';
import { MyMenteeComponent } from './features/my-mentee/my-mentee/my-mentee.component';

// const config: SocketIoConfig = { url: 'http://localhost:5000//', options: { transports: ['websocket'] } };

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProfileComponent,
    YourBuddyComponent,
    ConnectionsComponent,
    ProfileDetailsComponent,
    ChatComponent,
    ProfileInfoComponent,
    CollegeNewsComponent,
    GroupsComponent,
    QueriesComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    FeedbackComponent,
    MyMenteeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonComponentsModule,
    FormsModule,
    NgxUiLoaderModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    // SocketIoModule.forRoot(config)
  ],
  providers: [
    ProfileDetailsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
