
function drawVoyagerDisc(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const size = 850;
  const cx = size / 2;
  const cy = size / 2;
  const discR = 410;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
  svg.setAttribute("class", "voyager-svg");
  svg.style.width = "100%";
  svg.style.height = "100%";

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

  
  const grad = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
  grad.setAttribute("id", "discGrad");
  grad.setAttribute("cx", "42%");
  grad.setAttribute("cy", "38%");
  grad.setAttribute("r", "55%");
  [
    ["0%", "#f0d878"],
    ["20%", "#caa53a"],
    ["50%", "#9a7a20"],
    ["75%", "#6b5515"],
    ["100%", "#3a2a08"],
  ].forEach(([offset, color]) => {
    const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop.setAttribute("offset", offset);
    stop.setAttribute("stop-color", color);
    grad.appendChild(stop);
  });
  defs.appendChild(grad);

  
  const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
  filter.setAttribute("id", "metalTexture");
  filter.setAttribute("x", "0%");
  filter.setAttribute("y", "0%");
  filter.setAttribute("width", "100%");
  filter.setAttribute("height", "100%");

  const turb = document.createElementNS("http://www.w3.org/2000/svg", "feTurbulence");
  turb.setAttribute("type", "fractalNoise");
  turb.setAttribute("baseFrequency", "0.65");
  turb.setAttribute("numOctaves", "3");
  turb.setAttribute("seed", "42");
  turb.setAttribute("result", "noise");
  filter.appendChild(turb);

  const cm = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
  cm.setAttribute("in", "noise");
  cm.setAttribute("type", "saturate");
  cm.setAttribute("values", "0");
  cm.setAttribute("result", "grayNoise");
  filter.appendChild(cm);

  const blend = document.createElementNS("http://www.w3.org/2000/svg", "feBlend");
  blend.setAttribute("in", "SourceGraphic");
  blend.setAttribute("in2", "grayNoise");
  blend.setAttribute("mode", "multiply");
  filter.appendChild(blend);
  defs.appendChild(filter);

  
  const specGrad = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
  specGrad.setAttribute("id", "specular");
  specGrad.setAttribute("cx", "65%");
  specGrad.setAttribute("cy", "30%");
  specGrad.setAttribute("r", "30%");
  [
    ["0%", "rgba(255,248,224,0.18)"],
    ["100%", "rgba(255,248,224,0)"],
  ].forEach(([offset, color]) => {
    const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop.setAttribute("offset", offset);
    stop.setAttribute("stop-color", color);
    specGrad.appendChild(stop);
  });
  defs.appendChild(specGrad);

  svg.appendChild(defs);

  
  const disc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  disc.setAttribute("cx", cx);
  disc.setAttribute("cy", cy);
  disc.setAttribute("r", discR);
  disc.setAttribute("fill", "url(#discGrad)");
  disc.setAttribute("filter", "url(#metalTexture)");
  svg.appendChild(disc);

  
  const specular = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  specular.setAttribute("cx", cx + 60);
  specular.setAttribute("cy", cy - 80);
  specular.setAttribute("r", 120);
  specular.setAttribute("fill", "url(#specular)");
  svg.appendChild(specular);

  
  const engravings = document.createElementNS("http://www.w3.org/2000/svg", "g");
  engravings.setAttribute("stroke", "#f5eeda");
  engravings.setAttribute("fill", "none");
  engravings.setAttribute("stroke-width", "1.2");
  engravings.setAttribute("opacity", "0.88");

  
  const hole = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  hole.setAttribute("cx", cx - 5);
  hole.setAttribute("cy", cy + 5);
  hole.setAttribute("r", 18);
  hole.setAttribute("fill", "#000");
  hole.setAttribute("stroke", "#f5eeda");
  hole.setAttribute("stroke-width", "0.8");
  svg.appendChild(hole);

  
  
  
  const pbCx = 210, pbCy = 250, pbR = 85;
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2;
    const x1 = pbCx + Math.cos(a) * (pbR - 5);
    const y1 = pbCy + Math.sin(a) * (pbR - 5);
    const x2 = pbCx + Math.cos(a) * (pbR + 5);
    const y2 = pbCy + Math.sin(a) * (pbR + 5);
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke-width", "0.8");
    engravings.appendChild(line);
  }
  const pbCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  pbCircle.setAttribute("cx", pbCx);
  pbCircle.setAttribute("cy", pbCy);
  pbCircle.setAttribute("r", pbR);
  engravings.appendChild(pbCircle);
  const pbCenter = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  pbCenter.setAttribute("cx", pbCx);
  pbCenter.setAttribute("cy", pbCy);
  pbCenter.setAttribute("r", 4);
  engravings.appendChild(pbCenter);
  const pbCenterRing = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  pbCenterRing.setAttribute("cx", pbCx);
  pbCenterRing.setAttribute("cy", pbCy);
  pbCenterRing.setAttribute("r", 8);
  pbCenterRing.setAttribute("stroke-width", "0.8");
  engravings.appendChild(pbCenterRing);

  
  const armAngle = -Math.PI / 4;
  const armX1 = pbCx + Math.cos(armAngle) * (pbR + 25);
  const armY1 = pbCy + Math.sin(armAngle) * (pbR + 25);
  const armX2 = pbCx + Math.cos(armAngle) * (pbR - 15);
  const armY2 = pbCy + Math.sin(armAngle) * (pbR - 15);
  const arm = document.createElementNS("http://www.w3.org/2000/svg", "line");
  arm.setAttribute("x1", armX1);
  arm.setAttribute("y1", armY1);
  arm.setAttribute("x2", armX2);
  arm.setAttribute("y2", armY2);
  arm.setAttribute("stroke-width", "1.5");
  engravings.appendChild(arm);
  const cart = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  cart.setAttribute("x", armX1 - 6);
  cart.setAttribute("y", armY1 - 4);
  cart.setAttribute("width", 12);
  cart.setAttribute("height", 8);
  engravings.appendChild(cart);

  
  
  
  const waveX0 = 480, waveY0 = 180, waveW = 200;
  let spiralPath = `M ${waveX0} ${waveY0}`;
  for (let i = 0; i < 80; i++) {
    const t = i / 80;
    const x = waveX0 + t * 40;
    const y = waveY0 + Math.sin(t * Math.PI * 12) * 12;
    spiralPath += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  const spiral = document.createElementNS("http://www.w3.org/2000/svg", "path");
  spiral.setAttribute("d", spiralPath);
  spiral.setAttribute("stroke-width", "1.2");
  engravings.appendChild(spiral);

  let wavePath = `M ${waveX0 + 50} ${waveY0}`;
  for (let i = 0; i < 150; i++) {
    const t = i / 150;
    const x = waveX0 + 50 + t * waveW;
    const y = waveY0 + Math.sin(t * Math.PI * 6) * 18
      + Math.sin(t * Math.PI * 14) * 8
      + Math.sin(t * Math.PI * 22) * 4
      + (Math.sin(t * 47.3) * 3);
    wavePath += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  const wave = document.createElementNS("http://www.w3.org/2000/svg", "path");
  wave.setAttribute("d", wavePath);
  wave.setAttribute("stroke-width", "1.2");
  engravings.appendChild(wave);

  
  const barY = waveY0 + 35;
  for (let i = 0; i < 30; i++) {
    const x = waveX0 + 50 + i * 6.5;
    const h = (i % 3 === 0) ? 10 : 5;
    const bar = document.createElementNS("http://www.w3.org/2000/svg", "line");
    bar.setAttribute("x1", x);
    bar.setAttribute("y1", barY);
    bar.setAttribute("x2", x);
    bar.setAttribute("y2", barY + h);
    bar.setAttribute("stroke-width", "1.5");
    engravings.appendChild(bar);
  }

  
  
  
  const sawX0 = 520, sawY0 = 340, sawW = 160, sawH = 35;
  for (let s = 0; s < 3; s++) {
    let sawPath = `M ${sawX0} ${sawY0 + s * 45}`;
    for (let i = 0; i < 12; i++) {
      const t = i / 12;
      const x = sawX0 + t * sawW;
      const rampY = sawY0 + s * 45 - t * sawH;
      sawPath += ` L ${x.toFixed(1)} ${rampY.toFixed(1)}`;
    }
    sawPath += ` L ${sawX0 + sawW} ${sawY0 + s * 45 + 15}`;
    sawPath += ` L ${sawX0} ${sawY0 + s * 45 + 15}`;
    const saw = document.createElementNS("http://www.w3.org/2000/svg", "path");
    saw.setAttribute("d", sawPath);
    saw.setAttribute("stroke-width", "1");
    engravings.appendChild(saw);

    for (let i = 0; i < 6; i++) {
      const px = sawX0 + (i / 6) * sawW;
      const py = sawY0 + s * 45 - (i / 6) * sawH;
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("cx", px);
      dot.setAttribute("cy", py);
      dot.setAttribute("r", 2);
      dot.setAttribute("fill", "#f5eeda");
      dot.setAttribute("stroke", "none");
      engravings.appendChild(dot);
    }
  }

  
  
  
  const cal1X = 510, cal1Y = 470, cal1W = 100, cal1H = 60;
  const cal1Rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  cal1Rect.setAttribute("x", cal1X);
  cal1Rect.setAttribute("y", cal1Y);
  cal1Rect.setAttribute("width", cal1W);
  cal1Rect.setAttribute("height", cal1H);
  engravings.appendChild(cal1Rect);
  for (let i = 0; i < 12; i++) {
    const lx = cal1X + 5 + i * 8;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", lx);
    line.setAttribute("y1", cal1Y + 5);
    line.setAttribute("x2", lx);
    line.setAttribute("y2", cal1Y + cal1H - 5);
    engravings.appendChild(line);
  }

  
  
  
  const cal2X = 510, cal2Y = 550, cal2W = 100, cal2H = 60;
  const cal2Rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  cal2Rect.setAttribute("x", cal2X);
  cal2Rect.setAttribute("y", cal2Y);
  cal2Rect.setAttribute("width", cal2W);
  cal2Rect.setAttribute("height", cal2H);
  engravings.appendChild(cal2Rect);
  const cal2Circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  cal2Circle.setAttribute("cx", cal2X + cal2W / 2);
  cal2Circle.setAttribute("cy", cal2Y + cal2H / 2);
  cal2Circle.setAttribute("r", 22);
  engravings.appendChild(cal2Circle);

  
  
  
  const pulsCx = 260, pulsCy = 650;
  const refLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  refLine.setAttribute("x1", pulsCx - 120);
  refLine.setAttribute("y1", pulsCy);
  refLine.setAttribute("x2", pulsCx + 180);
  refLine.setAttribute("y2", pulsCy);
  refLine.setAttribute("stroke-width", "0.8");
  engravings.appendChild(refLine);

  const pulsarData = [
    { angle: -20, len: 180 }, { angle: -45, len: 140 },
    { angle: -70, len: 200 }, { angle: -100, len: 110 },
    { angle: -130, len: 160 }, { angle: -160, len: 90 },
    { angle: -190, len: 130 }, { angle: -220, len: 170 },
    { angle: -250, len: 100 }, { angle: -280, len: 150 },
    { angle: -310, len: 120 }, { angle: -340, len: 80 },
    { angle: 10, len: 190 }, { angle: 40, len: 145 },
  ];

  pulsarData.forEach((p) => {
    const a = (p.angle * Math.PI) / 180;
    const x2 = pulsCx + Math.cos(a) * p.len;
    const y2 = pulsCy + Math.sin(a) * p.len;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", pulsCx);
    line.setAttribute("y1", pulsCy);
    line.setAttribute("x2", x2.toFixed(1));
    line.setAttribute("y2", y2.toFixed(1));
    line.setAttribute("stroke-width", "1");
    engravings.appendChild(line);
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", x2.toFixed(1));
    dot.setAttribute("cy", y2.toFixed(1));
    dot.setAttribute("r", 2);
    dot.setAttribute("fill", "#f5eeda");
    dot.setAttribute("stroke", "none");
    engravings.appendChild(dot);
  });

  const pulsCenter = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  pulsCenter.setAttribute("cx", pulsCx);
  pulsCenter.setAttribute("cy", pulsCy);
  pulsCenter.setAttribute("r", 3);
  pulsCenter.setAttribute("fill", "#f5eeda");
  pulsCenter.setAttribute("stroke", "none");
  engravings.appendChild(pulsCenter);

  
  const binY = pulsCy - 70;
  for (let i = 0; i < 20; i++) {
    const x = pulsCx - 60 + i * 6;
    const h = (i % 4 === 0) ? 8 : 4;
    const bar = document.createElementNS("http://www.w3.org/2000/svg", "line");
    bar.setAttribute("x1", x);
    bar.setAttribute("y1", binY);
    bar.setAttribute("x2", x);
    bar.setAttribute("y2", binY + h);
    bar.setAttribute("stroke-width", "1.2");
    engravings.appendChild(bar);
  }

  
  
  
  const hCx = 580, hCy = 680, hR = 14;
  const hLeft = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  hLeft.setAttribute("cx", hCx - 35);
  hLeft.setAttribute("cy", hCy);
  hLeft.setAttribute("r", hR);
  engravings.appendChild(hLeft);

  
  const arrowDown = document.createElementNS("http://www.w3.org/2000/svg", "line");
  arrowDown.setAttribute("x1", hCx - 35);
  arrowDown.setAttribute("y1", hCy - 5);
  arrowDown.setAttribute("x2", hCx - 35);
  arrowDown.setAttribute("y2", hCy + 5);
  engravings.appendChild(arrowDown);
  const ah1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  ah1.setAttribute("x1", hCx - 38); ah1.setAttribute("y1", hCy + 2);
  ah1.setAttribute("x2", hCx - 35); ah1.setAttribute("y2", hCy + 6);
  engravings.appendChild(ah1);
  const ah2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  ah2.setAttribute("x1", hCx - 32); ah2.setAttribute("y1", hCy + 2);
  ah2.setAttribute("x2", hCx - 35); ah2.setAttribute("y2", hCy + 6);
  engravings.appendChild(ah2);

  const hRight = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  hRight.setAttribute("cx", hCx + 35);
  hRight.setAttribute("cy", hCy);
  hRight.setAttribute("r", hR);
  engravings.appendChild(hRight);

  
  const arrowUp = document.createElementNS("http://www.w3.org/2000/svg", "line");
  arrowUp.setAttribute("x1", hCx + 35);
  arrowUp.setAttribute("y1", hCy + 5);
  arrowUp.setAttribute("x2", hCx + 35);
  arrowUp.setAttribute("y2", hCy - 5);
  engravings.appendChild(arrowUp);
  const ah3 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  ah3.setAttribute("x1", hCx + 32); ah3.setAttribute("y1", hCy - 2);
  ah3.setAttribute("x2", hCx + 35); ah3.setAttribute("y2", hCy - 6);
  engravings.appendChild(ah3);
  const ah4 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  ah4.setAttribute("x1", hCx + 38); ah4.setAttribute("y1", hCy - 2);
  ah4.setAttribute("x2", hCx + 35); ah4.setAttribute("y2", hCy - 6);
  engravings.appendChild(ah4);

  const hConn = document.createElementNS("http://www.w3.org/2000/svg", "line");
  hConn.setAttribute("x1", hCx - 35 + hR);
  hConn.setAttribute("y1", hCy);
  hConn.setAttribute("x2", hCx + 35 - hR);
  hConn.setAttribute("y2", hCy);
  engravings.appendChild(hConn);

  for (let i = 0; i < 3; i++) {
    const mx = hCx - 10 + i * 10;
    const mark = document.createElementNS("http://www.w3.org/2000/svg", "line");
    mark.setAttribute("x1", mx);
    mark.setAttribute("y1", hCy - 8);
    mark.setAttribute("x2", mx);
    mark.setAttribute("y2", hCy - 2);
    engravings.appendChild(mark);
  }

  
  const outerRing = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  outerRing.setAttribute("cx", cx);
  outerRing.setAttribute("cy", cy);
  outerRing.setAttribute("r", discR);
  outerRing.setAttribute("stroke-width", "1.5");
  outerRing.setAttribute("fill", "none");
  engravings.appendChild(outerRing);

  const innerRing = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  innerRing.setAttribute("cx", cx);
  innerRing.setAttribute("cy", cy);
  innerRing.setAttribute("r", discR - 10);
  innerRing.setAttribute("stroke-width", "0.5");
  innerRing.setAttribute("fill", "none");
  engravings.appendChild(innerRing);

  svg.appendChild(engravings);
  container.appendChild(svg);
}
