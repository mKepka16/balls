import { Color } from './colors';
import { Grid } from './Grid';
import { Node } from './Node';
import { PathFinding } from './PathFinding';
import { Points } from './Points';
import { Preview } from './Preview';
import { Vector } from './Vector';

/**
 * Set light theme to the game
 * @param target Target class
 */
function LightTheme(target: Function) {
  document.body.classList.add('light_theme');
}

/**
 * Main game class, layer on top of grid class containing event handlers, animations and DOM manipulations
 */
@LightTheme
export class GameGrid extends Grid {
  preview: Preview;
  activeNode: Node | null = null;
  emptyNodeUnderTheCursor: Node | null = null;
  pathFinder: PathFinding;
  currentPath: Node[] | null = [];
  isInteractive: boolean = true;
  nextBallsColors: [string, string, string];
  score: Points = new Points();
  startDate: Date | null = null;

  constructor(DOMAnchor: HTMLElement) {
    super(9, 9, []);
    this.renderGrid(DOMAnchor);
    this.preparePreview();
    this.addNewBalls();
    this.addEventsToNodes();
    this.pathFinder = new PathFinding(this);
  }

  /**
   * Sets up the preview
   */
  private preparePreview() {
    this.preview = new Preview(document.querySelector('.preview_parent'));
    this.nextBallsColors = Color.getThreeRandom();
    this.preview.setPreview(this.nextBallsColors);
  }

  /**
   * Add 3 balls to the grid, and update the preview with 3 new balls
   */
  private addNewBalls() {
    if (this.canAddThreeBalls() === false) {
      this.handlePlayerLost();
      return;
    }
    let ballsCount = 0;
    while (ballsCount < 3) {
      let freeNodes = this.nodes.filter((node) => node.walkable);
      const randomNodeIndex = Math.floor(
        Math.random() * (freeNodes.length - 1)
      );
      const node = freeNodes[randomNodeIndex];
      if (node.walkable === true) {
        node.putBall(this.nextBallsColors[ballsCount]);
        ballsCount++;
      }
    }
    this.nextBallsColors = Color.getThreeRandom();
    this.preview.setPreview(this.nextBallsColors);

    // Checking if new balls can destroy other balls
    this.nodes.forEach((node) => {
      if (node.walkable === false) {
        this.destroyBalls(node);
        console.log('yo');
      }
    });
  }

  /**
   *
   * @returns returns true if there are at least 4 free nodes
   */
  private canAddThreeBalls(): boolean {
    let freeNodes = 0;
    this.nodes.forEach((node) => {
      if (node.walkable === true) {
        freeNodes++;
      }
    });
    return freeNodes >= 4;
  }

  /**
   * Displays alert with player point and play time, reloads the page
   */
  private handlePlayerLost() {
    const timePassed = Date.now() - this.startDate.getTime();
    alert(
      `You've lost. Your points ${
        this.score.points
      }. You've played for ${Math.ceil(timePassed / 1000 / 60)}minutes`
    );
    window.location.reload();
  }

  /**
   * Grid setup
   * @param DOMAnchor grid parent
   */
  private renderGrid(DOMAnchor: HTMLElement) {
    const gridDOM = document.createElement('div');
    gridDOM.classList.add('grid');

    this.nodes.forEach((node) => {
      const nodeDOM = document.createElement('div');
      nodeDOM.classList.add('node');
      nodeDOM.dataset.x = node.position.x.toString();
      nodeDOM.dataset.y = node.position.y.toString();
      gridDOM.appendChild(nodeDOM);
    });
    DOMAnchor.appendChild(gridDOM);
  }

  /**
   * Add mouse events to all nodes
   */
  private addEventsToNodes() {
    this.nodes.forEach((node) => {
      node.DOM.onclick = () => this.isInteractive && this.handleNodeClick(node);
      node.DOM.onmouseenter = () =>
        this.isInteractive && this.handleMouseInsideNode(node);
      node.DOM.onmouseleave = () =>
        this.isInteractive && this.handleMouseOutsideNode(node);
    });
  }

  /**
   * Basic node click handler
   * @param node
   */
  private handleNodeClick(node: Node) {
    if (node.walkable === false) this.handleBallClick(node);

    if (this.currentPath !== null) {
      this.moveBall(node);
    }
  }

