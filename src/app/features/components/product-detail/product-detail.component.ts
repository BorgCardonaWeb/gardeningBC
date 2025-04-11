import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  @Input() shortDescription: any;
  @Input() description: any;
  @Input() img: any;

  constructor() { }

  ngOnInit(): void {
    this.shortDescription = this.addPeriodIfNeeded(this.shortDescription);
    this.description = this.addPeriodIfNeeded(this.description);
  }

  private addPeriodIfNeeded(text: string): string {
    if (text && text.trim().length > 0 && !text.trim().endsWith('.')) {
      return text.trim() + '.';
    }
    return text.trim();
  }

}
