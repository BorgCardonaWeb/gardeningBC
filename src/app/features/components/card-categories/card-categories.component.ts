import { Component, Input, HostListener, Output, EventEmitter, OnInit } from '@angular/core';
import { categorie } from '../../models/models';
import { CommonModule } from '@angular/common';
import { FilterCategoriesService } from '../../../services/filter-categories.service';

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

  constructor(private categoriesService: FilterCategoriesService) {

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
    this.categoriesService.getProductsByStorage(true);
  }

  toggleSubMenu(index: number) {
    this.currentCategorie = `categorie-${index}`;
    this.closeSubMenu();
    this.categories[index].showSubMenu = !this.categories[index].showSubMenu;
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
