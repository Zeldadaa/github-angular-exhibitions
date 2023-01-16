import { ExhibitionCommonService } from './../exhibition-common.service';
import { Observable, tap, map, filter } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { C_EXHIBITIONS } from '../app.model';

@Component({
  selector: 'app-exhibition-search',
  templateUrl: './exhibition-search.component.html',
  styleUrls: ['./exhibition-search.component.scss']
})
export class ExhibitionSearchComponent implements OnInit {
  data_exhibitions$?: Observable<C_EXHIBITIONS[]>;
  data_searchResult$?: Observable<C_EXHIBITIONS[]>;
  tempData = new Array<C_EXHIBITIONS>();

  

  constructor(private commonservice: ExhibitionCommonService) {
    this.data_exhibitions$ = commonservice.data$;
    this.data_searchResult$ = this.data_exhibitions$;
  }

  ngOnInit(): void {

    // this.commonservice.data$.subscribe(
    //   (data) => {
    //     this.tempData = data;
    //     console.log(data);
    //   }
    // );

  }



  /**
   * Search Bar 點擊查詢
   * @memberof ExhibitionSearchComponent
   */
  searchSubmit(inputVal: string) {
    let tempObArr = this.data_exhibitions$?.pipe(
      map((data) => {
        return data.filter((val) => {
          return val._title.includes(inputVal);
        })
      }));
 
      this.data_searchResult$ = tempObArr;
  }


}
