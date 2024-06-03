import { Component, OnInit } from '@angular/core';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss'
})
export class SearcherComponent implements OnInit {

  productsData: any[] = [];
  data$: Observable<any[]> | undefined;

  constructor(private categoriesService: FilterCategoriesService) {

  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.data$ = this.categoriesService.data$;

    this.data$.subscribe(data => {
      console.log('Datos recibidos:', data);
      this.productsData = data;
    });
  }

}
