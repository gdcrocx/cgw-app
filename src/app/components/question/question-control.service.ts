import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './question-base';

@Injectable()
export class QuestionControlService {

  constructor() { }

  // private question : QuestionBase<string>;

  // private _questionSource = new Subject<QuestionBase<string>>();
  // public readonly questionData$ = this._questionSource.asObservable();

  // toFormGroup(question: QuestionBase<string>) {
  //   const group: any = {};

  //   // questions.forEach(question => {
  //   // console.dir(question);
  //   group[question.key] = question.required ? new FormControl(question.value || '', Validators.required) : new FormControl(question.value || '');
  //   // });
  //   return new FormGroup(group);
  // }

  // loadQuestionData(question: QuestionBase<string>) {
  //   // console.log("Data loaded - ");
  //   // console.log(question);    
  //   this._questionSource.next(question);
  //   // console.log("Data saved - ");
  //   // console.log(question);
  //   // console.log(this.printQuestionData());
  // }

  // printQuestionData() {    
  //   this.questionData$.subscribe(data => {
  //     console.log("Data Print - ");
  //     console.log(data);
  //     this.question.key = data["cgw_aws_q_id"];
  //     this.question.label = data["cgw_aws_q_text"];
  //     this.question.value = "Answer";
  //     this.question.required = true;
  //     this.question.type = data["cgw_aws_q_type"];
  //     this.question.hint = data["cgw_aws_q_hint"];
  //     this.question.order = data["cgw_aws_q_id"];
  //     this.question.controlType = 'textbox';
  //     // this.questionService.currentQuestionData = question;          
  //   })
  //   console.log(this.question);
  //   return this.question;
  // }
}