import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './features/components/header/header.component';
import { PrincipalBannerComponent } from './features/components/principal-banner/principal-banner.component';
import { SearcherComponent } from './features/components/searcher/searcher.component';
import { FilterCategoriesService } from './services/filter-categories.service';
import { CardCategoriesComponent } from './features/components/card-categories/card-categories.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './features/components/footer/FooterComponent';
import { ProductsComponent } from './features/components/products/products.component';
import { BreadcrumbComponent } from './features/components/breadcrumb/breadcrumb.component';

import { categoriesKeyStorage, productsKeyStorage } from '../assets/emuns/const';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  //imports: [RouterOutlet, FontAwesomeModule, RouterLink],
  imports: [HeaderComponent,
    PrincipalBannerComponent,
    SearcherComponent,
    CardCategoriesComponent,
    CommonModule,
    FooterComponent,
    ProductsComponent,
    BreadcrumbComponent
  ],
  providers: [FilterCategoriesService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'gardeningMalta';
  categories: any;
  showProducts = false;
  categoriesData: any;
  paramProduct: string = "";

  constructor(private categoriesService: FilterCategoriesService,
    private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.categoriesService.clearStorage();
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
    });

  }

  getProducts() {
    const storage = this.localStorageService.getItem(productsKeyStorage);
    if (storage) {
      this.categoriesService.updateData(JSON.parse(storage));
    } else {
      this.categoriesService.getAllProducts().subscribe(data => {
        this.localStorageService.setItem(productsKeyStorage, JSON.stringify(data));
        this.categoriesService.updateData(data);
      });
    }
  }


  findProducts(data: any) {
    this.categoriesData = data;
    this.showProducts = true;
  }

  showPrincipalBanner(data: any) {
    this.showProducts = false;
    this.getProducts();
  }

  searchProductsByName(baseProduct: string) {
    this.paramProduct = baseProduct;
  }

}
