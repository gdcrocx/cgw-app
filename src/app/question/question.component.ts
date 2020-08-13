// import { Component, OnInit } from '@angular/core';

// import { QuestionService } from '../question.service';

// @Component({
//   selector: 'app-quiz',
//   templateUrl: './quiz.component.html',
//   providers: [QuestionService],
//   styleUrls: ['./quiz.component.css']
// })
// export class QuizComponent implements OnInit {


//   constructor() { }

//   ngOnInit(): void {
//   }

//   getInstanceId = () => {
    
//   }

// }

import { Component } from '@angular/core';

import { QuestionService } from './question.service';
import { QuestionBase } from './question-base';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question',
  template: `
    <div>
      <h2>Job Application for Heroes</h2>
      <app-dynamic-form [questions]="questions$ | async"></app-dynamic-form>
    </div>
  `,
  providers:  [QuestionService]
})
export class QuestionComponent {
  questions$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }
}
