import { Component } from '@angular/core';
import { HeaderComponent } from './features/components/header/header.component';
import { FilterCategoriesService } from './services/filter-categories.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './features/components/footer/FooterComponent';

import { NavUserComponent } from './features/components/nav-user/nav-user.component';
import { HomePageComponent } from './features/components/home-page/home-page.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
 // imports: [RouterOutlet, FontAwesomeModule, RouterLink],
  imports: [HeaderComponent,
    NavUserComponent,
    CommonModule,
    HomePageComponent,
    FooterComponent,
    RouterOutlet, 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'gardeningMalta';
  categories: any;
  showProducts = false;
  showUserPanelData = false;

  constructor(private categoriesService: FilterCategoriesService, private router: Router) {
  }


  showPrincipalBanner(data: any) {
    this.showProducts = false;
    this.categoriesService.updateCategorieSearcher("");
  }

  showUserPanelComponent(data: boolean) {
    this.showUserPanelData = data;
  }

  loadHomePage(data: any){
    this.router.navigate(["home"]);
  }

}
