import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { QuestionBase } from '../question/question-base';
import { QuestionControlService } from '../question/question-control.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  // question: QuestionBase<string>;

  @Input() question: QuestionBase<string>;
  form: FormGroup;
  payLoad = '';

  showLogOut = true;

  constructor(
    private http: HttpClient,
    private qcs: QuestionControlService,
    private localStorage: LocalStorageService,
    private app: AppComponent
  ) { 
    //   // console.log("In Constructor - DynFormComp - " + this.question);
    //   // console.log("QCS - ");
    //   // console.log(this.qcs.toFormGroup(this.question))
  }

    
  // constructor(private _questionService: QuestionControlService) { 
  //   // console.log("In Constructor - DynFormComp - " + this.question);
  //   // console.log("QCS - ");
  //   // console.log(this.qcs.toFormGroup(this.question))
  //  }

  ngOnInit() {
    if (!this.localStorage.keyExists("teamUuid") || !this.localStorage.keyExists("platform")) {
      location.href = "/login"
    }
    // console.log(this._questionService.printQuestionData());
    // this._questionService.questionData$.subscribe(data => console.log(data));
    // this.form = this.qcs.toFormGroup(this.question);
    // this.form = this._questionService.toFormGroup(this._questionService.printQuestionData());
    // this.question = this._questionService.printQuestionData();
    // this.questionService.currentQuestionData.subscribe(question => this.question = question);
    // console.log("Form Init - ");
    // console.dir(this.questionService.printQuestionData());
    // console.dir(this.form);
  }

  onSubmit() {
    // this.payLoad = JSON.stringify(this.form.getRawValue());
    // console.log("Form Submit - " + this.question);
    // console.dir(this.form);
  }

  updateCurrentTimeSnapshot() {
    this.localStorage.storeOnCgwLocalStorage("currentTimeSnapshot", moment().format());

    let params = {
      "user_team_uuid": this.localStorage.getFromCgwLocalStorage("teamUuid"),
      "user_time_snapshot": JSON.stringify(this.localStorage.getFromCgwLocalStorage())
    }    

    this.http.post<any>(environment.serviceUrl + "/users/saveTimeSnapshot", params).subscribe(data => {
      // console.log(data[0]);
      if (data.length > 0) {        
        if ('cgw_uuid' in data[0]) {
          console.log("Success: Local Time Snapshot saved successfully in the backend.");
        }
      }
    })
  }

  logOut() {
    this.app.gameCounter.stop();
    this.updateCurrentTimeSnapshot();
    location.href = "/login";
  }

  // loadQuestion(paramQuestion) {
  //   this.form = this.qcs.toFormGroup(paramQuestion);
  // }

}
