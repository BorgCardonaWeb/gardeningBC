import { Component, Input, HostListener, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { categorie } from '../../models/models';
import { CommonModule } from '@angular/common';
import { FilterCategoriesService } from '../../../services/filter-categories.service';
import { productsKeyStorage } from '../../../../assets/emuns/const';

@Component({
  selector: 'app-card-categories',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './card-categories.component.html',
  styleUrl: './card-categories.component.scss'
})
export class CardCategoriesComponent implements OnInit {

  @Input() categories: categorie[] = [];
  @Output() categoriAndSubcategoriSelected = new EventEmitter<any>();

  currentCategorie!: string;
  testProducts: any[] = [];

  constructor(private categoriesService: FilterCategoriesService, private cdRef: ChangeDetectorRef) {

  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickBox = document.getElementById(this.currentCategorie);
    if (!(clickBox && clickBox.contains(target))) {
      this.closeSubMenu();
    }
  }

  ngOnInit(): void {
    this.categoriesService.getDataByStorage(productsKeyStorage, true);
  }

  toggleSubMenu(index: number) {
    
    this.currentCategorie = `categorie-${index}`;
    this.closeSubMenu();
    this.categories[index].showSubMenu = !this.categories[index].showSubMenu;
    this.cdRef.detectChanges();
  }

  closeSubMenu() {
    this.categories.forEach(category => {
      category.showSubMenu = false;
    });
  }

  getProductsByCategorie(categorie: any, subcategorie: any) {
    this.categoriAndSubcategoriSelected.emit([
      categorie,
      subcategorie
    ]);

  }
}
