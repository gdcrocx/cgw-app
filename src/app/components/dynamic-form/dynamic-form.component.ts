import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../question/question-base';
import { QuestionControlService } from '../question/question-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  question: QuestionBase<string>;

  // @Input() question: QuestionBase<string>;
  form: FormGroup;
  payLoad = '';

  constructor(private _questionService: QuestionControlService) { 
    // console.log("In Constructor - DynFormComp - " + this.question);
    // console.log("QCS - ");
    // console.log(this.qcs.toFormGroup(this.question))
   }

  ngOnInit() {
    this._questionService.questionData$.subscribe(data => console.log(data));
    this.form = this._questionService.toFormGroup(this._questionService.printQuestionData());
    this.question = this._questionService.printQuestionData();
    // this.questionService.currentQuestionData.subscribe(question => this.question = question);
    // console.log("Form Init - ");
    // console.dir(this.questionService.printQuestionData());
    // console.dir(this.form);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    // console.log("Form Submit - " + this.question);
    // console.dir(this.form);
  }

  // loadQuestion(paramQuestion) {
  //   this.form = this.qcs.toFormGroup(paramQuestion);
  // }

}
