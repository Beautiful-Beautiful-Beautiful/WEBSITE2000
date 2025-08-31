(()=>{ 
  const c = document.createElement('canvas'),
        x = c.getContext('2d'),
        P = [];

  Object.assign(c.style, {
    position:'fixed',
    inset:0,
    width:'100%',
    height:'100%',
    pointerEvents:'none',
    zIndex:10000
  });
  document.body.appendChild(c);

  let dpr = window.devicePixelRatio || 1;
  function resize() {
    c.width  = innerWidth * dpr;
    c.height = innerHeight * dpr;
    x.setTransform(1, 0, 0, 1, 0, 0); // reset
    x.scale(dpr, dpr);                // scale once
  }
  addEventListener('resize', resize, { passive:true });
  resize();

  addEventListener('mousemove', e => {
    for(let i=0;i<6;i++) {
      P.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random()-.5)*1.6,
        vy: (Math.random()-.5)*1.6,
        a: 1,
        r: 1+Math.random()*2
      });
    }
  }, { passive:true });

  (function loop(){
    requestAnimationFrame(loop);
    x.clearRect(0, 0, innerWidth, innerHeight);
    x.fillStyle = '#a6a6a6';
    for(let i=P.length-1;i>=0;i--){
      let p=P[i];
      p.x+=p.vx; p.y+=p.vy; p.vy+=.02; p.a*=.96;
      if(p.a<.05){ P.splice(i,1); continue; }
      x.globalAlpha=p.a;
      x.beginPath();
      x.arc(p.x,p.y,p.r,0,6.283);
      x.fill();
    }
    x.globalAlpha=1;
  })();
})();
