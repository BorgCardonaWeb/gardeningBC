import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {

  @Input() categoriesData: any = [];
  @Output() initPage = new EventEmitter<any>();

  categorieName: string = "";
  subcategorieName: string = "";
  showBreadcrumb = false;

  constructor() {}

  ngOnInit(): void {
   
  }

  getCategoriesInfo(){
    if(this.categoriesData?.length > 1){
      this.categorieName = this.categoriesData[0].name;
      this.subcategorieName = this.categoriesData[1].name;
      this.showBreadcrumb = true;
    } else{
      this.showBreadcrumb = false;
    }
  }


  goToInit(){
    this.initPage.emit(true);
  }

}
