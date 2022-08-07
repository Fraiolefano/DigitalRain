class Drop
{
  position;
  start_position;
  initial_height;
  initial_velocity;
  start_time;
  elapsed_time;
  y_acceleration;
  drop_length;
  z_index;
  drop_color;
  constructor()
  {
    this.init();
  }

  init()
  {
    this.initial_velocity=random(400,1000); //da ~(130,830)m di altezza
    this.initial_height=random(-10,-height);
    this.position=new p5.Vector(random(-width,2*width),this.initial_height);
    this.start_position=this.position.copy();
    this.start_time=millis();
    this.elapsed_time=millis();
    this.z_index=(2.0-((2.0/1000.0)*this.initial_velocity));
    this.drop_length=(30.0/1000.0)*this.initial_velocity;
    this.drop_color=color(0,random(0,200),random(200,255));
  }
  
  update()
  {
    this.elapsed_time=(millis()-this.start_time)/1000.0;
    this.y_acceleration=G+(wind.wind.y*wind.intensity);
    this.position.x=this.start_position.x+(wind.intensity*this.elapsed_time*wind.wind.x); // S_x=v_x*t+x_i
    this.position.y=((this.y_acceleration/2.0)*(pow(this.elapsed_time,2.0)))+(this.initial_velocity*this.elapsed_time)+this.initial_height;  // S_y=1/2 gt^2 +v_i*t+h_i 
    
    if(this.position.y>height)
    {
      if(this.position.x>-10 && this.position.x<width+10)
        {splashes.push(new Splash(this.position,this.drop_color));}
      this.init();
    }
  }
  
  draw()
  {
    strokeWeight(this.z_index);
    stroke(this.drop_color);
    line(this.position.x,this.position.y,this.position.x-(wind.wind.x*((10.0/wind.max_wind)*wind.intensity)),this.position.y-this.drop_length);
    //Se si desidera una forma più a goccia
    // strokeWeight(5);
    // point(this.position.x,this.position.y);
  }
}
