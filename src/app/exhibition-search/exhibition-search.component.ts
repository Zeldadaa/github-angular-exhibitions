import { ExhibitionCommonService } from './../exhibition-common.service';
import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CExhibitions } from '../classes.component';

@Component({
  selector: 'app-exhibition-search',
  templateUrl: './exhibition-search.component.html',
  styleUrls: ['./exhibition-search.component.scss']
})
export class ExhibitionSearchComponent implements OnInit {
  data_exhibitions$?: Observable<CExhibitions[]>;

  tempData = new Array<CExhibitions>();

  constructor(private commonservice: ExhibitionCommonService) {
    this.data_exhibitions$ = commonservice.data$;
  }

  ngOnInit(): void {
    
    
    this.commonservice.data$.subscribe(
      (data)=>{
        this.tempData = data;
        console.log(this.tempData);
      }
    );
    
  }
  haveValue(){
    // console.log(this.tempData[0].showInfo);
    return true;
  }



}
