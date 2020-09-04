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

  @Input() question: QuestionBase<string>;
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) { 
    // console.log("In Constructor - DynFormComp - " + this.question);
    // console.log("QCS - ");
    // console.log(this.qcs.toFormGroup(this.question))
   }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.question);
    // console.log("Form Init - " + this.question);
    // console.dir(this.form);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    // console.log("Form Submit - " + this.question);
    // console.dir(this.form);
  }

}
