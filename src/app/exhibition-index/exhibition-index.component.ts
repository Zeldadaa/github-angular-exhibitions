import { ExhibitionCommonService } from './../exhibition-common.service';
import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { C_DATAINFO, C_EXHIBITIONS } from '../app.model';

@Component({
  selector: 'app-exhibition-index',
  templateUrl: './exhibition-index.component.html',
  styleUrls: ['./exhibition-index.component.scss']
})
export class ExhibitionIndexComponent implements OnInit {

  /**
   * 展覽資料 - 全部筆數
   * @type {Observable<CExhibitions[]>}
   * @memberof ExhibitionIndexComponent
   */
  data_exhibitions$: Observable<C_EXHIBITIONS[]>;

  /**
   * 展覽資料 - [近期展覽]第一階段篩選
   * @type {C_DATAINFO}
   * @memberof ExhibitionIndexComponent
   */
  data_recent: C_DATAINFO = new C_DATAINFO();

  /**
   * 展覽資料 - [近期展覽]篩選後資料
   * @type {Array<C_EXHIBITIONS>}
   * @memberof ExhibitionIndexComponent
   */
  data_recentfilterdata: Array<C_EXHIBITIONS> = new Array<C_EXHIBITIONS>();

  /**
   * 展覽資料 - [隨機推薦]資料
   * @type {Array<C_EXHIBITIONS>}
   * @memberof ExhibitionIndexComponent
   */
  data_random: Array<C_EXHIBITIONS> = new Array<C_EXHIBITIONS>();



  constructor(private commonService: ExhibitionCommonService) {
    this.data_exhibitions$ = commonService.data$;
  }

  ngOnInit() {

    this.getRecentData(this.data_exhibitions$);

  }



  // [近期展覽]取得資料
  private getRecentData(targetData: Observable<C_EXHIBITIONS[]>) {

    //會回傳新的陣列(tempfilterData)，不會動到原有陣列的資料
    this.data_recent._dataOb = targetData.pipe(map(data => data.filter((value) => {
      //toISOString=>會取回「"2023-01-03T05:10:48.505Z"」
      // split('T')，將T左右兩邊切割，會變成一個陣列裡面有2個物件「Array ["2023-01-03", "05:11:47.133Z"]」，
      // 取回第0個，就是「"2023-01-03"」
      const todayDateStr = new Date().toISOString().split('T')[0];
      const todayDate = Date.parse(todayDateStr);
      let startDate = Date.parse(value._startDate);
      return startDate >= todayDate;
    })));

    this.data_recent._dataOb.subscribe(s => {
      this.data_recent._dataLength = s.length;
      
    });
  }

  public getRecentDataProcess() {
    if (!this.data_recentfilterdata.length) {
      //取得隨機Index
      const targetIndexArray = this.getRandomIndex(this.data_recent._dataLength, 4);
      //取得資料
      this.data_recentfilterdata = this.takeSpecificData(targetIndexArray, this.data_recent._dataOb);
    }
    return true;
  }



  //[隨機推薦]點擊[點我推薦]取得資料
  getRandomData(targetCount: number) {
    let curDataCount = 0;
    this.data_exhibitions$?.subscribe(s => curDataCount = s.length);
    //隨機Index陣列
    let targetIndexArray = this.getRandomIndex(curDataCount, targetCount);
    //拿到的資料給顯示變數
    this.data_random = this.takeSpecificData(targetIndexArray, this.data_exhibitions$);
  }

  //隨機取得變數
  getRandomIndex(listlength: number, count: number) {
    let ret = new Array();
    const targetlistlength = listlength;
    while (ret.length != count) {
      let newrandomindex = Math.floor(Math.random() * targetlistlength);
      if (!ret.includes(newrandomindex)) {
        ret.push(newrandomindex);
      }
    }
    return ret;
  }


  //從「全部展覽資料」中取得特定一筆
  takeSpecificData(indexArray: number[], targetDataArray: Observable<C_EXHIBITIONS[]> | undefined) {
    let temp_array = new Array<C_EXHIBITIONS>;

    //迴圈寫資料
    indexArray.forEach(index => {
      //用index從陣列中取得單筆資料
      const targetData = targetDataArray?.pipe(map(data => data[index]));
      //寫入新陣列
      targetData?.subscribe(s => temp_array.push(s));
    });


    return temp_array;
  }

  alertfun() {
    console.log('load false');

  }





}
