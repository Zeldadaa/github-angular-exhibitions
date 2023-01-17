import { ExhibitionCommonService } from './../exhibition-common.service';
import { Observable, tap, map, filter } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { C_EXHIBITIONS } from '../app.model';
import { ActivationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exhibition-search',
  templateUrl: './exhibition-search.component.html',
  styleUrls: ['./exhibition-search.component.scss']
})
export class ExhibitionSearchComponent implements OnInit {

  /**
   * 展覽資料 全部
   * @type {Observable<C_EXHIBITIONS[]>}
   * @memberof ExhibitionSearchComponent
   */
  data_exhibitions$?: Observable<C_EXHIBITIONS[]>;

  /**
   * 搜尋條件過濾後的資料
   * @type {Observable<C_EXHIBITIONS[]>}
   * @memberof ExhibitionSearchComponent
   */
  data_searchResult$?: Observable<C_EXHIBITIONS[]>;

  searchVal?: Observable<string | null>
  searchValue: string | null = '';

  constructor(private commonservice: ExhibitionCommonService, private route: ActivatedRoute) {
    this.data_exhibitions$ = commonservice.data$;
    // this.data_searchResult$ = this.data_exhibitions$;
  }

  ngOnInit(): void {
    // this.searchVal = this.route.paramMap.pipe(map(m => m.get('search')));
    this.route.paramMap.subscribe(s => { this.searchValue = s.get('search') })
    this.searchSubmit(this.searchValue);
    // this.commonservice.data$.subscribe(
    //   (data) => {
    //     console.log(data);
    //   }
    // );

  }



  /**
   * Search Bar 點擊查詢
   * @memberof ExhibitionSearchComponent
   */
  searchSubmit(inputVal: string | null) {
    let targetData;
    if (inputVal != null) {
      let tempObArr = this.data_exhibitions$?.pipe(
        map((data) => {
          return data.filter((val) => {
            // return val._title.includes(inputVal);
            //都轉換成小寫，就支援大小寫搜尋了
            return val._title.toLowerCase().includes(inputVal.toLowerCase());
          })
        }));
      targetData = tempObArr;
      // this.data_searchResult$ = tempObArr;
    } else {
      targetData = this.data_exhibitions$;
      // this.data_searchResult$ = this.data_exhibitions$;
    }
    this.data_searchResult$ = targetData;
    this.data_searchResult$?.subscribe(s=>console.log('Result Count:',s.length));
  }


}
