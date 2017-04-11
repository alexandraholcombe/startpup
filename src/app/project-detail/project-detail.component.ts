import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { Need } from '../need.model';
import { Contact } from '../contact.model';
import { SocialMedia } from '../social-media.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  providers: [UserService, ProjectService]
})
export class ProjectDetailComponent implements OnInit {
  public projectId: string;
  public projectToDisplay: any;
  public user: User;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.projectId = urlParameters['id'];
      console.log(this.projectId);
    });
    this.projectToDisplay = this.projectService.getProjectById(this.projectId).subscribe(dataLastEmittedFromObserver => {
      this.user = new User(dataLastEmittedFromObserver.owner.name, dataLastEmittedFromObserver.owner.userEmail, dataLastEmittedFromObserver.owner.userPassword);
      // this.user.id = dataLastEmittedFromObserver.owner.id;

      setTimeout(() => {this.projectToDisplay = new Project(
              dataLastEmittedFromObserver.needs,
              dataLastEmittedFromObserver.title,
              dataLastEmittedFromObserver.image,
              dataLastEmittedFromObserver.description,
              dataLastEmittedFromObserver.socialMedia,
              dataLastEmittedFromObserver.contactInformation,
              dataLastEmittedFromObserver.website
            )}, 1);



      console.log(this.projectToDisplay);
      console.log(this.user);
    });
  }

}
