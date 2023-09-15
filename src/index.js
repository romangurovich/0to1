import p5 from 'p5';
import mobileCheck from './mobileCheck';
import './styles.css';

const animationReadyEvent = new Event("animation-ready");

document.addEventListener("animation-ready", () => {
  console.log("listened ", Date.now());
  const links = document.querySelector('.links');
  links.style.visibility = 'visible';
  console.log(links);
}, { once: true });

const root = '..';
const isMobile = mobileCheck();
const MOBILE_PENALTY = 2;
const FRAMERATE = 60;
const ANGLE_SHIFT = 0.01;

let angle = 0; // Initial rotation angle
let width = Math.min(window.innerWidth, 450);
let height = width * 1.1;
let font;
let layer;

let sketch = (p) => {    
  p.preload = () => {
    font = p.loadFont(`${root}/fonts/JenrivTitling-Regular.otf`)
  };

  p.setup = () => {
    p.pixelDensity(1);
    p.frameRate(isMobile ? FRAMERATE / MOBILE_PENALTY : FRAMERATE);
    p.createCanvas(width, height, P5.WEBGL, document.getElementById('myCanvas'));
    layer = p.createFramebuffer();

    console.log("before ", document.querySelector('.links').cloneNode());
    console.log("dispatched ", Date.now());
    document.dispatchEvent(animationReadyEvent);
  };

  p.draw = () =>{
    p.clear();

    layer.begin()
    p.clear();

    // Set rotation angle
    angle += isMobile ? ANGLE_SHIFT * MOBILE_PENALTY : ANGLE_SHIFT;

    // Rotate around the Y-axis
    p.rotateY(angle);
    p.rotateZ(angle);

    // Draw the 0" shape
    p.fill(255, 204, 0);
    p.textFont(font);
    p.textSize(200);
    p.text("0", 0, 0);
    
    layer.end()

    // Draw the 1" shape
    p.rotateY(angle, 0)
    p.translate(-100, 0);
    p.fill(192, 192, 192);
    p.textFont(font);
    p.textSize(200);
    p.text("1", 50, 50);
    p.image(layer, 45, 10, width / 2, height / 2)
  }
};

const P5 = new p5(sketch);
