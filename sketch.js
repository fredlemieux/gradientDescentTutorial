let error = 0;

let data = [];

let m = 0;
let b = 0;

let learning_rate = 0.005;
let showError = true;


let running = false;
let runningText = "Start/Stop";


// This is stochastic gradient descent.
function gradientDescent(){
  if (running){
    // step through each points
    for ( let i = 1; i < data.length; i ++){
      let x = data[i].x;
      let y = data[i].y;

      // Calculate our guess and error
      let guess = m * x + b;
      let error = y - guess;

      // adjust m and n;
      m = m + (error * x) * learning_rate;   // Make an adjustment to the gradient
      b = b + error * learning_rate;        // Make an adjustment to the intercept
    }
  }
}


function setup() {
  // put setup code here
  createCanvas(600,400);
  background(51);

  // Create the reset button
  resetButton = new Button(0, 0, 50, 30, "Reset", function(){
    data = [];
    m = 0;
    b = 0;
    error = 0;
    learning_rate = 0.005
  });

  // Create the Start/Stop Button
  startStopButton = new Button(60, 00, 100, 30, runningText,()=>{
    if (running === false){
      runningText = "Stop"
      running = !running;
    } else {
      runningText = "Start"
      running = !running;
    }
  })

  // Create a step button
  toggleErrorButton = new Button(170, 0, 80, 30, "Toggle Error", function(){
    showError = !showError;
  });

  // Create a step button
  stepButton = new Button(260, 0, 80, 30, "Take Step", function(){
    for (let x = 0; x < 10; x ++){
      // TODO! DRY!! need to have an argument in the gradient descent function to override the "Running" bool
      for ( let i = 1; i < data.length; i ++){
        let x = data[i].x;
        let y = data[i].y;

        // Calculate our guess and error
        let guess = m * x + b;
        let error = y - guess;

        // adjust m and n;
        m = m + (error * x) * learning_rate;   // Make an adjustment to the gradient
        b = b + error * learning_rate;        // Make an adjustment to the intercept
      }
    }
  });

  stepButton.xVal = map(learning_rate, 0, 0.5, 0, width)

  //Create the createScrollBar
  mScroll = new createScrollBar(55,15);
  bScroll = new createScrollBar(75,15);
  learning_rate_Scroll = new createScrollBar(95,15);
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

  // DrawButtons
  startStopButton.draw();
  resetButton.draw();
  toggleErrorButton.draw();
  stepButton.draw();

  // Scroll Bar actions

  // Update the scroll bar if the
  mScroll.xVal = map(m, 0, 2, 0, width);
  bScroll.xVal = map(b, 0, 2, 0,  width);
  learning_rate_Scroll.xVal = map(learning_rate, 0, 1.5, 0, width);
  mScroll.draw();
  bScroll.draw();
  learning_rate_Scroll.draw();

  //
  if(mScroll.overEvent() && mouseIsPressed){
    m = map(mScroll.xVal, 0, width, 0, 2);
  }
  if(bScroll.overEvent() && mouseIsPressed){
    b = map(bScroll.xVal, 0, width, 0, 2);
  }
  if(learning_rate_Scroll.overEvent() && mouseIsPressed){
    learning_rate = map(learning_rate_Scroll.xVal, 0, width, 0, 1.5);
  }

  //Text for the formula
  fill(255);
  textAlign(LEFT,CENTER);
  text("Regression Formula: y = " + round(m*1000)/100 + "x + " + round(b*1000)/100, 390, 10);
  text("Average Error (Cost): " + error, 390, 25);
  text("Learning Rate: " + learning_rate, 390, 40)
}

function drawError(){
  let tempError = 0
  for (let i = 0; i < data.length; i ++){
    let x1 = map(data[i].x, 0, 1, 0, width);
    let y1 = map(data[i].y, 0, 1, height, 0);
    let x2 = x1;
    let y2 = map(m*data[i].x + b, 0, 1, height, 0);
    if (showError){
      strokeWeight(1);
      line(x1,y1,x2,y2);

      text(round(y1 - y2), x1, (y2 + y1)/2);
    }
    tempError += round(y1 - y2);
  }
  error = tempError;

}

// Ordinary Least Squares Method
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

function mousePressed(){
  //Actions when pressing the buttons
  if (resetButton.mouseOver())  resetButton.action()
  else if (startStopButton.mouseOver())  startStopButton.action()
  else if (mScroll.overEvent()) {   }
  else if (toggleErrorButton.mouseOver()) toggleErrorButton.action()
  else if (stepButton.mouseOver()) stepButton.action()
  else if (mScroll.overEvent()){
    // Do nothing
  }
  else if (mScroll.overEvent()){
    // Do nothing
  }
  else if (learning_rate_Scroll.overEvent()){
    // Do nothing
  }

  else {
    let x = map(mouseX, 0, width, 0, 1);
    let y = map(mouseY, 0, height, 1, 0);

    let point = createVector(x,y);
    data.push(point)
  }


}

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
    // Figure out if the mouse
    if (mouseX < this.x + this.w && mouseX > this.x && mouseY > this.y && mouseY < this.y + this.h){
      return true
    } else {
      return false
    }
  }

  // TODO! Redo the button and use mouseIsPressed!!!

  draw(){
    //console.log(this.mouseOver());
    //Change the colour when hovering over the button
    if (this.mouseOver()){
      fill(156,120,111);
    } else {
      fill(255);
    }

    //Draw the button and text
    strokeWeight(3);
    //console.log(this.x, this.y, this.w. this.h);
    rect(this.x,this.y,this.w,this.h);
    fill(0, 102, 153);
    textAlign(CENTER,CENTER);
    text(this.text, this.x + this.w/2, this.y + this.h/2);
  }

}
