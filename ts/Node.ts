import { Vector } from './Vector';

export interface NodeI {
  position: Vector;
  walkable: boolean;
  gCost: number;
  hCost: number;
  parent: Node;
}

/**
 * Grid cell
 */
export class Node implements NodeI {
  position: Vector;
  walkable: boolean;
  gCost: number;
  hCost: number;
  parent: Node;
  ballColor: string;
  isActive: boolean;

  /**
   *
   * @param position starting position of node
   * @param walkable if true ball can move through it
   */
  constructor(position: Vector, walkable: boolean) {
    this.position = position;
    this.walkable = walkable;
    this.gCost = 0;
    this.hCost = 0;
  }

  public get fCost() {
    return this.gCost + this.hCost;
  }

  /**
   *  Put the ball with specific color
   * @param color color of ball
   */
  putBall(color: string) {
    this.ballColor = color;
    this.walkable = false;
    this.DOM.classList.add('with_ball');

    const ballDOM = document.createElement('div');
    ballDOM.classList.add('ball');
    ballDOM.style.backgroundColor = color;
    this.DOM.appendChild(ballDOM);
  }

  /**
   * Remove ball from the node
   */
  takeOutBall() {
    this.ballColor = undefined;
    this.walkable = true;
    this.DOM.classList.remove('with_ball');
    this.DOM.innerHTML = '';
    this.setActivity(false);
  }

  /**
   * Get the coresponding div
   */
  public get DOM(): HTMLElement {
    return document.querySelector(
      `[data-x="${this.position.x}"][data-y="${this.position.y}"]`
    );
  }
  /**
   *
   * @param isActive if true, cell have a green border, otherwise gray
   */
  public setActivity(isActive: boolean) {
    this.isActive = isActive;
    if (isActive) {
      this.DOM.classList.add('active');
    } else {
      this.DOM.classList.remove('active');
    }
  }
}
