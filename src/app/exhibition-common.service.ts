import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { CExhibitions } from './classes.component';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionCommonService {

  constructor(private http: HttpClient) { }

  /**
   * 展覽全部資料
   * @memberof ExhibitionCommonService
   */
  data$: Observable<CExhibitions[]> =this.getExhibitonsData();


  /**
   * API取得全部展覽資料
   * @memberof ExhibitionCommonService
   */
  getExhibitonsData() {
    const url = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
    const ret = this.http.get<CExhibitions[]>(url).pipe(shareReplay(1));
    return ret;
  }

}
