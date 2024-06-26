import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterCategoriesService } from '../../../services/filter-categories.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {

  @Output() initPage = new EventEmitter<any>();

  categorieName: string = "";
  subcategorieName: string = "";
  showBreadcrumb = false;
  dataSearcherCategorie$: Observable<any> | undefined;

  constructor(private categoriesService: FilterCategoriesService) {}

  ngOnInit(): void {
   this.getCategoriesInfo();
  }

  getCategoriesInfo(){
    this.dataSearcherCategorie$ = this.categoriesService.dataSearcherCategorie$;
    this.dataSearcherCategorie$.subscribe(_data => {
      debugger
      if (_data !== "") {
        this.categorieName = _data[0].name;
        this.subcategorieName = _data[1].name;
        this.showBreadcrumb = true;
      } else{
        this.categorieName = "";
        this.subcategorieName = "";
        this.showBreadcrumb = false;
      }
    });
  }


  goToInit(){
    this.initPage.emit(true);
  }

}
