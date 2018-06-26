let data = [];

let m = 0;
let b = 0;

let resetButton;

let running = false;
let runningText = "Start/Stop";

function setup() {
  // put setup code here
  createCanvas(400,400);
  background(51);
  resetButton = new Button(0, 0, 50, 30, "Reset", function(){
    data = [];
  });
  startStopButton = new Button(100, 00, 100, 30, runningText,()=>{
    if (running === false){
      runningText = "Stop"
      running = !running;
    } else {
      runningText = "Start"
      running = !running;
    }
  })
}

function linearRegression(){
  //We need to get the average x and y first
    let totalX = 0
    let totalY = 0
    for (let i = 0; i < data.length; i++){
      totalX += data[i].x;
      totalY += data[i].y;
    }
    let xMean = totalX / data.length
    let yMean = totalY / data.length

    let numerator = 0
    let denomenator = 0

    for (let i = 0; i < data.length; i++){
      numerator += (data[i].x - xMean) * (data[i].y - yMean)
      denomenator += Math.pow(data[i].x - xMean, 2)
    }

      m = numerator/denomenator;
      b = yMean - m*xMean;
}

function drawLine(){
  let x1 = 0;
  let y1 = m*x1 + b

  let x2 = 1;
  let y2 = m*x2 + b

  x1 = map(x1, 0, 1, 0, width);
  x2 = map(x2, 0, 1, 0, width);
  y1 = map(y1, 0, 1, height, 0);
  y2 = map(y2, 0, 1, height, 0);

  stroke(200);
  strokeWeight(3)
  line(x1,y1,x2,y2)
}

function draw() {
  background(51);
  // put drawing code here
  for (var i = 0; i < data.length; i++){
      let x = map(data[i].x, 0, 1, 0, width);
      let y = map(data[i].y, 0, 1, height, 0);
      fill(255);
      stroke(255);
      ellipse(x,y,8,8);
  }

  if (data.length > 0 ){
    gradientDescent();
    drawError();
    drawLine();
  }

  resetButton.draw();
  startStopButton.draw();
}

function drawError(){

  for (let i = 0; i < data.length; i ++){
    let x1 = map(data[i].x, 0, 1, 0, width);
    let y1 = map(data[i].y, 0, 1, height, 0);
    let x2 = x1;
    let y2 = map(m*data[i].x + b, 0, 1, height, 0);
    strokeWeight(1);
    line(x1,y1,x2,y2);

    text(round(y1 - y2), x1, (y2 + y1)/2);
  }
}

function gradientDescent(){
  if (running){
    // This is stochastic gradient descent.
    let learning_rate = 0.05;
    for ( let i = 1; i < data.length; i ++){
      let x = data[i].x;
      let y = data[i].y;

      let guess = m * x + b;
      let error = y - guess;

      m = m + (error * x) * learning_rate;
      b = b + error * learning_rate;
    }
  }
}

function mousePressed(){
  console.log(locked)
  if (!locked){
    let x = map(mouseX, 0, width, 0, 1);
    let y = map(mouseY, 0, height, 1, 0);

    let point = createVector(x,y);
    data.push(point)
  } else {
    resetButton.mousePressed();
    startStopButton.mousePressed();
  }
}

let locked = false;

class Button{
  constructor(x, y, w, h, text, action){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    this.action = action;
  }

  mouseOver(){
    if (mouseX < this.x + this.w && mouseX > this.x && mouseY > this.y && mouseY < this.y + this.h){
      return true
    } else {
      return false
    }
  }

  mousePressed(){
    if(this.mouseOver()){
      this.action();
    }
  }

  draw(){
    if (this.mouseOver()){
      locked = true;
      fill(156,120,111);
    } else {
      locked = false;
      fill(255);
    }
    strokeWeight(3);
    //console.log(this.x, this.y, this.w. this.h);
    rect(this.x,this.y,this.w,this.h);
    fill(0, 102, 153);
    textAlign(CENTER,CENTER);
    text(this.text, this.x + this.w/2, this.y + this.h/2);
  }

}
