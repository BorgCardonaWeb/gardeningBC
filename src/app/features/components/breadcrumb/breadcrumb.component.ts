import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {

  @Input() categoriesData: any = [];
  @Output() initPage = new EventEmitter<any>();

  categorieName: string = "";
  subcategorieName: string = "";

  constructor() {}

  ngOnInit(): void {
    this.categorieName = this.categoriesData[0].name;
    this.subcategorieName = this.categoriesData[1].name;
  }


  goToInit(){
    this.initPage.emit(true);
  }

}
