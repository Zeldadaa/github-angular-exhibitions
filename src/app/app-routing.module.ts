import { ExhibitionDetailComponent } from './exhibition-detail/exhibition-detail.component';
import { ExhibitionIndexComponent } from './exhibition-index/exhibition-index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExhibitionSearchComponent } from './exhibition-search/exhibition-search.component';

const routes: Routes = [
  //設定網址為空白，沒帶任何參數時要轉址到哪裡
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  // { path: 'search/', redirectTo: 'search/:search', pathMatch: 'full' },
  //設定各個參數要導向的Component
  { path: 'index', component: ExhibitionIndexComponent },
   { path: 'search/:search', component: ExhibitionSearchComponent },
  { path: 'search', component: ExhibitionSearchComponent },
  { path: 'detail/:uid', component: ExhibitionDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


