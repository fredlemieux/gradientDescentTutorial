class createScrollBar{
  constructor(y, h){
    this.y = y;
    this.xVal = 2//width/2;
    this.h = h;
    this.loose = 4;
  }

  update(){
    if(this.overEvent() && mouseIsPressed){
      var actualX;
      if (mouseX < 0){
        actualX = 0;
      } else if (mouseX > width) {
        actualX = width;
      } else {
        actualX = mouseX;
      }
      this.xVal = Math.round(this.xVal + (actualX-this.xVal)/this.loose);
    }
  }

  overEvent(){
    if (mouseY< this.y + this.h/2 && mouseY > this.y - this.h -2){
      return true;
    }
  }

  draw(){
    this.update()
    //Draw the bar
    strokeWeight(2);
    stroke(200);
    fill(200);
    rect(0,this.y-(this.h/2),width, this.h);

    // Draw this box
    stroke(50);
    fill(50);
    rect(this.xVal-10,this.y-(this.h/2)+1,20, this.h - 4);
  }
}
