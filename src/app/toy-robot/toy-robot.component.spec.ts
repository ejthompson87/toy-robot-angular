import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToyRobotComponent } from './toy-robot.component';
import { NgForm, FormsModule } from '@angular/forms';
import { Direction } from '../models/direction';

describe('ToyRobotComponent', () => {
  let component: ToyRobotComponent;
  let fixture: ComponentFixture<ToyRobotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ ToyRobotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToyRobotComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add command to command history', () => {
    const command = 'Some string';
    component.command = command;
    component.onCommand();
    const findCommand = component.commandHistory.filter(x =>  x.command === command);
    expect(findCommand.length > 0).toBeTruthy();
  });

  const testValidMoveCommands = [
    { position: { x: 1, y: 1, direction: Direction.north }, expect: { x: 1, y: 2, direction: Direction.north } },
    { position: { x: 1, y: 4, direction: Direction.south }, expect: { x: 1, y: 3, direction: Direction.south } },
    { position: { x: 1, y: 1, direction: Direction.east }, expect: { x: 2, y: 1, direction: Direction.east } },
    { position: { x: 4, y: 1, direction: Direction.west }, expect: { x: 3, y: 1, direction: Direction.west } },
  ];
  testValidMoveCommands.forEach(test => {
    it(`should move with valid MOVE command: when at position ${test.position.x + 1},${test.position.y + 1} facing ${test.position.direction} should be able to move`, () => {
      component.robotPosition = test.position;
      component.executeCommand('MOVE');
      expect(component.robotPosition).toEqual(test.expect);
    });
  });

  const testInvalidMoveCommands = [
    { position: { x: 0, y: 4, direction: Direction.north } },
    { position: { x: 1, y: 4, direction: Direction.south } },
    { position: { x: 4, y: 1, direction: Direction.east } },
    { position: { x: 0, y: 1, direction: Direction.west } }
  ];
  testInvalidMoveCommands.forEach(test => {
    it(`should not move with invalid MOVE command: when at position ${test.position.x + 1},${test.position.y + 1} facing ${test.position.direction} should not be able to move`, () => {
      component.robotPosition = test.position;
      component.executeCommand('MOVE');
      expect(component.robotPosition).toEqual(test.position);
    });
  });

  const testDirectionCases = [
    { command: 'LEFT', direction: Direction.west, expect: Direction.south },
    { command: 'LEFT', direction: Direction.south, expect: Direction.east },
    { command: 'RIGHT', direction: Direction.east, expect: Direction.south },
    { command: 'RIGHT', direction: Direction.south, expect: Direction.west }
  ];
  testDirectionCases.forEach(test => {
    it(`should change direction from ${test.direction} to ${test.expect} for ${test.command} commands`, () => {
      component.robotPosition = { x: 1, y: 1, direction: test.direction };
      component.executeCommand(test.command);
      expect(component.robotPosition.direction).toEqual(test.expect);
    });
  });

  it('should print current robot position on REPORT command', () => {
    component.robotPosition = { x: 1, y: 1, direction: Direction.north };
    component.executeCommand('REPORT');
    const report = `X: ${component.robotPosition.x + 1}, Y: ${component.robotPosition.y + 1}, Direction: ${component.robotPosition.direction}`;
    const findCommand = component.commandHistory.filter(x =>  x.command === report);
    expect(findCommand.length > 0).toBeTruthy();
  });

  const testOtherCommands = ['LEFT', 'MOVE', 'REPORT'];
  testOtherCommands.forEach((cmd) => {
    it(`should not allow ${cmd} commands until valid PLACE command made`, () => {
      component.isValidCommand(cmd);
      expect(component.errorMessage).toEqual('Invalid command - You must first place robot');
    });
  });

  const testInvalidPlaceCommands = [
    'PLACE 12 2 NORTH',
    'PLACE 2 2 somewhere',
    'Test 3 3 NORTH',
    'PLACE'
  ];
  testInvalidPlaceCommands.forEach(cmd => {
    it(`should not place robot on invalid PLACE command: ${cmd}`, () => {
      component.isValidCommand(cmd);
      expect(component.robotPlaced).toBeFalsy();
    });
  });

  const validPlaceCommands = [
    'PLACE 2 4 NORTH',
    'PLACE 2 2 East',
    'PLACE 1 1 SOUTH',
    'PLACE 4 2 west'
  ];
  validPlaceCommands.forEach(cmd => {
    it(`should place robot on valid PLACE command: ${cmd}`, () => {
      component.isValidCommand(cmd);
      expect(component.robotPlaced).toBeTruthy();
    });
  });
});
