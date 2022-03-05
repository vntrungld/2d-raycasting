class Boundary {
  constructor(a, b) {
    this.a = a
    this.b = b
  }

  render(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.stroke();
  }
}
