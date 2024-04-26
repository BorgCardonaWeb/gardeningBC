import { Component } from '@angular/core';
import { RouterEvent, RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './features/components/header/header.component';
import { PrincipalBannerComponent } from './features/components/principal-banner/principal-banner.component';
import { SearcherComponent } from './features/components/searcher/searcher.component';

@Component({
  selector: 'app-root',
  standalone: true,
  //imports: [RouterOutlet, FontAwesomeModule, RouterLink],
  imports: [HeaderComponent,
    PrincipalBannerComponent,
    SearcherComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gardeningMalta';
}
