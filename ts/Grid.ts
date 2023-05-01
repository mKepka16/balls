import { Vector, VectorI } from './Vector';

import { Node } from './Node';

/**
 * Abstract grid class, containing the logic of basic grid operations
 */
export class Grid {
  nodes: Node[] = [];
  width: number;
  height: number;

  /**
   *
   * @param width number of cells in the row
   * @param height number of cells in the column
   * @param walls (optional) not traversable nodes positions
   */
  constructor(width: number, height: number, walls: Vector[] = []) {
    this.width = width;
    this.height = height;
    this.nodes = Array(width * height)
      .fill(null)
      .map((_, index) => {
        const x = index % this.width;
        const y = Math.floor(index / this.width);
        const isWalkable = walls.find((wall) => wall.x === x && wall.y === y)
          ? false
          : true;
        return new Node(new Vector(x, y), isWalkable);
      });
  }

  getNode({ x, y }: Vector) {
    return (
      this.nodes.find(
        (node) => node.position.x === x && node.position.y === y
      ) || null
    );
  }

  /**
   *
   * @param node
   * @returns Get all neighbour nodes of given node, diagonals are excluded
   */
  getNeighbours(node: Node): [Node[], boolean] {
    const neighbours: Node[] = [];

    const cords = [
      new Vector(0, -1),
      new Vector(0, 1),
      new Vector(-1, 0),
      new Vector(1, 0),
    ];

    let isNextToBorder = false;

    cords.forEach(({ x, y }) => {
      const checkX = node.position.x + x;
      const checkY = node.position.y + y;

      const neighbour = this.getNode(new Vector(checkX, checkY));
      if (neighbour !== null) {
        neighbours.push(neighbour);
      } else {
        isNextToBorder = true;
      }
    });

    return [neighbours, isNextToBorder];
  }

  getNeighboursWithDiagonals(node: Node): Node[] {
    const neighbours: Node[] = [];

    const cords = [
      new Vector(0, -1),
      new Vector(0, 1),
      new Vector(-1, 0),
      new Vector(1, 0),
      new Vector(1, 1),
      new Vector(-1, -1),
      new Vector(1, -1),
      new Vector(-1, 1),
    ];

    cords.forEach(({ x, y }) => {
      const checkX = node.position.x + x;
      const checkY = node.position.y + y;

      const neighbour = this.getNode(new Vector(checkX, checkY));
      if (neighbour !== null) {
        neighbours.push(neighbour);
      }
    });

    return neighbours;
  }
  getSameColorNeighboursWithDiagonals(node: Node): Node[] {
    const neighbours = this.getNeighboursWithDiagonals(node);
    return neighbours.filter(
      (neighbour) => neighbour.ballColor === node.ballColor
    );
  }

  getAllConnectedBalls(node: Node, visited: Node[]) {
    visited.push(node);
    const neighbours = this.getSameColorNeighboursWithDiagonals(node);
    neighbours.forEach((neighbour) => {
      if (visited.includes(neighbour) == false) {
        this.getAllConnectedBalls(neighbour, visited);
      }
    });
  }
}
