/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/GameGrid.ts":
/*!************************!*\
  !*** ./ts/GameGrid.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameGrid\": () => (/* binding */ GameGrid)\n/* harmony export */ });\n/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors */ \"./ts/colors.ts\");\n/* harmony import */ var _Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Grid */ \"./ts/Grid.ts\");\n/* harmony import */ var _PathFinding__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PathFinding */ \"./ts/PathFinding.ts\");\n/* harmony import */ var _Points__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Points */ \"./ts/Points.ts\");\n/* harmony import */ var _Preview__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Preview */ \"./ts/Preview.ts\");\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Vector */ \"./ts/Vector.ts\");\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\n\n\n\n\n\n\n/**\n * Set light theme to the game\n * @param target Target class\n */\nfunction LightTheme(target) {\n    document.body.classList.add('light_theme');\n}\n/**\n * Main game class, layer on top of grid class containing event handlers, animations and DOM manipulations\n */\nlet GameGrid = class GameGrid extends _Grid__WEBPACK_IMPORTED_MODULE_1__.Grid {\n    constructor(DOMAnchor) {\n        super(9, 9, []);\n        this.activeNode = null;\n        this.emptyNodeUnderTheCursor = null;\n        this.currentPath = [];\n        this.isInteractive = true;\n        this.score = new _Points__WEBPACK_IMPORTED_MODULE_3__.Points();\n        this.startDate = null;\n        this.renderGrid(DOMAnchor);\n        this.preparePreview();\n        this.addNewBalls();\n        this.addEventsToNodes();\n        this.pathFinder = new _PathFinding__WEBPACK_IMPORTED_MODULE_2__.PathFinding(this);\n    }\n    /**\n     * Sets up the preview\n     */\n    preparePreview() {\n        this.preview = new _Preview__WEBPACK_IMPORTED_MODULE_4__.Preview(document.querySelector('.preview_parent'));\n        this.nextBallsColors = _colors__WEBPACK_IMPORTED_MODULE_0__.Color.getThreeRandom();\n        this.preview.setPreview(this.nextBallsColors);\n    }\n    /**\n     * Add 3 balls to the grid, and update the preview with 3 new balls\n     */\n    addNewBalls() {\n        if (this.canAddThreeBalls() === false) {\n            this.handlePlayerLost();\n            return;\n        }\n        let ballsCount = 0;\n        while (ballsCount < 3) {\n            let freeNodes = this.nodes.filter((node) => node.walkable);\n            const randomNodeIndex = Math.floor(Math.random() * (freeNodes.length - 1));\n            const node = freeNodes[randomNodeIndex];\n            if (node.walkable === true) {\n                node.putBall(this.nextBallsColors[ballsCount]);\n                ballsCount++;\n            }\n        }\n        this.nextBallsColors = _colors__WEBPACK_IMPORTED_MODULE_0__.Color.getThreeRandom();\n        this.preview.setPreview(this.nextBallsColors);\n        // Checking if new balls can destroy other balls\n        this.nodes.forEach((node) => {\n            if (node.walkable === false) {\n                this.destroyBalls(node);\n                console.log('yo');\n            }\n        });\n    }\n    /**\n     *\n     * @returns returns true if there are at least 4 free nodes\n     */\n    canAddThreeBalls() {\n        let freeNodes = 0;\n        this.nodes.forEach((node) => {\n            if (node.walkable === true) {\n                freeNodes++;\n            }\n        });\n        return freeNodes >= 4;\n    }\n    /**\n     * Displays alert with player point and play time, reloads the page\n     */\n    handlePlayerLost() {\n        const timePassed = Date.now() - this.startDate.getTime();\n        alert(`You've lost. Your points ${this.score.points}. You've played for ${Math.ceil(timePassed / 1000 / 60)}minutes`);\n        window.location.reload();\n    }\n    /**\n     * Grid setup\n     * @param DOMAnchor grid parent\n     */\n    renderGrid(DOMAnchor) {\n        const gridDOM = document.createElement('div');\n        gridDOM.classList.add('grid');\n        this.nodes.forEach((node) => {\n            const nodeDOM = document.createElement('div');\n            nodeDOM.classList.add('node');\n            nodeDOM.dataset.x = node.position.x.toString();\n            nodeDOM.dataset.y = node.position.y.toString();\n            gridDOM.appendChild(nodeDOM);\n        });\n        DOMAnchor.appendChild(gridDOM);\n    }\n    /**\n     * Add mouse events to all nodes\n     */\n    addEventsToNodes() {\n        this.nodes.forEach((node) => {\n            node.DOM.onclick = () => this.isInteractive && this.handleNodeClick(node);\n            node.DOM.onmouseenter = () => this.isInteractive && this.handleMouseInsideNode(node);\n            node.DOM.onmouseleave = () => this.isInteractive && this.handleMouseOutsideNode(node);\n        });\n    }\n    /**\n     * Basic node click handler\n     * @param node\n     */\n    handleNodeClick(node) {\n        if (node.walkable === false)\n            this.handleBallClick(node);\n        if (this.currentPath !== null) {\n            this.moveBall(node);\n        }\n    }\n    /**\n     *\n     * @param node\n     * @returns Fires when node containing the ball is clicked\n     */\n    handleBallClick(node) {\n        const [neightbours, isNextToBorder] = this.getNeighbours(node);\n        const isBlocked = neightbours.every((neightbour) => neightbour.walkable === false);\n        if (isBlocked)\n            return;\n        this.renderPath(null);\n        if (this.activeNode === node) {\n            node.setActivity(false);\n            this.activeNode = null;\n            return;\n        }\n        if (this.activeNode !== null) {\n            this.activeNode.setActivity(false);\n        }\n        this.activeNode = node;\n        node.setActivity(true);\n    }\n    /**\n     *  Tracks the node under the player's cursor\n     * @param node\n     */\n    handleMouseInsideNode(node) {\n        if (node.walkable === true && this.activeNode !== null) {\n            this.emptyNodeUnderTheCursor = node;\n            const path = this.pathFinder.findPath(this.activeNode.position, node.position);\n            if (path !== null) {\n                node.DOM.classList.add('potential_target');\n                this.renderPath(path);\n            }\n        }\n        if (node.walkable === false) {\n            this.renderPath(null);\n        }\n    }\n    /**\n     * Render the path on the grid\n     * @param path\n     */\n    renderPath(path) {\n        if (this.currentPath !== null) {\n            this.currentPath.forEach((node) => {\n                node.DOM.classList.remove('in_path');\n            });\n        }\n        this.currentPath = path;\n        if (path !== null) {\n            path.forEach((node) => {\n                node.DOM.classList.add('in_path');\n            });\n        }\n    }\n    /**\n     *  Moves active ball to the target node\n     * @param targetNode\n     */\n    moveBall(targetNode) {\n        this.isInteractive = false;\n        const pathToAnimate = [...this.currentPath];\n        this.renderPath(null);\n        const ballColor = this.activeNode.ballColor;\n        // this.activeNode.takeOutBall();\n        this.activeNode.setActivity(false);\n        let currentPathIndex = 0;\n        const interval = setInterval(() => {\n            if (currentPathIndex < pathToAnimate.length) {\n                const node = pathToAnimate[currentPathIndex];\n                node.putBall(ballColor);\n                if (currentPathIndex == 0)\n                    this.activeNode.takeOutBall();\n                else\n                    pathToAnimate[currentPathIndex - 1].takeOutBall();\n                currentPathIndex++;\n            }\n            else {\n                this.isInteractive = true;\n                clearInterval(interval);\n                targetNode.DOM.classList.remove('potential_target');\n                this.activeNode = null;\n                this.onBallMoveDone(targetNode);\n            }\n        }, 40);\n    }\n    /**\n     * Fires when ball successfully moves and the animation is finished\n     */\n    onBallMoveDone(newNode) {\n        if (this.startDate === null)\n            this.startDate = new Date();\n        const ballsDestroyed = this.destroyBalls(newNode);\n        if (ballsDestroyed === false) {\n            this.addNewBalls();\n        }\n    }\n    destroyBalls(startingNode) {\n        const allNodesToDestroy = new Set();\n        const directons = [\n            new _Vector__WEBPACK_IMPORTED_MODULE_5__.Vector(0, -1),\n            new _Vector__WEBPACK_IMPORTED_MODULE_5__.Vector(-1, 0),\n            new _Vector__WEBPACK_IMPORTED_MODULE_5__.Vector(-1, -1),\n            new _Vector__WEBPACK_IMPORTED_MODULE_5__.Vector(1, -1), // up right\n        ];\n        directons.forEach((currentDirection) => {\n            const nodesToDestroy = new Set();\n            nodesToDestroy.add(startingNode);\n            let currentNode = startingNode;\n            let length = 0;\n            while (currentNode !== null &&\n                currentNode.ballColor === startingNode.ballColor) {\n                length++;\n                nodesToDestroy.add(currentNode);\n                currentNode = this.getNode(currentNode.position.add(currentDirection));\n            }\n            const oppositeDirection = currentDirection.multiply(-1);\n            currentNode = startingNode;\n            while (currentNode !== null &&\n                currentNode.ballColor === startingNode.ballColor) {\n                length++;\n                nodesToDestroy.add(currentNode);\n                currentNode = this.getNode(currentNode.position.add(oppositeDirection));\n            }\n            length--;\n            if (length >= 5) {\n                nodesToDestroy.forEach((node) => allNodesToDestroy.add(node));\n            }\n        });\n        this.score.points += allNodesToDestroy.size;\n        allNodesToDestroy.forEach((node) => {\n            console.log(node.position.x, node.position.y);\n            node.takeOutBall();\n        });\n        return allNodesToDestroy.size > 0;\n    }\n    /**\n     * Tracks when player move the cursor outside the node\n     * @param node Node that cursor left\n     */\n    handleMouseOutsideNode(node) {\n        if (this.emptyNodeUnderTheCursor == node) {\n            this.emptyNodeUnderTheCursor = null;\n            node.DOM.classList.remove('potential_target');\n        }\n    }\n};\nGameGrid = __decorate([\n    LightTheme\n], GameGrid);\n\n\n\n//# sourceURL=webpack://astar/./ts/GameGrid.ts?");

