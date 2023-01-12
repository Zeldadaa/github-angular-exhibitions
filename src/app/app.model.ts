import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class C_EXHIBITIONS {
  _haveImg: boolean = (this._imageUrl) ? true : false;
  constructor(
    public _version: string,
    public _UID: string,
    public _title: string,
    public _category: string,
    public _showInfo: C_SHOWINFO[],
    public _showUnit: string,
    public _discountInfo: string,
    public _descriptionFilterHtml: string,
    public _imageUrl: string,
    public _masterUnit: string[],
    public _subUnit: string[],
    public _supportUnit: string[],
    public _otherUnit: string[],
    public _webSales: string,
    public _sourceWebPromote: string,
    public _comment: string,
    public _editModifyDate: string,
    public _sourceWebName: string,
    public _startDate: string,
    public _endDate: string,
    public _hitRate: number,
  ) {
    this._showInfo = this.cast(this._showInfo);
  }

  cast(item: any) {
    return item.map((info: any) => {
      return this.adapterShowInfo(info);
    });
  }
  adapterShowInfo(item: any): C_SHOWINFO {
    return new C_SHOWINFO(item.time, item.location, item.locationName, item.onSales, item.price, item.latitude, item.longitude, item.endTime);
  }
}

export class C_SHOWINFO {
  constructor(
    public time: string,
    public location: string,
    public locationName: string,
    public onSales: Enum_ONSALES,
    public price: string,
    public latitude: null | string,
    public longitude: null | string,
    public endTime: string,
  ) {
    // this.onSales = this.cast(this.onSales);
  }
  // cast(item: any) {
  //   return item.map((sales: any) => {
  //     return (sales:any)=>{ 
  //       return new 
  //     }
  //   });
  // }

}

export enum Enum_ONSALES {
  N = "N",
  Y = "Y",
}


export class C_DATAINFO {
  _dataOb: Observable<C_EXHIBITIONS[]>;
  _dataLength: number;
  constructor() {
    this._dataOb = new Observable<C_EXHIBITIONS[]>;
    this._dataLength = 0;
  };
}

//

@Injectable({
  providedIn: 'root',
})
export class ExhibitionsAdapter {

  /**
   * Adapter - 資料轉為特定Class C_EXHIBITIONS
   * @param {*} item
   * @return {*}  {CTEST}
   * @memberof ExhibitionsAdapter
   */
  adapter(item: any): C_EXHIBITIONS {
    return new C_EXHIBITIONS(item.version, item.UID, item.title,
      item.category, item.showInfo, item.showUnit, item.discountInfo,
      item.descriptionFilterHtml, item.imageUrl, item.masterUnit, item.subUnit,
      item.supportUnit, item.otherUnit, item.webSales, item.sourceWebPromote,
      item.comment, item.editModifyDate, item.sourceWebName, item.startDate,
      item.endDate, item.hitRate,);
  }
}