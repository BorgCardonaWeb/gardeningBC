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
import { FooterComponent } from './features/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  //imports: [RouterOutlet, FontAwesomeModule, RouterLink],
  imports: [HeaderComponent,
    PrincipalBannerComponent,
    SearcherComponent,
    CardCategoriesComponent,
    CommonModule,
    FooterComponent
  ],
  providers:[FilterCategoriesService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'gardeningMalta';

  categories: categorie[] =[];


  constructor(private categoriesService: FilterCategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories)
    });
  }



}