  /**
   *
   * @param node
   * @returns Fires when node containing the ball is clicked
   */
  private handleBallClick(node: Node) {
    const [neightbours, isNextToBorder] = this.getNeighbours(node);
    const isBlocked = neightbours.every(
      (neightbour) => neightbour.walkable === false
    );
    if (isBlocked) return;
    this.renderPath(null);
    if (this.activeNode === node) {
      node.setActivity(false);
      this.activeNode = null;
      return;
    }
    if (this.activeNode !== null) {
      this.activeNode.setActivity(false);
    }
    this.activeNode = node;
    node.setActivity(true);
  }

  /**
   *  Tracks the node under the player's cursor
   * @param node
   */
  private handleMouseInsideNode(node: Node) {
    if (node.walkable === true && this.activeNode !== null) {
      this.emptyNodeUnderTheCursor = node;
      const path = this.pathFinder.findPath(
        this.activeNode.position,
        node.position
      );
      if (path !== null) {
        node.DOM.classList.add('potential_target');
        this.renderPath(path);
      }
    }
    if (node.walkable === false) {
      this.renderPath(null);
    }
  }

  /**
   * Render the path on the grid
   * @param path
   */
  private renderPath(path: Node[] | null) {
    if (this.currentPath !== null) {
      this.currentPath.forEach((node) => {
        node.DOM.classList.remove('in_path');
      });
    }

    this.currentPath = path;

    if (path !== null) {
      path.forEach((node) => {
        node.DOM.classList.add('in_path');
      });
    }
  }

  /**
   *  Moves active ball to the target node
   * @param targetNode
   */
  private moveBall(targetNode: Node) {
    this.isInteractive = false;
    const pathToAnimate = [...this.currentPath];
    this.renderPath(null);
    const ballColor = this.activeNode.ballColor;
    // this.activeNode.takeOutBall();
    this.activeNode.setActivity(false);
    let currentPathIndex = 0;
    const interval = setInterval(() => {
      if (currentPathIndex < pathToAnimate.length) {
        const node = pathToAnimate[currentPathIndex];
        node.putBall(ballColor);
        if (currentPathIndex == 0) this.activeNode.takeOutBall();
        else pathToAnimate[currentPathIndex - 1].takeOutBall();
        currentPathIndex++;
      } else {
        this.isInteractive = true;
        clearInterval(interval);
        targetNode.DOM.classList.remove('potential_target');
        this.activeNode = null;
        this.onBallMoveDone(targetNode);
      }
    }, 40);
  }

  /**
   * Fires when ball successfully moves and the animation is finished
   */
  private onBallMoveDone(newNode: Node) {
    if (this.startDate === null) this.startDate = new Date();
    const ballsDestroyed = this.destroyBalls(newNode);
    if (ballsDestroyed === false) {
      this.addNewBalls();
    }
  }

  private destroyBalls(startingNode: Node): boolean {
    const allNodesToDestroy: Set<Node> = new Set();
    const directons = [
      new Vector(0, -1), // up
      new Vector(-1, 0), // left
      new Vector(-1, -1), // up left
      new Vector(1, -1), // up right
    ];
    directons.forEach((currentDirection) => {
      const nodesToDestroy: Set<Node> = new Set();
      nodesToDestroy.add(startingNode);
      let currentNode = startingNode;
      let length = 0;
      while (
        currentNode !== null &&
        currentNode.ballColor === startingNode.ballColor
      ) {
        length++;
        nodesToDestroy.add(currentNode);
        currentNode = this.getNode(currentNode.position.add(currentDirection));
      }

      const oppositeDirection = currentDirection.multiply(-1);
      currentNode = startingNode;

      while (
        currentNode !== null &&
        currentNode.ballColor === startingNode.ballColor
      ) {
        length++;
        nodesToDestroy.add(currentNode);
        currentNode = this.getNode(currentNode.position.add(oppositeDirection));
      }
      length--;
      if (length >= 5) {
        nodesToDestroy.forEach((node) => allNodesToDestroy.add(node));
      }
    });

    this.score.points += allNodesToDestroy.size;
    allNodesToDestroy.forEach((node) => {
      console.log(node.position.x, node.position.y);
      node.takeOutBall();
    });

    return allNodesToDestroy.size > 0;
  }

  /**
   * Tracks when player move the cursor outside the node
   * @param node Node that cursor left
   */
  private handleMouseOutsideNode(node: Node) {
    if (this.emptyNodeUnderTheCursor == node) {
      this.emptyNodeUnderTheCursor = null;
      node.DOM.classList.remove('potential_target');
    }
  }
}
