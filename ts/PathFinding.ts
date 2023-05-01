import { Grid } from './Grid';
import { Node } from './Node';
import { Vector } from './Vector';

/**
 * Implements A* algorithm to find the shortest path from one node to another
 */
export class PathFinding {
  grid: Grid;

  constructor(grid: Grid) {
    this.grid = grid;
  }

  /**
   *
   * @param startPosition position of starting node
   * @param targetPosition  position of target node
   * @returns the shortest path from starting node to target node. Starting node is excluded, target node is included
   */
  findPath(startPosition: Vector, targetPosition: Vector) {
    let openSet: Node[] = [];
    const closedSet = new Set<Node>();
    const startNode = this.grid.getNode(startPosition);
    const targetNode = this.grid.getNode(targetPosition);
    openSet.push(startNode);

    while (openSet.length > 0) {
      let currentNode = openSet[0];
      // Set current node as the node from open set with the lowest f and h cost
      for (let i = 1; i < openSet.length; i++) {
        if (
          openSet[i].fCost < currentNode.fCost ||
          (openSet[i].fCost == currentNode.fCost &&
            openSet[i].hCost < currentNode.hCost)
        ) {
          currentNode = openSet[i];
        }
      }
      // Delete current node from open set and add it to the closed set
      openSet = openSet.filter((node) => node !== currentNode);
      closedSet.add(currentNode);

      // We find target node and retrace a path
      if (currentNode == targetNode) {
        return this.retracePath(startNode, targetNode);
      }

      // Checking all neighbours
      const [neighbours] = this.grid.getNeighbours(currentNode);
      neighbours.forEach((neighbour) => {
        // Wall or already has been a current node
        if (!neighbour.walkable || closedSet.has(neighbour)) return;

        const newMovementCostToNeighbour =
          currentNode.gCost + this.getDistance(currentNode, neighbour);

        // Path to the neightbour (g cost) is lower than previous one or we haven't already reveal that node
        if (
          newMovementCostToNeighbour < neighbour.gCost ||
          !openSet.includes(neighbour)
        ) {
          // Setting new data to the node
          neighbour.gCost = newMovementCostToNeighbour;
          neighbour.hCost = this.getDistance(neighbour, targetNode);
          neighbour.parent = currentNode;

          // Adding to the open set if not present in it
          if (!openSet.includes(neighbour)) openSet.push(neighbour);
        }
      });
    }
    return null;
  }

  /**
   * Retrace the path using parent property
   * @param startNode starting node
   * @param endNode target node
   * @returns path from starting node to target node. Starting node is excluded, target node is included
   */
  private retracePath(startNode: Node, endNode: Node) {
    const path: Node[] = [];
    let currentNode = endNode;

    while (currentNode !== startNode) {
      path.push(currentNode);
      currentNode = currentNode.parent;
    }

    path.reverse();
    return path;
  }

  /**
   *
   * @param nodeA
   * @param nodeB
   * @returns Distance between nodeA and nodeB, diagonals are ommited
   */
  getDistance(nodeA: Node, nodeB: Node) {
    const dstX = Math.abs(nodeA.position.x - nodeB.position.x);
    const dstY = Math.abs(nodeA.position.y - nodeB.position.y);
    return dstX + dstY;
  }
}
