/**
 * Preview of next 3 balls
 */
export class Preview {
  DOMAnchor: HTMLElement;
  DOMBalls: HTMLElement[];

  constructor(DOMAnchor: HTMLElement) {
    this.DOMAnchor = DOMAnchor;
    this.DOMBalls = [];
    this.renderPreviewGrid();
  }

  /**
   *  Set colors of balls inside the preview
   * @param ballsColors tumple with balls' colors
   */
  setPreview(ballsColors: [string, string, string]) {
    this.DOMBalls.forEach((domBall, i) => {
      domBall.style.backgroundColor = ballsColors[i];
    });
  }

  renderPreviewGrid() {
    const previewContainer = document.createElement('div');
    previewContainer.classList.add('preview');
    this.DOMAnchor.appendChild(previewContainer);

    for (let i = 1; i < 4; i++) {
      const cell = document.createElement('div');
      cell.classList.add('preview_cell');
      previewContainer.appendChild(cell);

      const ball = document.createElement('div');
      ball.classList.add('preview_ball');
      cell.appendChild(ball);
      this.DOMBalls.push(ball);
    }
  }
}
