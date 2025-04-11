import { CommonModule } from "@angular/common";
import { CardCategoriesComponent } from "../card-categories/card-categories.component";
import { HeaderComponent } from "../header/header.component";
import { PrincipalBannerComponent } from "../principal-banner/principal-banner.component";
import { SearcherComponent } from "../searcher/searcher.component";
import { FooterComponent } from "../footer/FooterComponent";
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";
import { ProductsComponent } from "../products/products.component";
import { NavUserComponent } from "../nav-user/nav-user.component";
import { Component, OnInit } from "@angular/core";
import { FilterCategoriesService } from "../../../services/filter-categories.service";
import { LocalStorageService } from "../../../services/local-storage.service";
import { NewsAndEventsComponent } from "../news-and-events/news-and-events.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  //imports: [RouterOutlet, FontAwesomeModule, RouterLink],
  imports: [HeaderComponent,
    PrincipalBannerComponent,
    SearcherComponent,
    CardCategoriesComponent,
    CommonModule,
    FooterComponent,
    ProductsComponent,
    BreadcrumbComponent,
    NavUserComponent,
    HomePageComponent,
    NewsAndEventsComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  title = 'gardeningMalta';
  categories: any;
  showProducts = false;
  showUserPanelData = false;

  constructor(private categoriesService: FilterCategoriesService,
    private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
    });

  }

  findProducts(data: any) {
    this.showProducts = true;
    this.categoriesService.updateSearcher("");
    this.categoriesService.updateParamSearcher("");
    this.categoriesService.updateCategorieSearcher(data);
  }

  showPrincipalBanner(data: any) {
    this.showProducts = false;
    this.categoriesService.updateCategorieSearcher("");
  }

  searchProductsByName(baseProduct: any) {
    this.showProducts = true;
    this.categoriesService.updateCategorieSearcher("");
    this.categoriesService.updateParamSearcher(baseProduct);
  }

}

