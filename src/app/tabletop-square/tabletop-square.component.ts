import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabletop-square',
  templateUrl: './tabletop-square.component.html',
  styleUrls: ['./tabletop-square.component.scss']
})
export class TabletopSquareComponent implements OnInit {

  @Input() robot: boolean;
  @Input() direction: string;

  constructor() { }

  ngOnInit(): void {
  }

}