/***/ }),

/***/ "./ts/Grid.ts":
/*!********************!*\
  !*** ./ts/Grid.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Grid\": () => (/* binding */ Grid)\n/* harmony export */ });\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ \"./ts/Vector.ts\");\n/* harmony import */ var _Node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Node */ \"./ts/Node.ts\");\n\n\n/**\n * Abstract grid class, containing the logic of basic grid operations\n */\nclass Grid {\n    /**\n     *\n     * @param width number of cells in the row\n     * @param height number of cells in the column\n     * @param walls (optional) not traversable nodes positions\n     */\n    constructor(width, height, walls = []) {\n        this.nodes = [];\n        this.width = width;\n        this.height = height;\n        this.nodes = Array(width * height)\n            .fill(null)\n            .map((_, index) => {\n            const x = index % this.width;\n            const y = Math.floor(index / this.width);\n            const isWalkable = walls.find((wall) => wall.x === x && wall.y === y)\n                ? false\n                : true;\n            return new _Node__WEBPACK_IMPORTED_MODULE_1__.Node(new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(x, y), isWalkable);\n        });\n    }\n    getNode({ x, y }) {\n        return (this.nodes.find((node) => node.position.x === x && node.position.y === y) || null);\n    }\n    /**\n     *\n     * @param node\n     * @returns Get all neighbour nodes of given node, diagonals are excluded\n     */\n    getNeighbours(node) {\n        const neighbours = [];\n        const cords = [\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(0, -1),\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(0, 1),\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(-1, 0),\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(1, 0),\n        ];\n        let isNextToBorder = false;\n        cords.forEach(({ x, y }) => {\n            const checkX = node.position.x + x;\n            const checkY = node.position.y + y;\n            const neighbour = this.getNode(new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(checkX, checkY));\n            if (neighbour !== null) {\n                neighbours.push(neighbour);\n            }\n            else {\n                isNextToBorder = true;\n            }\n        });\n        return [neighbours, isNextToBorder];\n    }\n    getNeighboursWithDiagonals(node) {\n        const neighbours = [];\n        const cords = [\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(0, -1),\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(0, 1),\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(-1, 0),\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(1, 0),\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(1, 1),\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(-1, -1),\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(1, -1),\n            new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(-1, 1),\n        ];\n        cords.forEach(({ x, y }) => {\n            const checkX = node.position.x + x;\n            const checkY = node.position.y + y;\n            const neighbour = this.getNode(new _Vector__WEBPACK_IMPORTED_MODULE_0__.Vector(checkX, checkY));\n            if (neighbour !== null) {\n                neighbours.push(neighbour);\n            }\n        });\n        return neighbours;\n    }\n    getSameColorNeighboursWithDiagonals(node) {\n        const neighbours = this.getNeighboursWithDiagonals(node);\n        return neighbours.filter((neighbour) => neighbour.ballColor === node.ballColor);\n    }\n    getAllConnectedBalls(node, visited) {\n        visited.push(node);\n        const neighbours = this.getSameColorNeighboursWithDiagonals(node);\n        neighbours.forEach((neighbour) => {\n            if (visited.includes(neighbour) == false) {\n                this.getAllConnectedBalls(neighbour, visited);\n            }\n        });\n    }\n}\n\n\n//# sourceURL=webpack://astar/./ts/Grid.ts?");

