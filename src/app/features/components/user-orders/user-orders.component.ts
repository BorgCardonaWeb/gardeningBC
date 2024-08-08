import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [],
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  
  }

  goToInit(){
    this.router.navigate(["home"]);
  }

}
