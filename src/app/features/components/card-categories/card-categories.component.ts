import { Component, Input } from '@angular/core';
import { categorie } from '../../models/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-categories',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './card-categories.component.html',
  styleUrl: './card-categories.component.scss'
})
export class CardCategoriesComponent {

  @Input() categories: categorie[] =[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.categories)
  }

}
