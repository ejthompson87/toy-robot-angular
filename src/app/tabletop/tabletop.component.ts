import { Component, OnInit, Input } from '@angular/core';
import { RobotPosition } from '../models/robot';

@Component({
  selector: 'app-tabletop',
  templateUrl: './tabletop.component.html',
  styleUrls: ['./tabletop.component.scss']
})
export class TabletopComponent implements OnInit {

  @Input() robotPosition: RobotPosition;
  @Input() robotPlaced: boolean;

  tableX: Array<number> = [0,1,2,3,4];
  tableY: Array<number> = [4,3,2,1,0];
 
  constructor() { }

  ngOnInit(): void {
  }

}
