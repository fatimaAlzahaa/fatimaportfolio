// // src/app/app-routing.module.ts
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { AboutComponent } from './about/about.component';
// import { ServicesComponent } from './services/services.component';
// import { SkillsComponent } from './skills/skills.component';
// import { ProjectsComponent } from './projects/projects.component';
// import { ContactComponent } from './contact/contact.component';

// const routes: Routes = [
//   { path: '', component: HomeComponent }, // Home page as default
//   { path: 'about', component: AboutComponent },
//   { path: 'skills', component: SkillsComponent },
//   { path: 'projects', component: ProjectsComponent },
//   { path: 'services', component: ServicesComponent },
//   { path: 'contact', component: ContactComponent },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageProjectsComponent } from './manage-projects/manage-projects.component';
import { ManageServicesComponent } from './manage-services/manage-services.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  {path: 'login' , component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] }, // Protected dashboard
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Protected dashboard
  { path: 'manage-projects', component: ManageProjectsComponent}, // Protected projects management
  { path: 'manage-services', component: ManageServicesComponent }, // Protected skills management
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
