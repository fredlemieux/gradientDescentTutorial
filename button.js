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
