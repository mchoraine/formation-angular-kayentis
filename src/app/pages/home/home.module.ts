import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component'
import { ProductComponent } from '../../product/product.component'
import { RouterModule } from '@angular/router'
import { SortPipe } from '../../pipes/sort.pipe'



@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    SortPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
    ])
  ]
})
export class HomeModule { }
