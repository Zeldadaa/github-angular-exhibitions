import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap, map } from 'rxjs';
import { C_EXHIBITIONS, ExhibitionsAdapter } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionCommonService {

  constructor(private http: HttpClient, private ExhibitionsAdapter: ExhibitionsAdapter) { }

  /**
   * 展覽全部資料
   * @memberof ExhibitionCommonService
   */
  data$: Observable<C_EXHIBITIONS[]> = this.getExhibitonsData();


  /**
   * API取得全部展覽資料
   * @memberof ExhibitionCommonService
   */
  getExhibitonsData() {
    const url = 'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6';
    //API取回資料，是Observable型態
    const apiDataArray = this.http.get<any>(url).pipe(shareReplay(1));
    //透過model.ts檔中的function將api資料轉換成自訂Class的資料
    const ret = apiDataArray.pipe(map((data) => {
      return data.map((item: any) => this.ExhibitionsAdapter.adapter(item));
    }));
    return ret;
  }


}
