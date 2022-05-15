import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./features/login/login-routing.module').then(m => m.LoginRoutingModule)

    },
    {
      path: 'myProfile',
      loadChildren: () => import('./features/profile/profile-routing.module').then(m => m.ProfileRoutingModule)

    },
    {
      path: 'yourBuddy',
      loadChildren: () => import('./features/your-buddy/your-buddy-routing.module').then(m => m.YourBuddyRoutingModule)

    },
    {
      path: 'connections',
      loadChildren: () => import('./features/connections/connections-routing.module').then(m => m.ConnectionsRoutingModule)

    },
    {
      path: 'collegeNews',
      loadChildren: () => import('./features/college-news/college-news-routing.module').then(m => m.CollegeNewsRoutingModule)

    },
    {
      path: 'groups',
      loadChildren: () => import('./features/groups/groups-routing.module').then(m => m.GroupsRoutingModule)

    },
    {
      path: 'queries',
      loadChildren: () => import('./features/queries/queries-routing.module').then(m => m.QueriesRoutingModule)

    },
    {
      path: 'admin',
      loadChildren: () => import('./features/admin/admin-routing.module').then(m => m.AdminRoutingModule)

    },
    {
      path: 'register',
      loadChildren: () => import('./features/register/register-routing.module').then(m => m.RegisterRoutingModule)

    },
    {
      path: 'login',
      loadChildren: () => import('./features/login/login-routing.module').then(m => m.LoginRoutingModule)

    },
    {
      path: 'buddyFeedback',
      loadChildren: () => import('./features/feedback/feedback-routing.module').then(m => m.FeedbackRoutingModule)

    },
    {
      path: 'myMentee',
      loadChildren: () => import('./features/my-mentee/my-mentee-routing.module').then(m => m.MyMenteeRoutingModule)

    }
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
