import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CExhibitions } from '../classes.component';

@Component({
  selector: 'app-exhibition-search',
  templateUrl: './exhibition-search.component.html',
  styleUrls: ['./exhibition-search.component.scss']
})
export class ExhibitionSearchComponent implements OnInit {
  data_exhibitions?: Observable<CExhibitions[]>;



  constructor() {

  }

  ngOnInit(): void {

  }




}
