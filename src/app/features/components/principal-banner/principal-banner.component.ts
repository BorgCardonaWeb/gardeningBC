import { Component, OnInit } from '@angular/core';
import { ProductsServicesService } from '../../../services/products-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal-banner.component.html',
  styleUrl: './principal-banner.component.scss'
})
export class PrincipalBannerComponent implements OnInit {

  bannerImages: any;

  constructor(private productsServicesService: ProductsServicesService){

  }

  ngOnInit(): void {
    this.getAllImages();
  }

  getAllImages() {
    this.productsServicesService.getAllBannerImages().subscribe(
      (data) => {
        this.bannerImages = data;
      },
      () => {
      }
    );
  }

  getImageSrc(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }


}
