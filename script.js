// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// EventListeners
addEventListener('resize', () => {
canvas.width = innerWidth;
canvas.height = innerHeight;
});

// Utillities

let t = 0;

let collisions = 0;

let border = 100;

let wallX = innerWidth - border * 2;
let wallY = innerHeight - border * 2;
let wallsThick = 3;

let blockSize = 150;

let wallsClr = '#84e1e1';
let block1Clr = '#ffbf80';
let block2Clr = '#ff9999';

// Objects

function drawWalls() {

    c.fillStyle = wallsClr;
    c.fillRect(border, border, wallsThick, wallY);
    c.fillRect(border, border + wallY, innerWidth - border, wallsThick);
}

function drawBlock(block, t) {

    if (block == '1') {
        c.fillStyle = block1Clr;
        c.fillRect(block1.getCurrX(), border + wallY - blockSize, blockSize, blockSize);

        c.font = "22px Century Gothic";
        c.fillStyle = '#0088cc';
        c.fillText("m = " + block1.m, block1.getCurrX() + 5, border + wallY - blockSize + 30);
    }
    if (block == '2') {
        c.fillStyle = block2Clr;
        c.fillRect(block2.getCurrX(), border + wallY - blockSize, blockSize, blockSize);

        c.font = "22px Century Gothic";
        c.fillStyle = '#0088cc';
        c.fillText("m = " + block2.m, block2.getCurrX() + 5, border + wallY - blockSize + 30);
    }
}

function Block(m, v, x0) {

    this.m = m;
    this.v = v;
    this.x0 = x0;

    this.getCurrX = () => {
        return this.x0 + t * this.v;
    }
}

var block1 = new Block(1, 0, border + 100);
var block2 = new Block(10000, -100, border + 300);

function drawCollisionsCounter() {

    c.font = "40px Century Gothic";
    c.fillStyle = '#80ffaa';
    c.fillText("Collisions: " + collisions, innerWidth * 0.7, border);
}

function collisionBlocks() {

    return block1.getCurrX() + blockSize > block2.getCurrX();
}

function collisionWall() {

    return block1.getCurrX() < border + wallsThick;
}

// Animation Loop
function animate() {

    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < 500; i++) {

        c.fillStyle = '#181c17';
        c.fillRect(0, 0, canvas.width, canvas.height);

        drawCollisionsCounter();

        drawWalls();

        if (collisionBlocks()) {

            collisions++;

            block1.x0 = block1.getCurrX();
            block2.x0 = block2.getCurrX();

            let block1NewV = (block1.m - block2.m) / (block1.m + block2.m) * block1.v + block2.m * 2 / (block1.m + block2.m) * block2.v;
            let block2NewV = block1.m * 2 / (block1.m + block2.m) * block1.v - (block1.m - block2.m) / (block1.m + block2.m) * block2.v;
            block1.v = block1NewV;
            block2.v = block2NewV;

            t = 0
        }

        if (collisionWall()) {

            collisions++;

            block1.x0 = border + wallsThick;
            block2.x0 = block2.getCurrX();

            block1.v = - block1.v;

            t = 0;
        }

        drawBlock('1', t);
        drawBlock('2', t);

        t += 0.00003;
    }
}

animate();