/***/ }),

/***/ "./ts/Node.ts":
/*!********************!*\
  !*** ./ts/Node.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Node\": () => (/* binding */ Node)\n/* harmony export */ });\n/**\n * Grid cell\n */\nclass Node {\n    /**\n     *\n     * @param position starting position of node\n     * @param walkable if true ball can move through it\n     */\n    constructor(position, walkable) {\n        this.position = position;\n        this.walkable = walkable;\n        this.gCost = 0;\n        this.hCost = 0;\n    }\n    get fCost() {\n        return this.gCost + this.hCost;\n    }\n    /**\n     *  Put the ball with specific color\n     * @param color color of ball\n     */\n    putBall(color) {\n        this.ballColor = color;\n        this.walkable = false;\n        this.DOM.classList.add('with_ball');\n        const ballDOM = document.createElement('div');\n        ballDOM.classList.add('ball');\n        ballDOM.style.backgroundColor = color;\n        this.DOM.appendChild(ballDOM);\n    }\n    /**\n     * Remove ball from the node\n     */\n    takeOutBall() {\n        this.ballColor = undefined;\n        this.walkable = true;\n        this.DOM.classList.remove('with_ball');\n        this.DOM.innerHTML = '';\n        this.setActivity(false);\n    }\n    /**\n     * Get the coresponding div\n     */\n    get DOM() {\n        return document.querySelector(`[data-x=\"${this.position.x}\"][data-y=\"${this.position.y}\"]`);\n    }\n    /**\n     *\n     * @param isActive if true, cell have a green border, otherwise gray\n     */\n    setActivity(isActive) {\n        this.isActive = isActive;\n        if (isActive) {\n            this.DOM.classList.add('active');\n        }\n        else {\n            this.DOM.classList.remove('active');\n        }\n    }\n}\n\n\n//# sourceURL=webpack://astar/./ts/Node.ts?");

