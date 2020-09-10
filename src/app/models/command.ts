import { Direction } from './direction';

export enum Command {
    move = 'MOVE',
    left = 'LEFT',
    right = 'RIGHT',
    report = 'REPORT'
}

export interface PlaceCommand {
    x: number;
    y: number;
    direction: Direction;
}
