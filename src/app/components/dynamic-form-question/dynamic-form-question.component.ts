import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { QuestionBase } from '../question/question-base';
import { environment } from '../../../environments/environment';

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

  userAnswer = new FormControl();
  errorMessage = "";
  errorMessageText = "";  

  constructor(
    private http: HttpClient
  ) { }

  toggleHintOn(questionId) {
    console.log("One hint for Question " + questionId + " coming right up...");
    this.showHint = true;
    this.showSkip = true;
  }

  toggleSkipOn() {
    console.log("Enabled Skip...");
    // alert("Hello Skipper!");
    this.showSkip = true;
  }

  skipQuestion() {
    location.href = '/category';
  }

  checkAnswer() {
    this.errorMessage = "";
    this.errorMessageText = "";
    console.log("Checking answer...");
    // console.log(this.projectName.value);
    // console.log(this.teamName.value);
    // console.log(this.password.value);

    let params = {
      "platform": "aws",
      "cgw_aws_q_id": 3, // this.question.key,
      "user_answer": "Public" // this.userAnswer.value
    }

    this.http.post<any>(environment.serviceUrl + "/question/checkAnswer", params).subscribe(data => {
      console.log(data[0]);  
      if (data.length > 0) {        
        if (data[0].response == 1) {
          location.href = '/category'; 
        } else {
          this.errorMessage = "Incorrect!";
          this.errorMessageText = " Try again.";
        }
      }
    })   
    // location.href = '/category'; 
  }
    
}