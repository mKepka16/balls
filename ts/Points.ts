export class Points {
  private DOM: HTMLHeadingElement;
  public _points: number = 0;

  constructor() {
    this.DOM = document.querySelector('.points');
  }

  public set points(newValue: number) {
    this.DOM.textContent = String(newValue);
    this._points = newValue;
  }

  public get points() {
    return this._points;
  }
}
