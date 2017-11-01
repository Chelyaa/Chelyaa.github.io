var counter = 0,
    perClick = 1,
    perSec = 0,
    costPerClick = 70,
    costPerSec = 70,
    counterEl = document.getElementById("counter"),
    perClickEl = document.getElementById("per-click"),
    perSecEl = document.getElementById("per-second"),
    costPerClickEl = document.getElementById("cost-click"),
    costPerSecEl = document.getElementById("cost-sec");
    
function render() {
  counterEl.innerHTML = counter;
  perClickEl.innerHTML = perClick;
  perSecEl.innerHTML = perSec;
  costPerClickEl.innerHTML = costPerClick;
  costPerSecEl.innerHTML = costPerSec;
  document.title = counter;
}

render();
document.getElementById("clicker-field").onclick = function() {
  counter += perClick;
  render();
}
document.getElementById("clicker-field").onmousedown = function() {
  document.body.classList.add('blue');
  setTimeout(function() {
    document.body.classList.remove('blue');
  }, 400);
}


document.getElementById("up-per-click").onclick = function() {
  if(counter - costPerClick >= 0) {
    counter -= costPerClick;
    perClick += 1;
    costPerClick += Math.floor(costPerClick*0.4);
    render();
  }
}
document.getElementById("up-per-second").onclick = function() {
  if(counter - costPerSec >= 0) {
    counter -= costPerSec;
    perSec += 1;
    costPerSec += Math.floor(costPerSec*0.4);
    render();
  }
}

setInterval(function() {
  counter += perSec;
  for(var i = 0; i < perSec; i++) {
    document.body.classList.add('blue');
    setTimeout(function() {
      document.body.classList.remove('blue');
    }, 400);
  }
  render();
}, 1000);
