import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../question/question-base';

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent {
  
  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;
  // get isValid() { return this.form.controls[this.question.key].valid; }
  
  showHint: boolean = false;
  showSkip: boolean = false;

  toggleHintOn(questionId) {
    console.log("One hint for Question " + questionId + " coming right up...");
    this.showHint = true;
    this.showSkip = true;
  }

  toggleSkipOn() {
    console.log("Enabled Skip...");
    alert("Hello Skipper!");
    this.showSkip = true;
  }
}