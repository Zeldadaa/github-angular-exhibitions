import { C_EXHIBITIONS } from './../app.model';
import { ExhibitionCommonService } from './../exhibition-common.service';
import { map, Observable } from 'rxjs';
import { ActivatedRoute, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-exhibition-detail',
  templateUrl: './exhibition-detail.component.html',
  styleUrls: ['./exhibition-detail.component.scss']
})
export class ExhibitionDetailComponent implements OnInit {

  data_exhibitions$: Observable<C_EXHIBITIONS[]>;

  data_Info$?: Observable<C_EXHIBITIONS | undefined>;
  // uid?: Observable<string | null>;
  uid: string | null = '';
  safeSrc: SafeResourceUrl = '';
  data_mapSrc: string = 'https://maps.google.com/maps?q=24.157234,120.66606&hl=es&z=14&amp;output=embed';


  latitude: string | null | undefined = '';
  longitude: string | null | undefined = '';


  constructor(private route: ActivatedRoute, private commonservice: ExhibitionCommonService, private sanitizer: DomSanitizer) {
    this.data_exhibitions$ = commonservice.data$;
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    // this.uid = this.route.paramMap.pipe(map(m => m.get('uid')));
    this.route.paramMap.subscribe(s => this.uid = s.get('uid'));
    this.getInfo();

  }



  private getInfo() {
    const targetInfo = this.data_exhibitions$?.pipe(map(exhibitions => exhibitions.find((data) => {
      let ret;
      if (data._UID == this.uid) {
        ret = data;
      }
      return ret;
    })));
    this.data_Info$ = targetInfo;


    targetInfo?.subscribe(s => {
      console.log('Data:',s);
      this.latitude = s?._showInfo_Property._latitude;
      this.longitude = s?._showInfo_Property._longitude;
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("https://maps.google.com/maps?q=24.157234,120.66606&hl=es&z=14&amp;output=embed");
      // this.data_mapSrc = "https://maps.google.com/maps?q=24.157234,120.66606&hl=es&z=14&amp;output=embed";
    });


  }


}
