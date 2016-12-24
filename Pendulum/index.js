var width = window.innerWidth;
var height = window.innerHeight;

/*Init*/
var Pendulum = function() {
  var pn = this;
  this.flagPause = 0;
  this.posOfCircle1 = {
    x: width/2,
    y: 250
  }
  // this.distanceBetweenCircle1AndCircle2 = 150;
  // this.distanceBetweenCircle2AndCircle3 = 150;
  this.distance1 = 150;
  this.distance2 = 150;
  // this.startAngleCircle2 = 0;
  // this.startAngleCircle3 = 20;
  this.startAngle1 = 0;
  this.startAngle2 = 20;
  this.startVelocityOfCircle2 = {
    vx: 0,
    vy: 0
  };
  this.startVelocityOfCircle3 = {
    vx: 0,
    vy: 0.3
  };
  this.colorOfBrush = "#3dcedb";
  this.gravity = 0.0004;

  this.pause_unpause = function() {
    pn.flagPause = pn.flagPause ? 0 : 1;
  }

  this.start = function() {
    pn.flagPause = 0;
    var world = Physics();
    var renderer = Physics.renderer('canvas', {
      el: 'viewport',
      width: width,
      height: height,
      autoResize: false,
    });
    world.add(renderer);
    world.on('step', function(){
      world.render();
    });

    var viewportBounds = Physics.aabb(0, 0, width, height);

    var Gravity = Physics.behavior('constant-acceleration', {
      acc: {x: 0, y: pn.gravity}
    });
    world.add(Gravity);

    var circle1 = Physics.body('circle', {
      x: pn.posOfCircle1.x,
      y: pn.posOfCircle1.y,
      radius: 5,
      treatment: 'static',
      styles: {
        fillStyle: "#FFFFFF",
      }
    });
    // var posOfCircle2 = getCoords(pn.startAngleCircle2, pn.distanceBetweenCircle1AndCircle2, pn.posOfCircle1);
    var posOfCircle2 = getCoords(pn.startAngle1, pn.distance1, pn.posOfCircle1);
    var circle2 = Physics.body('circle', {
      x: posOfCircle2.x,
      y: posOfCircle2.y,
      vx: pn.startVelocityOfCircle2.vx,
      vy: pn.startVelocityOfCircle2.vy,
      radius: 5,
      styles: {
        fillStyle: "#962b2b",
      }
    });
    // var posOfCircle3 = getCoords(pn.startAngleCircle3, pn.distanceBetweenCircle2AndCircle3, posOfCircle2);
    var posOfCircle3 = getCoords(pn.startAngle2, pn.distance2, posOfCircle2);
    var circle3 = Physics.body('circle', {
      x: posOfCircle3.x,
      y: posOfCircle3.y,
      radius: 5,
      vx: pn.startVelocityOfCircle3.vx,
      vy: pn.startVelocityOfCircle3.vy,
      styles: {
        fillStyle: "#962b2b",
      }
    });

    world.add([circle1, circle2, circle3]);

    var verlet = Physics.behavior('verlet-constraints');
    // verlet.distanceConstraint(circle1, circle2, 0.1, pn.distanceBetweenCircle1AndCircle2);
    // verlet.distanceConstraint(circle2, circle3, 0.1, pn.distanceBetweenCircle2AndCircle3);
    verlet.distanceConstraint(circle1, circle2, 0.1, pn.distance1);
    verlet.distanceConstraint(circle2, circle3, 0.1, pn.distance2);
    world.add(verlet);

    var poss = [];
    world.on('render', function(data){
      var constraints = verlet.getConstraints().distanceConstraints,
      c;

      var ctx = document.getElementById('viewport').getContext('2d');
      ctx.globalCompositeOperation = 'destination-over';
      for(var i = 0, l = constraints.length; i < l; ++i){
        c = constraints[i];
        renderer.drawLine(c.bodyA.state.pos, c.bodyB.state.pos, {
          lineWidth: 2,
          strokeStyle: '#962b2b',
        });
      }

      var pos = constraints[1].bodyB.state.pos;
      poss.push({x: pos._[0], y: pos._[1]});
      for(var i = 0, l = poss.length; i < l-2; i++) {
        renderer.drawLine(poss[i], poss[i+2], {
          lineWidth: 2,
          strokeStyle: pn.colorOfBrush,
        });
      }
    });

    Physics.util.ticker.on(function(time, dt){
      if(!pn.flagPause)
        world.step(time);
    });
    Physics.util.ticker.start();
  }
  this.start();
}

window.onload = function() {
  var pendulum = new Pendulum();
  var gui = new dat.GUI();
  gui.remember(pendulum);
  var f1 = gui.addFolder('posOfCircle1');
  f1.add(pendulum.posOfCircle1, 'x');
  f1.add(pendulum.posOfCircle1, 'y');

  var f2 = gui.addFolder('startVelocityOfCircle2');
  f2.add(pendulum.startVelocityOfCircle2, 'vx');
  f2.add(pendulum.startVelocityOfCircle2, 'vy');

  var f3 = gui.addFolder('startVelocityOfCircle3');
  f3.add(pendulum.startVelocityOfCircle3, 'vx');
  f3.add(pendulum.startVelocityOfCircle3, 'vy');

  gui.add(pendulum, 'distance1', 1, 400);
  gui.add(pendulum, 'distance2', 1, 400);
  gui.add(pendulum, 'startAngle1', 0, 360);
  gui.add(pendulum, 'startAngle2', 0, 360); 
  gui.add(pendulum, 'gravity', 0, 1);
  gui.addColor(pendulum, 'colorOfBrush');

  gui.add(pendulum, 'start');
  gui.add(pendulum, 'pause_unpause');
  
  document.getElementsByClassName('dg')[0].style.zIndex = 10000;
};

function getCoords(startAngle, distance, posOfRelPoint) {
  startAngle = (startAngle * Math.PI)/180;
  var x = posOfRelPoint.x + Math.cos(startAngle) * distance;
  var y = posOfRelPoint.y - Math.sin(startAngle) * distance;

  return {x: x, y: y};
}