/***/ }),

/***/ "./ts/PathFinding.ts":
/*!***************************!*\
  !*** ./ts/PathFinding.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PathFinding\": () => (/* binding */ PathFinding)\n/* harmony export */ });\n/**\n * Implements A* algorithm to find the shortest path from one node to another\n */\nclass PathFinding {\n    constructor(grid) {\n        this.grid = grid;\n    }\n    /**\n     *\n     * @param startPosition position of starting node\n     * @param targetPosition  position of target node\n     * @returns the shortest path from starting node to target node. Starting node is excluded, target node is included\n     */\n    findPath(startPosition, targetPosition) {\n        let openSet = [];\n        const closedSet = new Set();\n        const startNode = this.grid.getNode(startPosition);\n        const targetNode = this.grid.getNode(targetPosition);\n        openSet.push(startNode);\n        while (openSet.length > 0) {\n            let currentNode = openSet[0];\n            // Set current node as the node from open set with the lowest f and h cost\n            for (let i = 1; i < openSet.length; i++) {\n                if (openSet[i].fCost < currentNode.fCost ||\n                    (openSet[i].fCost == currentNode.fCost &&\n                        openSet[i].hCost < currentNode.hCost)) {\n                    currentNode = openSet[i];\n                }\n            }\n            // Delete current node from open set and add it to the closed set\n            openSet = openSet.filter((node) => node !== currentNode);\n            closedSet.add(currentNode);\n            // We find target node and retrace a path\n            if (currentNode == targetNode) {\n                return this.retracePath(startNode, targetNode);\n            }\n            // Checking all neighbours\n            const [neighbours] = this.grid.getNeighbours(currentNode);\n            neighbours.forEach((neighbour) => {\n                // Wall or already has been a current node\n                if (!neighbour.walkable || closedSet.has(neighbour))\n                    return;\n                const newMovementCostToNeighbour = currentNode.gCost + this.getDistance(currentNode, neighbour);\n                // Path to the neightbour (g cost) is lower than previous one or we haven't already reveal that node\n                if (newMovementCostToNeighbour < neighbour.gCost ||\n                    !openSet.includes(neighbour)) {\n                    // Setting new data to the node\n                    neighbour.gCost = newMovementCostToNeighbour;\n                    neighbour.hCost = this.getDistance(neighbour, targetNode);\n                    neighbour.parent = currentNode;\n                    // Adding to the open set if not present in it\n                    if (!openSet.includes(neighbour))\n                        openSet.push(neighbour);\n                }\n            });\n        }\n        return null;\n    }\n    /**\n     * Retrace the path using parent property\n     * @param startNode starting node\n     * @param endNode target node\n     * @returns path from starting node to target node. Starting node is excluded, target node is included\n     */\n    retracePath(startNode, endNode) {\n        const path = [];\n        let currentNode = endNode;\n        while (currentNode !== startNode) {\n            path.push(currentNode);\n            currentNode = currentNode.parent;\n        }\n        path.reverse();\n        return path;\n    }\n    /**\n     *\n     * @param nodeA\n     * @param nodeB\n     * @returns Distance between nodeA and nodeB, diagonals are ommited\n     */\n    getDistance(nodeA, nodeB) {\n        const dstX = Math.abs(nodeA.position.x - nodeB.position.x);\n        const dstY = Math.abs(nodeA.position.y - nodeB.position.y);\n        return dstX + dstY;\n    }\n}\n\n\n//# sourceURL=webpack://astar/./ts/PathFinding.ts?");

/***/ }),

/***/ "./ts/Points.ts":
/*!**********************!*\
  !*** ./ts/Points.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Points\": () => (/* binding */ Points)\n/* harmony export */ });\nclass Points {\n    constructor() {\n        this._points = 0;\n        this.DOM = document.querySelector('.points');\n    }\n    set points(newValue) {\n        this.DOM.textContent = String(newValue);\n        this._points = newValue;\n    }\n    get points() {\n        return this._points;\n    }\n}\n\n\n//# sourceURL=webpack://astar/./ts/Points.ts?");

