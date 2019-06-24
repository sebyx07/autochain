import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abonamente',
  templateUrl: './abonamente.component.html',
  styleUrls: ['./abonamente.component.css']
})
export class AbonamenteComponent implements OnInit{

  public headerText: string = 'Alegeti abonamentul care ti se potriveste!';
  public chooseSubscription: boolean = true;

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  public onSubscriptionSelected(sub: number) {
    this.chooseSubscription = false;
    if (sub === 1) {
      this.headerText = 'Abonament Super';
    } else {
      this.headerText = 'Abonament Plus';
    }
  }

  public onSubscriptionCanceled() {
    this.headerText = 'Alegeti abonamentul care ti se potriveste!';
    this.chooseSubscription = true;
  }
}
