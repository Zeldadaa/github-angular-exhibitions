import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



export class C_EXHIBITIONS {
  _version: string = '';
  _UID: string = '';
  _title: string = '';
  _category: string = '';
  _showInfo: C_SHOWINFO[] = [];

  get _showInfo_Property(): C_SHOWINFO {
    return this._showInfo[0];
  }

  get _locationName_Show(): string {
    let ret = this._showInfo_Property._locationName;
    if (ret.includes('=')) {
      ret = this._masterUnit_Property;
    }
    return ret;
  }

  _showUnit: string = '';
  _discountInfo: string = '';
  _descriptionFilterHtml: string = '';
  _imageUrl: string = '';
  // _haveImg: boolean = (this._imageUrl) ? true : false;

  get _haveImg():boolean{
    let ret = false;
    if (this._imageUrl) {
      ret = true;
    }
    return ret;
  }
  _masterUnit: string[] = [];
  get _masterUnit_Property(): string {
    return this._masterUnit[0]
  };
  _subUnit: string[] = [];
  _supportUnit: string[] = [];
  _otherUnit: string[] = [];
  _webSales: string = '';
  _sourceWebPromote: string = '';
  _comment: string = '';
  _editModifyDate: string = '';
  _sourceWebName: string = '';
  _startDate: string = '';
  _endDate: string = '';
  _hitRate: number = 0;



  constructor(
    version: string,
    UID: string,
    title: string,
    category: string,
    showInfo: C_SHOWINFO[],
    showUnit: string,
    discountInfo: string,
    descriptionFilterHtml: string,
    imageUrl: string,
    masterUnit: string[],
    subUnit: string[],
    supportUnit: string[],
    otherUnit: string[],
    webSales: string,
    sourceWebPromote: string,
    comment: string,
    editModifyDate: string,
    sourceWebName: string,
    startDate: string,
    endDate: string,
    hitRate: number,
  ) {
    // this.showInfo = this.cast(this._showInfo);

    this._version = version;
    this._UID = UID;
    this._title = title;
    this._category = category;
    this._showInfo = this.cast(showInfo);
    this._showUnit = showUnit;
    this._discountInfo = discountInfo;
    this._descriptionFilterHtml = descriptionFilterHtml;
    this._imageUrl = imageUrl;
    this._masterUnit = masterUnit;
    this._subUnit = subUnit;
    this._supportUnit = supportUnit;
    this._otherUnit = otherUnit;
    this._webSales = webSales;
    this._sourceWebPromote = sourceWebPromote;
    this._comment = comment;
    this._editModifyDate = editModifyDate;
    this._sourceWebName = sourceWebName;
    this._startDate = startDate;
    this._endDate = endDate;
    this._hitRate = hitRate;
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

  _time: string = '';
  _location: string = '';
  _locationName: string = '';
  _onSales: string = '';
 
  get _onSales_bool(): boolean {
    let ret = false;
    if (this._onSales === "Y") {
      ret = true;
    }
    return ret;
  }
  _price: string = '';
  _latitude: null | string = '';
  _longitude: null | string = '';
  _endTime: string = '';

  constructor(
    time: string,
    location: string,
    locationName: string,
    onSales: string,
    price: string,
    latitude: null | string,
    longitude: null | string,
    endTime: string,
  ) {
    this._time = time;
    this._location = location;
    this._locationName = locationName;
    this._onSales = onSales;
    this._price = price;
    this._latitude = latitude;
    this._longitude = longitude;
    this._endTime = endTime;
  }


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
   * @return {*}  {C_EXHIBITIONS}
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