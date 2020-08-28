import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabletopSquareComponent } from './tabletop-square.component';

describe('TabletopSquareComponent', () => {
  let component: TabletopSquareComponent;
  let fixture: ComponentFixture<TabletopSquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabletopSquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabletopSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
