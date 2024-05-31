import { Component, OnInit } from '@angular/core';
import { RouterEvent, RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './features/components/header/header.component';
import { PrincipalBannerComponent } from './features/components/principal-banner/principal-banner.component';
import { SearcherComponent } from './features/components/searcher/searcher.component';
import { FilterCategoriesService } from './services/filter-categories.service';
import { CardCategoriesComponent } from './features/components/card-categories/card-categories.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { categorie } from './features/models/models';
import { FooterComponent } from './features/components/footer/FooterComponent';
import $ from "jquery";
import { ProductsComponent } from './features/components/products/products.component';
import { BreadcrumbComponent } from './features/components/breadcrumb/breadcrumb.component';
import { LocalStorageService } from './services/local-storage.service';
import { categoriesKeyStorage, productsKeyStorage } from '../assets/emuns/const';

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
  providers: [FilterCategoriesService, LocalStorageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'gardeningMalta';
  categories: any;//categorie[] = [];
  products: categorie[] = [];
  showProducts = false;
  categoriesData: any[] = [];


  constructor(private categoriesService: FilterCategoriesService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    const storage = this.localStorageService.getItem(categoriesKeyStorage);
    if (storage) {
      this.categories = JSON.parse(storage);;
    } else {
      this.categoriesService.getCategories().subscribe(data => {
        this.categories = data;
        this.localStorageService.setItem(categoriesKeyStorage, JSON.stringify(data));
      });
    }

  }

  getProducts() {
    const storage = this.localStorageService.getItem(productsKeyStorage);
    if (storage) {
      this.products = JSON.parse(storage);;
    } else {
        this.categoriesService.getAllProducts().subscribe(data => {
        this.products = data;
        this.localStorageService.setItem(productsKeyStorage, JSON.stringify(data));
      });
    }
  }


  findProducts(data: any) {
    this.categoriesData = data;
    this.showProducts = true;
  }

  showPrincipalBanner(data: any) {
    this.showProducts = false;
  }

}