/***/ }),

/***/ "./ts/Preview.ts":
/*!***********************!*\
  !*** ./ts/Preview.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Preview\": () => (/* binding */ Preview)\n/* harmony export */ });\n/**\n * Preview of next 3 balls\n */\nclass Preview {\n    constructor(DOMAnchor) {\n        this.DOMAnchor = DOMAnchor;\n        this.DOMBalls = [];\n        this.renderPreviewGrid();\n    }\n    /**\n     *  Set colors of balls inside the preview\n     * @param ballsColors tumple with balls' colors\n     */\n    setPreview(ballsColors) {\n        this.DOMBalls.forEach((domBall, i) => {\n            domBall.style.backgroundColor = ballsColors[i];\n        });\n    }\n    renderPreviewGrid() {\n        const previewContainer = document.createElement('div');\n        previewContainer.classList.add('preview');\n        this.DOMAnchor.appendChild(previewContainer);\n        for (let i = 1; i < 4; i++) {\n            const cell = document.createElement('div');\n            cell.classList.add('preview_cell');\n            previewContainer.appendChild(cell);\n            const ball = document.createElement('div');\n            ball.classList.add('preview_ball');\n            cell.appendChild(ball);\n            this.DOMBalls.push(ball);\n        }\n    }\n}\n\n\n//# sourceURL=webpack://astar/./ts/Preview.ts?");

/***/ }),

/***/ "./ts/Vector.ts":
/*!**********************!*\
  !*** ./ts/Vector.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Vector\": () => (/* binding */ Vector)\n/* harmony export */ });\n/**\n * Simple vector with x, y properties\n */\nclass Vector {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n    add(vector) {\n        return new Vector(vector.x + this.x, vector.y + this.y);\n    }\n    multiply(scalar) {\n        return new Vector(scalar * this.x, scalar * this.y);\n    }\n}\n\n\n//# sourceURL=webpack://astar/./ts/Vector.ts?");

/***/ }),

/***/ "./ts/colors.ts":
/*!**********************!*\
  !*** ./ts/colors.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Color\": () => (/* binding */ Color)\n/* harmony export */ });\nconst COLORS = [\n    '#673ab7',\n    '#f44336',\n    '#3f51b5',\n    '#03a9f4',\n    '#8bc34a',\n    '#009688',\n    '#ff9800',\n];\nclass Color {\n    /**\n     *\n     * @returns pretty color from the list\n     */\n    static getRandom() {\n        return COLORS[Math.floor(Math.random() * (COLORS.length - 1))];\n    }\n    /**\n     *\n     * @returns tuple of 3 pretty colors from the list\n     */\n    static getThreeRandom() {\n        return [this.getRandom(), this.getRandom(), this.getRandom()];\n    }\n}\n\n\n//# sourceURL=webpack://astar/./ts/colors.ts?");

/***/ }),

/***/ "./ts/main.ts":
/*!********************!*\
  !*** ./ts/main.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GameGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameGrid */ \"./ts/GameGrid.ts\");\n\nconsole.log('App is working...');\nconst gameGrid = new _GameGrid__WEBPACK_IMPORTED_MODULE_0__.GameGrid(document.body);\n\n\n//# sourceURL=webpack://astar/./ts/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ts/main.ts");
/******/ 	
/******/ })()
;