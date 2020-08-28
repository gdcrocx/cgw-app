import { Injectable } from '@angular/core';

import { of } from 'rxjs';

import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';

@Injectable()
export class QuestionService {

  constructor() { }

  // TODO: get from a remote source of question metadata
  getQuestions() {

    const questions: QuestionBase<string>[] = [

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),
      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      }),
      new TextboxQuestion({
        key: 'Question 1',
        label: 'Yama??',
        type: 'number',
        order: 3
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
