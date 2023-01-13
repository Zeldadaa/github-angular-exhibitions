import { ExhibitionCommonService } from './../exhibition-common.service';
import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { C_EXHIBITIONS } from '../app.model';

@Component({
  selector: 'app-exhibition-search',
  templateUrl: './exhibition-search.component.html',
  styleUrls: ['./exhibition-search.component.scss']
})
export class ExhibitionSearchComponent implements OnInit {
  data_exhibitions$?: Observable<C_EXHIBITIONS[]>;

  tempData = new Array<C_EXHIBITIONS>();


  constructor(private commonservice: ExhibitionCommonService) {
    this.data_exhibitions$ = commonservice.data$;
  }

  ngOnInit(): void {

    this.commonservice.data$.subscribe(
      (data) => {
        this.tempData = data;
        console.log(data);
      }
    );

  }
  


  /**
   * 查詢 Bar 點擊查詢
   * @memberof ExhibitionSearchComponent
   */
  searchSubmit(){
    
  }


}
