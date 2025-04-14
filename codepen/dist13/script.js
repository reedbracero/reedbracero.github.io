const world = document.querySelector(".boops");
const { Engine, Render, Runner, World, Bodies } = Matter;

const textures = [
  "https://media.4-paws.org/d/2/5/f/d25ff020556e4b5eae747c55576f3b50886c0b90/cut%20cat%20serhio%2002-1813x1811-720x719.jpg",
  "https://images.squarespace-cdn.com/content/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg?format=1500w&content-type=image%2Fjpeg",
  "https://cdn.theatlantic.com/thumbor/OgQgHFiqAd92pArI1zjmcUHjoSc=/144x0:2411x1700/1200x900/media/img/mt/2017/06/shutterstock_319985324/original.jpg",
  "https://wpcdn.web.wsu.edu/cahnrs/uploads/sites/4/cat2-1024x676.jpg",
]


function createBall() {
  const ball = Bodies.circle(Math.round(Math.random() * 1280), -30, 25, {
    angle: Math.PI * (Math.random() * 2 - 1),
    friction: 0.001,
    frictionAir: 0.01,
    restitution: 0.8,
    render: {
      sprite: {
        texture: textures[Math.floor(Math.random() * textures.length)],
        xScale: 0.1,
        yScale: 0.1,
      }
    }
  });

  setTimeout(() => {
    World.remove(engine.world, ball);
  }, 30000);

  return ball;
}

const engine = Engine.create();
const runner = Runner.create();
const render = Render.create({
  canvas: world,
  engine: engine,
  options: {
    width: 1280,
    height: 720,
    background: "transparent",
    wireframes: false
  }
});

const boundaryOptions = {
  isStatic: true,
  render: {
    fillStyle: "transparent",
    strokeStyle: "transparent"
  }
};
const ground = Bodies.rectangle(640, 720, 1300, 4, boundaryOptions);
const leftWall = Bodies.rectangle(0, 360, 4, 740, boundaryOptions);
const rightWall = Bodies.rectangle(1280, 360, 4, 800, boundaryOptions);

Render.run(render);
Runner.run(runner, engine);

World.add(engine.world, [ground, leftWall, rightWall]);

const handleClick = () => {
  const ball2 = createBall();
  World.add(engine.world, [ball2]);
};

const button = document.querySelector("#boop");

button.addEventListener("click", handleClick);