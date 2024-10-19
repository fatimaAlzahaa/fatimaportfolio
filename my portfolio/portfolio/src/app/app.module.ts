import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ServicesComponent } from './services/services.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ManageProjectsComponent } from './manage-projects/manage-projects.component';
import { ManageServicesComponent } from './manage-services/manage-services.component';
import { aboutService } from '../services/about_services';
import { ProjectService } from '../services/project_sevices';
import { ServicesService } from '../services/services_services';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    ServicesComponent,
    LoginComponent,
    DashboardComponent,
    ManageProjectsComponent,
    ManageServicesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule


  ],
  // providers: [],
  bootstrap: [AppComponent],
  providers: [aboutService,ProjectService,ServicesService],

})
export class AppModule { }
