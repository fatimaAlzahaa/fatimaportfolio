import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { aboutService } from '../../services/about_services';
import { ProjectService } from '../../services/project_sevices';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  AllAbout: any[] = [];
  myForm: FormGroup = new FormGroup({});

  constructor(
    private _aboutService: aboutService,

    private formBuilder: FormBuilder
  ){}
  ngOnInit(): void {
    this.getAbout();
    this.initializeForm();

  }
  initializeForm() {
    this.myForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      currentWork: ['', Validators.required],
      skillsTitle: ['', Validators.required],
      skills: ['', Validators.required],
      resumeText: ['', Validators.required]
    });
  }

  // About section
  AboutUrl: string = 'http://localhost:3000/api/about/';  // المسار الثابت أو المطلق

  getImageAboutPath(image: string): string {
    return this.AboutUrl + image;
  }

  // getAbout(){
  //   this._aboutService.getAbout().subscribe((res) => {
  //     this.AllAbout = res;
  //     console.log(res);
  //     console.log(this.AllAbout);


  //   });

  // }
  getAbout(){
    this._aboutService.getAbout().subscribe((res) => {
      if (Array.isArray(res)) {
        this.AllAbout = res;
      } else {
        this.AllAbout = [res]; // Wrap the single object in an array
      }
      console.log(this.AllAbout);
    },(err) => {
      console.error('Error fetching about data:', err);
    });
  }

}
