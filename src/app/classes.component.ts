import { Observable } from 'rxjs';
// class類別 儘量放會需要實作的東西
// interface介面 單純需要定義資料型別


export interface IExhibitions {
    version: string;
    UID: string;
    title: string;
    category: string;
    showInfo: IShowInfo[];
    showUnit: string;
    discountInfo: string;
    descriptionFilterHtml: string;
    imageUrl?: string;
    masterUnit: string[];
    subUnit: string[];
    supportUnit: string[];
    otherUnit: string[];
    webSales: string;
    sourceWebPromote: string;
    comment: string;
    editModifyDate: string;
    sourceWebName: string;
    startDate: string;
    endDate: string;
    hitRate: number;
}

export interface IShowInfo {
    time: string;
    location: string;
    locationName: string;
    onSales: ONSALES;
    price: string;
    latitude: null | string;
    longitude: null | string;
    endTime: string;
}

export enum ONSALES {
    N = "N",
    Y = "Y",
}


//

export class CExhibitions {
    constructor(
        public version: string,
        public UID: string,
        public title: string,
        public category: string,
        public showInfo: CShowInfo[],
        public showUnit: string,
        public discountInfo: string,
        public descriptionFilterHtml: string,
        public imageUrl: string,
        public masterUnit: string[],
        public subUnit: string[],
        public supportUnit: string[],
        public otherUnit: string[],
        public webSales: string,
        public sourceWebPromote: string,
        public comment: string,
        public editModifyDate: string,
        public sourceWebName: string,
        public startDate: string,
        public endDate: string,
        public hitRate: number,
    ) { }

}

export class CShowInfo {
    constructor(
        public time: string,
        public location: string,
        public locationName: string,
        public onSales: CONSALES,
        public price: string,
        public latitude: null | string,
        public longitude: null | string,
        public endTime: string,
    ) { }
}

export enum CONSALES {
    N = "N",
    Y = "Y",
}



export class CDataInfo {
    _dataOb: Observable<CExhibitions[]>;
    _dataLength: number;
    constructor() {
        this._dataOb = new Observable<CExhibitions[]>;
        this._dataLength = 0;
    };

    // setData(targetdataOb :Observable<CExhibitions[]>) {
    //     this._dataOb=targetdataOb;
    //     this._dataOb.subscribe(s => this._dataLength = s.length);
    // }
}