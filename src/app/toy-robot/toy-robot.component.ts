import { Component, OnInit } from '@angular/core';
import { CommandHistory } from '../models/command-history';
import { Command } from '../models/command';
import { Direction } from '../models/direction';
import { RobotPosition } from '../models/robot';

@Component({
  selector: 'app-toy-robot',
  templateUrl: './toy-robot.component.html',
  styleUrls: ['./toy-robot.component.scss']
})
export class ToyRobotComponent implements OnInit {

  public robotPlaced: boolean = false;
  public robotPosition: RobotPosition;
  public command: string;
  public commandHistory: Array<CommandHistory> = [];
  public errorMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

  onCommand(): void {
    this.errorMessage = '';
    if (this.command !== '') {
      const command = this.command.toUpperCase();
      const validCommand = this.isValidCommand(command);
      if (validCommand) {
        this.executeCommand(command);
      }
      const currentCommand: CommandHistory = {
        command: this.command,
        valid: validCommand
      };
      this.commandHistory.push(currentCommand);
    }
    this.command = '';
  }

  isValidCommand(command: string): boolean {
    if (command.includes('PLACE')) {
      return this.isValidPlaceCommand(command);
    }
    if (!this.robotPlaced) {
      this.errorMessage = 'Invalid command - You must first place robot';
      return false;
    }
    for (const type of Object.values(Command)) {
      if (type === command) {
        return true;
      }
    }
    this.errorMessage = this.getErrorMessage(this.robotPlaced);
    return false;
  }

  isValidPlaceCommand(command: string): boolean {
    const commands = command.split(' ');
    if (commands[0].toUpperCase() === 'PLACE' && commands.length >= 4) {
      const x = this.getPositionNumber(commands[1]);
      const y = this.getPositionNumber(commands[2]);
      if (x > -1 && y > -1) {
        for (const direction of Object.values(Direction)) {
          if (commands[3].toUpperCase() === direction) {
            this.robotPosition = { x, y, direction };
            this.robotPlaced = true;
            return true;
          }
        }
      } else {
        this.errorMessage = 'Invalid command - Robot can only by placed on 5 x 5 table';
        return false;
      }
    }
    this.errorMessage = this.getErrorMessage(this.robotPlaced);
    return false;
  }

  getPositionNumber(str: string): number {
    const num = Number(str);
    if (!isNaN(num) && num > 0 && num < 6) {
      return num - 1;
    }
    return -1;
  }

  getErrorMessage(robotPlaced: boolean): string {
    if (robotPlaced) {
      return 'Invalid command - try MOVE, LEFT, RIGHT or REPORT';
    }
    return 'Invalid command - try PLACE 1 2 NORTH';
  }

  executeCommand(command: string): void {
    switch (command) {
      case Command.move:
        this.moveRobot();
        break;

      case Command.left:
        this.turnRobot(Command.left);
        break;

      case Command.right:
        this.turnRobot(Command.right);
        break;

      case Command.report:
        this.commandHistory.push({command: `X: ${this.robotPosition.x + 1}, Y: ${this.robotPosition.y + 1}, Direction: ${this.robotPosition.direction}`, valid: true, isReport: true});
        break;
    }
  }

  moveRobot(): void {
    if (this.robotPosition.direction === Direction.north && this.robotPosition.y < 4) {
      this.robotPosition.y++;
      return;
    }
    if (this.robotPosition.direction === Direction.south && this.robotPosition.y > 0) {
      this.robotPosition.y--;
      return;
    }
    if (this.robotPosition.direction === Direction.east && this.robotPosition.x < 4) {
      this.robotPosition.x++;
      return;
    }
    if (this.robotPosition.direction === Direction.west && this.robotPosition.x > 0) {
      this.robotPosition.x --;
      return;
    }
    this.errorMessage = 'Robot refuses. He would fall off the table.';
  }

  turnRobot(turn: Command.left | Command.right): void {
    if (turn === Command.left) {
      switch (this.robotPosition.direction) {
        case Direction.north:
          this.robotPosition.direction =  Direction.west;
          break;
        case Direction.west:
          this.robotPosition.direction = Direction.south;
          break;
        case Direction.south:
          this.robotPosition.direction = Direction.east;
          break;
        case Direction.east:
          this.robotPosition.direction = Direction.north;
          break;
      }
    }
    if (turn === Command.right) {
      switch (this.robotPosition.direction) {
        case Direction.north:
          this.robotPosition.direction = Direction.east;
          break;
        case Direction.east:
          this.robotPosition.direction = Direction.south;
          break;
        case Direction.south:
          this.robotPosition.direction = Direction.west;
          break;
        case Direction.west:
          this.robotPosition.direction = Direction.north;
          break;
      }
    }
  }

}
