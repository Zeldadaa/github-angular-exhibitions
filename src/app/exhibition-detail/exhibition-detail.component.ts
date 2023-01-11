import { map, Observable } from 'rxjs';
import { ActivatedRoute, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exhibition-detail',
  templateUrl: './exhibition-detail.component.html',
  styleUrls: ['./exhibition-detail.component.scss']
})
export class ExhibitionDetailComponent implements OnInit {

  uid?: Observable<string | null>;

  constructor(private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.uid = this.route.paramMap.pipe(map(m => m.get('uid')));
  }
}
