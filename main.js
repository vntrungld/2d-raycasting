function main()
{
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.width;
  const radius = Math.sqrt(width * width + height * height);

  const particle = new Particle(new Coordinate(width / 2, height / 2), radius);
  const boundaries = [];

  for (let i = 0; i < 5; i++) {
    const boundary = new Boundary(new Coordinate(Math.random() * width, Math.random() * height), new Coordinate(Math.random() * width, Math.random() * height));

    boundaries.push(boundary);

    boundary.render(ctx);
  }

  canvas.addEventListener('mousemove', function (e) {
    ctx.clearRect(0, 0, width, height);

    boundaries.forEach(function (boundary) {
      boundary.render(ctx);
    });

    particle.setOrigin(new Coordinate(e.offsetX, e.offsetY));
    particle.render(ctx, boundaries);
  });
}

main();
