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
  public instructions: string = "Allowed commands: PLACE X Y DIRECTION (eg: PLACE 1 1 WEST), MOVE, LEFT, RIGHT, REPORT";
  public errorMessage: string;

  public command: string;
  public commandHistory: Array<CommandHistory> = [];

  constructor() { }

  ngOnInit(): void {
  }

  onCommand() { 
    this.errorMessage = "";
    if (this.command !== '') {
      let currentCommand: CommandHistory = {
        command: this.command,
        valid: this.isValidCommand(this.command)
      }
      this.commandHistory.push(currentCommand);
    }
    this.command = "";
  }

  isValidCommand(command: string): boolean {
    command = command.toUpperCase();
    if (command.includes("PLACE")) {
      return this.isValidPlace(command);
    }
    if (!this.robotPlaced) {
      this.errorMessage = "Invalid command - You must first place robot"
      return false;
    }
    for (let type of Object.values(Command)) {
      if (type === command) {
        this.executeCommand(command);
        return true;
      }
    }
    this.errorMessage = this.getErrorMessage(this.robotPlaced);
    return false;
  }

  isValidPlace(command: string): boolean {
    let commands = command.split(" ");
    if (commands[0].toUpperCase() === "PLACE" && commands.length >= 4) {
      let x = this.getNumber(commands[1]);
      let y = this.getNumber(commands[2]);
      if (x > -1 && y > -1) {
        for (let direction of Object.values(Direction)) {
          if (commands[3].toUpperCase() === direction) {
            this.robotPosition = {
              x: x,
              y: y,
              direction: direction
            }
            this.robotPlaced = true;
            return true;
          }
        }
      } else {
        this.errorMessage = "Invalid command - Robot can only by placed on 5 x 5 table";
        return false;
      }
    }
    this.errorMessage = this.getErrorMessage(this.robotPlaced);
    return false;
  }

  getNumber(str: string) {
    let num = Number(str);
    if (!isNaN(num) && num > 0 && num < 6) {
      return num - 1;
    }
    return -1;
  }

  getErrorMessage(robotPlaced: boolean) {
    if (robotPlaced) {
      return "Invalid command - try MOVE, LEFT, RIGHT or REPORT";
    }
    return "Invalid command - try PLACE 1 2 NORTH";
  }

  executeCommand(command) {
    switch (command) {
      case "MOVE": 
        if (this.robotPosition.direction === Direction.north) {
          if (this.robotPosition.y < 4) {
            this.robotPosition.y++;
            return;
          }
        }
        if (this.robotPosition.direction === Direction.south) {
          if (this.robotPosition.y > 0) {
            this.robotPosition.y--;
            return;
          }
        }
        if (this.robotPosition.direction === Direction.east) {
          if (this.robotPosition.x < 4) {
            this.robotPosition.x ++;
            return;
          }
        }
        if (this.robotPosition.direction === Direction.west) {
          if (this.robotPosition.x > 0) {
            this.robotPosition.x --;
            return;
          }
        }
        this.errorMessage = "Robot refuses. He would fall off the table.";
        return;

      case "LEFT":
        if (this.robotPosition.direction === Direction.north) {
          this.robotPosition.direction = Direction.west;
          return;
        }
        if (this.robotPosition.direction === Direction.west) {
          this.robotPosition.direction = Direction.south;
          return;
        }
        if (this.robotPosition.direction === Direction.south) {
          this.robotPosition.direction = Direction.east;
          return;
        }
        if (this.robotPosition.direction === Direction.east) {
          this.robotPosition.direction = Direction.north;
          return;
        }

        case "RIGHT":
        if (this.robotPosition.direction === Direction.north) {
          this.robotPosition.direction = Direction.east;
          return;
        }
        if (this.robotPosition.direction === Direction.east) {
          this.robotPosition.direction = Direction.south;
          return;
        }
        if (this.robotPosition.direction === Direction.south) {
          this.robotPosition.direction = Direction.west;
          return;
        }
        if (this.robotPosition.direction === Direction.west) {
          this.robotPosition.direction = Direction.north;
          return;
        }
          
      case "REPORT":
        this.commandHistory.push({command: `X: ${this.robotPosition.x+1}, Y: ${this.robotPosition.y+1}, Direction: ${this.robotPosition.direction}`, valid: true, isReport: true});
        return;
    }
  }

}
