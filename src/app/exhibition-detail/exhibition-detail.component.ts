import { C_EXHIBITIONS } from './../app.model';
import { ExhibitionCommonService } from './../exhibition-common.service';
import { map, Observable, of } from 'rxjs';
import { ActivatedRoute, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exhibition-detail',
  templateUrl: './exhibition-detail.component.html',
  styleUrls: ['./exhibition-detail.component.scss']
})
export class ExhibitionDetailComponent implements OnInit {

  data_exhibitions$: Observable<C_EXHIBITIONS[]>;

  data_Info$?: Observable<C_EXHIBITIONS | undefined>;
  uid: string | null = '';
 





  constructor(private route: ActivatedRoute, private commonservice: ExhibitionCommonService, private sanitizer: DomSanitizer, private location:Location) {
    this.data_exhibitions$ = commonservice.data$;
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe(s => this.uid = s.get('uid'));
    this.getInfo();

  }




  /**
   * 取得
   * @private
   * @memberof ExhibitionDetailComponent
   */
  private getInfo() {
    const targetInfo = this.data_exhibitions$?.pipe(map(exhibitions => exhibitions.find((data) => {
      let ret;
      if (data._UID == this.uid) {
        let mapurl: SafeResourceUrl ='';
        if (data?._showInfo_Property._latitude && data?._showInfo_Property._longitude) {
          let latitude = data?._showInfo_Property._latitude;
          let longitude = data?._showInfo_Property._longitude;
          mapurl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${latitude}+${longitude}&t=&output=embed`);

        } else {
          let address = data?._showInfo_Property._location;
          mapurl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${address}&t=&output=embed`);
        }
        data._locationMapUrl = mapurl;

        ret = data;
        console.log(ret);
      }
      return ret;
    })));
    
    this.data_Info$ = targetInfo;
  }


  public goBack() {
    this.location.back();
}


}
