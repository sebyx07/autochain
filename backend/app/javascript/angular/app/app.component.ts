import { Component } from '@angular/core';

@Component({
  selector: '#angular',
  template: `<h1>Hello {{name}}</h1><img src="{{Car}}" alt="">`
})
export class AppComponent {
  name = 'Angular!';
}
