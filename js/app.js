/* ---------- Almacenamiento ---------- */
const Store=(()=>{let mem={},ok=false;try{localStorage.setItem('__t','1');localStorage.removeItem('__t');ok=true;}catch(e){}
  return{get:k=>{try{return ok?localStorage.getItem(k):(mem[k]??null);}catch(e){return mem[k]??null;}},
         set:(k,v)=>{try{ok?localStorage.setItem(k,v):(mem[k]=v);}catch(e){throw e;}}};})();

/* ---------- Fuentes ---------- */
const FONTS=[
  {n:'Baloo (redonda)', v:"'Baloo 2', system-ui, sans-serif"},
  {n:'Poppins', v:"'Poppins', sans-serif"},
  {n:'Montserrat', v:"'Montserrat', sans-serif"},
  {n:'Fredoka', v:"'Fredoka', sans-serif"},
  {n:'Bebas Neue', v:"'Bebas Neue', sans-serif"},
  {n:'Oswald', v:"'Oswald', sans-serif"},
  {n:'Anton', v:"'Anton', sans-serif"},
  {n:'Righteous', v:"'Righteous', sans-serif"},
  {n:'Orbitron (tecno)', v:"'Orbitron', sans-serif"},
  {n:'Playfair (elegante)', v:"'Playfair Display', serif"},
  {n:'Lobster (script)', v:"'Lobster', cursive"},
  {n:'Pacifico (script)', v:"'Pacifico', cursive"},
];

/* ---------- Defaults ---------- */
const PAL={a:['#2fa39a','#f4d21e','#e2574c','#3a7bd5','#8e44ad','#e67e22'],
           b:['#00e5ff','#ff2bd6','#7c4dff','#00ff9d','#ffd000','#ff4d6d'],
           c:['#c9a24b','#8a6f3a','#e6c778','#5c7a5c','#a8894c','#3f5b45']};
const DEF_PRIZES={
  a:['Coke','Burger','Fries','Shake','Donut','IceCream'],
  b:['1000 pts','Otra vez','Skin VIP','50 Coins','JACKPOT','Sigue así'],
  c:['Cena VIP','15% OFF','Copa Gratis','Postre','Estadía','Otra vez']
};
const KEY='ruleta_config_v5';
function buildDefaults(){
  const meta={
    a:{name:'Plantilla 1',bg:'#ffffff',accent:'#2f6fe6',accent2:'#111111',frame:'#1c2b45',font:"'Baloo 2', system-ui, sans-serif",mode:'alt',alt:['#2f6fe6','#ffffff']},
    b:{name:'Plantilla 2',bg:'#0b0e22',accent:'#00e5ff',accent2:'#ff2bd6',frame:'#2fd8ff',font:"'Orbitron', sans-serif",mode:'alt',alt:['#141a52','#00d8ff']},
    c:{name:'Plantilla 3',bg:'#12160f',accent:'#c9a24b',accent2:'#e6c778',frame:'#caa64f',font:"'Playfair Display', serif",mode:'alt',alt:['#20261c','#c9a24b']}
  };
  const templates={};
  ['a','b','c'].forEach(id=>{
    templates[id]={name:meta[id].name, headerText: 'Ruleta', headerSize: 22, headerColor: '#22262e', headerLogo:null, font:meta[id].font, frame:meta[id].frame,
      theme:{bg:meta[id].bg,accent:meta[id].accent,accent2:meta[id].accent2},
      bgImage:null, logo:null, colorMode:meta[id].mode, altColors:meta[id].alt,
      btnText: 'Girar', btnBg: meta[id].accent, btnColor: '#ffffff', btnBorderSize: 0, btnBorderColor: '#ffffff',
      btnTextSize: 21, btnWidth: 0, btnHeight: 0, btnRadius: 999, btnShadow: 14,
      divColor: 'rgba(255,255,255,.92)', divWidth: 4, rimWidth: 3,
      bulbColor: null, bulbIntensity: 0.4, bulbSize: 1, bulbCount: 24, bulbSpeed: 85,
      prizeTextColor: null, prizeTextSize: 22, prizeTextStroke: 0, prizeTextStrokeColor: '#000000', imgZoom: 1, imgZoomNoText: 1,
      introEnabled:true, introTitle:'', introBtnText:'Toca para jugar', introLogo:null, introLogoSize:1, introBg:null, idleSeconds:45,
      prizes:DEF_PRIZES[id].map((label,i)=>({label,weight:1,prob:50,stock:null,stock0:null,color:PAL[id][i%PAL[id].length],image:null}))};
  });
  return {active:'a', order:['a','b','c'], adminCode:'1234', templates};
}
function normalizeTemplate(t,d){
  t=t||{};
  t.name=t.name??d.name; t.font=t.font||d.font; t.theme=t.theme||d.theme; t.frame=t.frame||d.frame||'#d9b44a';
  t.bgImage=t.bgImage??null; t.logo=t.logo??null;
  t.colorMode=t.colorMode||'individual'; t.altColors=t.altColors||['#2fa39a','#f4d21e'];
  t.prizes=(t.prizes||[]).map(p=>({label:p.label??'',weight:p.weight??1,prob:(p.prob==null?50:Math.max(1,Math.min(100,+p.prob))),stock:(p.stock===undefined?null:p.stock),stock0:(p.stock0===undefined?(p.stock===undefined?null:p.stock):p.stock0),color:p.color||'#cccccc',image:p.image??null}));

  t.introEnabled=t.introEnabled??true;
  t.idleSeconds=t.idleSeconds??45;
  t.introTitle=t.introTitle??'';
  t.introBtnText=t.introBtnText||'Toca para jugar';
  t.introLogo=t.introLogo??null;
  t.introLogoSize=t.introLogoSize??1;
  t.introBg=t.introBg??null;

  t.headerText=t.headerText||t.name||'Ruleta';
  t.headerSize=t.headerSize??22;
  t.headerColor=t.headerColor||'#22262e';
  t.headerLogo=t.headerLogo??null;
  t.btnText=t.btnText||'Girar';
  t.btnBg=t.btnBg||t.theme.accent;
  t.btnColor=t.btnColor||'#ffffff';
  t.btnBorderSize=t.btnBorderSize??0;
  t.btnBorderColor=t.btnBorderColor||'#ffffff';
  t.btnTextSize=t.btnTextSize??21;
  t.btnWidth=t.btnWidth??0;
  t.btnHeight=t.btnHeight??0;
  t.btnRadius=t.btnRadius??999;
  t.btnShadow=t.btnShadow??14;

  t.divColor=t.divColor||'rgba(255,255,255,.92)';
  t.divWidth=t.divWidth??4;
  t.rimWidth=t.rimWidth??3;

  t.bulbColor=t.bulbColor||null;
  t.bulbIntensity=t.bulbIntensity??0.4;
  t.bulbSize=t.bulbSize??1;
  t.bulbCount=t.bulbCount??24;
  t.bulbSpeed=t.bulbSpeed??85;

  t.prizeTextColor=t.prizeTextColor||null;
  t.prizeTextSize=t.prizeTextSize??22;
  t.prizeTextStroke=t.prizeTextStroke??0;
  t.prizeTextStrokeColor=t.prizeTextStrokeColor||'#000000';
  t.imgZoom=t.imgZoom??1;
  t.imgZoomNoText=t.imgZoomNoText??1;
  return t;
}
function normalize(c){
  if(!c||!c.templates) return buildDefaults();
  c.order=c.order||Object.keys(c.templates);
  c.active=c.active||c.order[0];
  c.order.forEach((id,k)=>{
    const d=buildDefaults().templates[c.order[k]]||buildDefaults().templates.a;
    c.templates[id]=normalizeTemplate(c.templates[id]||{}, d);
  });
  c.adminCode=c.adminCode||'1234';
  return c;
}
let config=normalize(load()); let active=config.active;
function load(){try{const r=Store.get(KEY);if(r){const c=JSON.parse(r);if(c&&c.templates)return c;}}catch(e){}return buildDefaults();}
const tpl=()=>config.templates[active];
const prizes=()=>tpl().prizes;
const visiblePrizes=()=>prizes().filter(p=>p.stock===null||p.stock===undefined||(+p.stock)>0);
function save(){try{Store.set(KEY,JSON.stringify(config));}catch(e){toast('No se pudo guardar: imágenes muy pesadas.');}}

/* ---------- Helpers de color ---------- */
function h2r(h){h=(h||'#000').replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
function r2h(r,g,b){const c=n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,'0');return'#'+c(r)+c(g)+c(b);}
function mix(a,b,t){const A=h2r(a),B=h2r(b);return r2h(A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t,A[2]+(B[2]-A[2])*t);}
function lum(h){const[r,g,b]=h2r(h);return r*.299+g*.587+b*.114;}
function inkOn(h){return lum(h)>150?'#1b1b22':'#ffffff';}
function textColor(hex){return lum(hex||'#ccc')>150?'#1b1b1b':'#fff';}

function applyTheme(){
  const th=tpl().theme,bg=th.bg,ac=th.accent,ac2=th.accent2,dark=lum(bg)<140,ink=dark?'#eef1f8':'#22262e',S=document.documentElement.style;
  S.setProperty('--bg',bg); S.setProperty('--bg2',dark?mix(bg,'#000',.25):mix(bg,'#000',.06));
  S.setProperty('--ink',ink); S.setProperty('--muted',mix(ink,bg,.42));
  S.setProperty('--accent',ac); S.setProperty('--accent2',ac2); S.setProperty('--accent-ink',inkOn(ac));
  S.setProperty('--panel',dark?mix(bg,'#ffffff',.09):'#ffffff'); S.setProperty('--line',dark?mix(bg,'#ffffff',.16):mix(bg,'#000',.10));
  S.setProperty('--hub',dark?mix(bg,'#ffffff',.90):'#fbf3dd');
  S.setProperty('--display',tpl().font||"'Poppins',sans-serif");
  S.setProperty('--header-size',`${tpl().headerSize||22}px`);
  S.setProperty('--header-color',tpl().headerColor||'#22262e');
  
  // Custom button properties
  S.setProperty('--btn-text-size',`${tpl().btnTextSize||21}px`);
  S.setProperty('--btn-width',tpl().btnWidth>0?`${tpl().btnWidth}px`:'auto');
  S.setProperty('--btn-height',tpl().btnHeight>0?`${tpl().btnHeight}px`:'auto');
  S.setProperty('--btn-padding-v',tpl().btnHeight>0?'0':'16px');
  S.setProperty('--btn-padding-h',tpl().btnWidth>0?'0':'52px');
  S.setProperty('--btn-radius',`${tpl().btnRadius??999}px`);
  S.setProperty('--btn-shadow',`0 14px ${tpl().btnShadow??14}px -12px rgba(0,0,0,.5)`);

  // Dividers & bulbs
  S.setProperty('--div-color',tpl().divColor||'rgba(255,255,255,.92)');
  S.setProperty('--div-width',`${tpl().divWidth??4}px`);
  S.setProperty('--rim-width',tpl().rimWidth||3);
  S.setProperty('--bulb-intensity',tpl().bulbIntensity??0.4);
  S.setProperty('--bulb-size-factor',tpl().bulbSize??1);
  S.setProperty('--bulb-count',tpl().bulbCount??24);
  S.setProperty('--bulb-speed',tpl().bulbSpeed??85);

  applyFrame(); applyBg();

  const btn=document.getElementById('spinBtn');
  if(btn){
    btn.textContent=tpl().btnText||'Girar';
    btn.style.background=tpl().btnBg;
    btn.style.color=tpl().btnColor;
    if(tpl().btnBorderSize>0){
      btn.style.border=`${tpl().btnBorderSize}px solid ${tpl().btnBorderColor}`;
    }else{
      btn.style.border='none';
    }
  }
}
function applyFrame(){
  const base=tpl().frame||'#d9b44a',S=document.documentElement.style;
  S.setProperty('--frame',base);
  S.setProperty('--frame-lite',mix(base,'#ffffff',.55));
  S.setProperty('--frame-dark',mix(base,'#000000',.5));
  const g0=document.getElementById('gs0'),g1=document.getElementById('gs1'),g2=document.getElementById('gs2');
  if(g0){g0.setAttribute('stop-color',mix(base,'#fff',.6));g1.setAttribute('stop-color',base);g2.setAttribute('stop-color',mix(base,'#000',.4));}
  const strokeC=mix(base,'#000',.55);
  ['pArrow'].forEach(id=>{const el=document.getElementById(id);if(el)el.setAttribute('stroke',strokeC);});
  const jw=document.getElementById('pJewel');if(jw)jw.setAttribute('fill',mix(base,'#fff',.8));
}
function applyBg(){
  if(tpl().bgImage) document.body.style.background=`center/cover no-repeat fixed url(${tpl().bgImage})`;
  else document.body.style.background='';
}

/* ---------- Imágenes ---------- */
const imgCache=new Map();
function getImg(url){if(!url)return null;let e=imgCache.get(url);if(e)return e.loaded?e.img:null;
  const img=new Image();e={img,loaded:false};imgCache.set(url,e);
  img.onload=()=>{e.loaded=true;draw();};img.onerror=()=>{e.loaded=false;};img.src=url;return null;}
function downscale(file,max,type,q){return new Promise(res=>{const img=new Image();
  img.onload=()=>{let w=img.width,h=img.height;const s=Math.min(1,max/Math.max(w,h));w=Math.round(w*s);h=Math.round(h*s);
    const c=document.createElement('canvas');c.width=w;c.height=h;const cx=c.getContext('2d');cx.drawImage(img,0,0,w,h);
    res(c.toDataURL(type||'image/png',q||0.95));};
  const fr=new FileReader();fr.onload=()=>img.src=fr.result;fr.readAsDataURL(file);});}

/* ---------- Dibujo de la Ruleta ---------- */
const canvas=document.getElementById('wheel'),ctx=canvas.getContext('2d');
const SIZE=900,R=SIZE/2,CX=R,CY=R,rOuter=R-4,rSeg=R*0.845,rBulb=(rOuter+rSeg)/2;
let rotation=0;
function metalGrad(x0,y0,x1,y1){const b=tpl().frame||'#d9b44a',g=ctx.createLinearGradient(x0,y0,x1,y1);
  g.addColorStop(0,mix(b,'#ffffff',.7));g.addColorStop(.28,mix(b,'#ffffff',.22));g.addColorStop(.5,mix(b,'#000000',.32));g.addColorStop(.72,mix(b,'#ffffff',.15));g.addColorStop(1,mix(b,'#000000',.5));return g;}

function draw(){
  ctx.clearRect(0,0,SIZE,SIZE);
  const list=visiblePrizes(),n=list.length||1;
  const alt=tpl().colorMode==='alt',aC=tpl().altColors||['#ccc','#ddd'];
  const fd=mix(tpl().frame||'#d9b44a','#000',.55);
  
  // --- Segmentos ---
  ctx.save();
  ctx.beginPath();ctx.arc(CX,CY,rSeg,0,7);ctx.clip();
  let start=-Math.PI/2+rotation;
  const fam=tpl().font||"'Poppins',sans-serif";
  
  list.forEach((p,i)=>{
    const frac=1/n,ang=Math.PI*2/n;
    const col=alt?(aC[i%2]||'#ccc'):(p.color||'#ccc');
    ctx.beginPath();ctx.moveTo(CX,CY);ctx.arc(CX,CY,rSeg+30,start,start+ang);ctx.closePath();
    ctx.fillStyle=col;ctx.fill();
    ctx.strokeStyle=tpl().divColor||'rgba(255,255,255,.92)';ctx.lineWidth=tpl().divWidth??4;ctx.stroke();
    
    ctx.save();
    ctx.translate(CX,CY);
    ctx.rotate(start+ang/2);
    
    const img=p.image?getImg(p.image):null,hasText=(p.label||'').trim().length>0;
    const zoomFactor = tpl().imgZoom || 1;
    const zoomNoText = tpl().imgZoomNoText || 1;
    
    // 1. Imagen del premio (se adapta al espacio del sector)
    if(img){
      ctx.save();
      const ar = img.width/img.height, sinH = Math.sin(ang/2), K = 0.9;
      let centerR, w, h;
      if(hasText){
        // imagen en la zona exterior; el texto va en la interior
        const innerR = rSeg*0.50, outerR = rSeg*0.95, maxH = outerR-innerR;
        centerR = (innerR+outerR)/2;
        const maxW = 2*innerR*sinH*K;
        if(ar > maxW/maxH){ w = maxW; h = w/ar; } else { h = maxH; w = h*ar; }
        w*=zoomFactor; h*=zoomFactor;
        if(w>maxW){w=maxW;h=w/ar;} if(h>maxH){h=maxH;w=h*ar;}
      } else {
        // sin texto: anclada arriba (borde exterior, junto al aro); crece hacia el centro
        const outerR = rSeg*0.95, innerR = rSeg*0.18, span = outerR-innerR;
        h = Math.min(span, 2*outerR*sinH*K/(ar + 2*sinH*K));
        w = h*ar;
        h*=zoomNoText; w*=zoomNoText;
        centerR = outerR - h/2;
      }
      ctx.translate(centerR, 0);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(img, -w/2, -h/2, w, h);
      ctx.restore();
    }

    // 2. Renderizado del Texto
    if(hasText){
      ctx.save();
      let textDist = img ? rSeg * 0.44 : rSeg * 0.62;
      ctx.translate(textDist, 0);
      ctx.rotate(Math.PI / 2);
      
      const maxTextWidth = 2 * textDist * Math.sin(ang / 2) * 0.86; 
      const baseFs = Math.min(tpl().prizeTextSize || 22, Math.max(9, ang * textDist * 0.45));
      ctx.font = `800 ${baseFs}px ${fam}`;
      
      let measured = ctx.measureText(p.label).width;
      let fs = baseFs;
      if(measured > maxTextWidth) {
        fs = Math.max(9, baseFs * (maxTextWidth / measured));
        ctx.font = `800 ${fs}px ${fam}`;
      }
      
      ctx.fillStyle = tpl().prizeTextColor || textColor(col);
      if(tpl().prizeTextStroke > 0) {
        ctx.lineWidth = tpl().prizeTextStroke;
        ctx.strokeStyle = tpl().prizeTextStrokeColor || '#000000';
        ctx.strokeText(p.label, 0, 0);
      }
      ctx.textAlign='center';
      ctx.textBaseline='middle';
      ctx.fillText(p.label, 0, 0);
      ctx.restore();
    }
    
    ctx.restore();
    start+=ang;
  });
  ctx.restore();
  
  // --- Aro Dorado ---
  ctx.beginPath();ctx.arc(CX,CY,rOuter,0,Math.PI*2);ctx.moveTo(CX+rSeg,CY);ctx.arc(CX,CY,rSeg,0,Math.PI*2);
  ctx.fillStyle=metalGrad(CX-rOuter,CY-rOuter,CX+rOuter,CY+rOuter);ctx.fill('evenodd');
  ctx.lineWidth=tpl().rimWidth || 3;ctx.strokeStyle=fd;
  ctx.beginPath();ctx.arc(CX,CY,rOuter,0,7);ctx.stroke();
  ctx.beginPath();ctx.arc(CX,CY,rSeg,0,7);ctx.stroke();
  
  // --- Bombillos ---
  const nB=tpl().bulbCount || 24,bs=(rOuter-rSeg)*0.15*(tpl().bulbSize||1),fb=tpl().bulbColor || tpl().frame || '#d9b44a';
  const glowMid=mix(fb,'#ffffff',tpl().bulbIntensity||0.4),glowLo=mix(fb,'#ffffff',.08),coreOn=mix(fb,'#ffffff',.78),coreOff=mix(fb,'#000000',.05);
  const phase=spinning?Math.floor(performance.now()/(tpl().bulbSpeed||85)):0;
  for(let i=0;i<nB;i++){const a=(i/nB)*Math.PI*2-Math.PI/2,x=CX+Math.cos(a)*rBulb,y=CY+Math.sin(a)*rBulb,on=(i+phase)%2===0;
    let g=ctx.createRadialGradient(x,y,0,x,y,bs*2.6);g.addColorStop(0,'#fffef4');g.addColorStop(.4,on?glowMid:glowLo);g.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,bs*(on?2.7:1.9),0,7);ctx.fill();
    ctx.fillStyle=on?coreOn:coreOff;ctx.beginPath();ctx.arc(x,y,bs,0,7);ctx.fill();
    ctx.lineWidth=1.4;ctx.strokeStyle=fd;ctx.stroke();}
    
  // --- Sol Central ---
  const pts=12,ro=R*0.205,ri=R*0.145;
  ctx.save();ctx.translate(CX,CY);ctx.beginPath();
  for(let i=0;i<pts*2;i++){const rr=i%2?ri:ro,a=(i/(pts*2))*Math.PI*2-Math.PI/2;const x=Math.cos(a)*rr,y=Math.sin(a)*rr;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}
  ctx.closePath();ctx.fillStyle=metalGrad(-ro,-ro,ro,ro);ctx.fill();
  ctx.lineWidth=2;ctx.strokeStyle=fd;ctx.stroke();ctx.restore();
}

function updateHub(){const logo=tpl().logo,im=document.getElementById('hubImg'),st=document.getElementById('hubStar');
  if(logo){im.src=logo;im.style.display='block';st.style.display='none';}else{im.style.display='none';st.style.display='grid';}}
function updatePlayTitle(){
  const logo=tpl().headerLogo,img=document.getElementById('playTitleImg'),txt=document.getElementById('playTitleText');
  if(!img||!txt){const pt=document.getElementById('playTitle');if(pt&&!logo)pt.textContent=tpl().headerText||tpl().name||'Ruleta';return;}
  if(logo){img.src=logo;img.style.display='block';txt.style.display='none';}
  else{img.style.display='none';txt.style.display='block';txt.textContent=tpl().headerText||tpl().name||'Ruleta';}
}

/* ---------- Giro ---------- */
let spinning=false;
function spin(){const list=visiblePrizes();
  if(spinning)return;
  if(list.length<1){toast('No hay premios disponibles.');return;}
  spinning=true;document.getElementById('spinBtn').disabled=true;
  const n=list.length,segAng=Math.PI*2/n;
  // ganador por probabilidad (1-100); si todas son 0, elige al azar
  const totalP=list.reduce((s,p)=>s+Math.max(0,+p.prob||0),0);
  let idx=0;
  if(totalP>0){let r=Math.random()*totalP,acc=0;for(let i=0;i<n;i++){acc+=Math.max(0,+list[i].prob||0);if(r<=acc){idx=i;break;}}}
  else{idx=Math.floor(Math.random()*n);}
  const cum=idx*segAng,jitter=(Math.random()-0.5)*segAng*0.7;
  const targetBase=-(cum+segAng/2+jitter),turns=6+Math.floor(Math.random()*3),from=rotation;
  const to=from+turns*Math.PI*2+(((targetBase-(from%(Math.PI*2)))%(Math.PI*2))+Math.PI*2)%(Math.PI*2);
  const dur=4600,t0=performance.now();
  (function frame(now){const t=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-t,3);rotation=from+(to-from)*e;draw();
    if(t<1)requestAnimationFrame(frame);
    else{spinning=false;
      const won=list[idx];
      if(typeof won.stock==='number'&&won.stock>0){won.stock=Math.max(0,won.stock-1);save();}
      draw();document.getElementById('spinBtn').disabled=false;showWinner(won);}})(performance.now());
}

/* ---------- Configuración ---------- */
let cfg,pinModal;
try{
cfg=document.getElementById('config');const fp=document.getElementById('filePick');let pickTarget=null;
(function fillFontSelect(){const s=document.getElementById('fontSel');FONTS.forEach(f=>{const o=document.createElement('option');o.value=f.v;o.textContent=f.n;o.style.fontFamily=f.v;s.appendChild(o);});})();

function renderPills(){const el=document.getElementById('pills');el.innerHTML='';
  config.order.forEach(id=>{const b=document.createElement('button');b.className='pill'+(id===active?' active':'');b.textContent=config.templates[id].name;
    b.onclick=()=>{active=id;config.active=id;applyTheme();renderConfig();draw();updateHub();updatePlayTitle();};el.appendChild(b);});}
function renderTheme(){
  document.getElementById('tplName').value=tpl().name;
  document.getElementById('headerTextIn').value=tpl().headerText||'';
  document.getElementById('headerSizeIn').value=tpl().headerSize||22;
  document.getElementById('headerSizeVal').textContent=`${tpl().headerSize||22}px`;
  document.getElementById('cHeaderColor').value=tpl().headerColor||'#22262e';
  document.getElementById('fontSel').value=tpl().font;
  document.getElementById('cBg').value=tpl().theme.bg;
  document.getElementById('cAccent').value=tpl().theme.accent;
  document.getElementById('cAccent2').value=tpl().theme.accent2;
  document.getElementById('cFrame').value=tpl().frame||'#d9b44a';
  document.getElementById('altA').value=tpl().altColors[0]||'#2fa39a';
  document.getElementById('altB').value=tpl().altColors[1]||'#f4d21e';
  
  document.getElementById('btnTextIn').value=tpl().btnText||'Girar';
  document.getElementById('btnBorderSizeIn').value=tpl().btnBorderSize??0;
  document.getElementById('cBtnBg').value=tpl().btnBg;
  document.getElementById('cBtnColor').value=tpl().btnColor;
  document.getElementById('cBtnBorder').value=tpl().btnBorderColor;
  document.getElementById('btnTextSizeIn').value=tpl().btnTextSize||21;
  document.getElementById('btnTextSizeVal').textContent=`${tpl().btnTextSize||21}px`;
  document.getElementById('btnWidthIn').value=tpl().btnWidth||0;
  document.getElementById('btnWidthVal').textContent=tpl().btnWidth>0?`${tpl().btnWidth}px`:'Auto';
  document.getElementById('btnHeightIn').value=tpl().btnHeight||0;
  document.getElementById('btnHeightVal').textContent=tpl().btnHeight>0?`${tpl().btnHeight}px`:'Auto';
  document.getElementById('btnRadiusIn').value=tpl().btnRadius??999;
  document.getElementById('btnRadiusVal').textContent=`${tpl().btnRadius??999}px`;
  document.getElementById('btnShadowIn').value=tpl().btnShadow||14;
  document.getElementById('btnShadowVal').textContent=`${tpl().btnShadow||14}px`;

  document.getElementById('cDivColor').value=tpl().divColor||'#ffffff';
  document.getElementById('divWidthIn').value=tpl().divWidth??4;
  document.getElementById('divWidthVal').textContent=`${tpl().divWidth??4}px`;
  document.getElementById('rimWidthIn').value=tpl().rimWidth||3;
  document.getElementById('rimWidthVal').textContent=`${tpl().rimWidth||3}px`;

  document.getElementById('cBulbColor').value=tpl().bulbColor||tpl().frame||'#d9b44a';
  document.getElementById('bulbIntensityIn').value=tpl().bulbIntensity??0.4;
  document.getElementById('bulbIntensityVal').textContent=tpl().bulbIntensity??0.4;
  document.getElementById('bulbSizeIn').value=tpl().bulbSize??1;
  document.getElementById('bulbSizeVal').textContent=tpl().bulbSize??1;
  document.getElementById('bulbCountIn').value=tpl().bulbCount??24;
  document.getElementById('bulbCountVal').textContent=tpl().bulbCount??24;
  document.getElementById('bulbSpeedIn').value=tpl().bulbSpeed??85;
  document.getElementById('bulbSpeedVal').textContent=`${tpl().bulbSpeed??85}ms`;

  document.getElementById('cPrizeText').value=tpl().prizeTextColor||'#22262e';
  document.getElementById('prizeTextSizeIn').value=tpl().prizeTextSize||22;
  document.getElementById('prizeTextSizeVal').textContent=`${tpl().prizeTextSize||22}px`;
  document.getElementById('imgZoomIn').value=tpl().imgZoom||1;
  document.getElementById('imgZoomVal').textContent=`${tpl().imgZoom||1}x`;
  document.getElementById('imgZoomNoTextIn').value=tpl().imgZoomNoText||1;
  document.getElementById('imgZoomNoTextVal').textContent=`${tpl().imgZoomNoText||1}x`;
  document.getElementById('prizeTextStrokeIn').value=tpl().prizeTextStroke||0;
  document.getElementById('prizeTextStrokeVal').textContent=tpl().prizeTextStroke||0;
  document.getElementById('cPrizeStroke').value=tpl().prizeTextStrokeColor||'#000000';

  const hlp=document.getElementById('headerLogoPrev');if(tpl().headerLogo){hlp.style.backgroundImage=`url(${tpl().headerLogo})`;hlp.textContent='';}else{hlp.style.backgroundImage='none';hlp.textContent='＋';}
  const lp=document.getElementById('logoPrev');if(tpl().logo){lp.style.backgroundImage=`url(${tpl().logo})`;lp.textContent='';}else{lp.style.backgroundImage='none';lp.textContent='＋';}
  const bp=document.getElementById('bgPrev');if(tpl().bgImage){bp.style.backgroundImage=`url(${tpl().bgImage})`;bp.textContent='';}else{bp.style.backgroundImage='none';bp.textContent='＋';}
  document.getElementById('introTitleIn').value=tpl().introTitle||'';
  document.getElementById('introBtnTextIn').value=tpl().introBtnText||'Toca para jugar';
  const ilp=document.getElementById('introLogoPrev');if(tpl().introLogo){ilp.style.backgroundImage=`url(${tpl().introLogo})`;ilp.textContent='';}else{ilp.style.backgroundImage='none';ilp.textContent='＋';}
  document.getElementById('introLogoSizeIn').value=tpl().introLogoSize||1;
  document.getElementById('introLogoSizeVal').textContent=`${tpl().introLogoSize||1}x`;
  const ibp=document.getElementById('introBgPrev');if(tpl().introBg){ibp.style.backgroundImage=`url(${tpl().introBg})`;ibp.textContent='';}else{ibp.style.backgroundImage='none';ibp.textContent='＋';}
  document.getElementById('adminCodeIn').value=config.adminCode||'1234';
  document.getElementById('idleIn').value=tpl().idleSeconds??45;
  document.getElementById('idleVal').textContent=(tpl().idleSeconds??45)===0?'Nunca':`${tpl().idleSeconds??45}s`;
  renderIntroMode();
  renderColorMode();
}
function renderColorMode(){const alt=tpl().colorMode==='alt';
  document.querySelectorAll('#segMode button').forEach(b=>b.classList.toggle('on',b.dataset.m===tpl().colorMode));
  document.getElementById('altColors').style.display=alt?'block':'none';
  document.getElementById('prizeList').classList.toggle('altmode',alt);}
function renderPrizeRows(){const el=document.getElementById('prizeList');el.innerHTML='';
  prizes().forEach((p,i)=>{const row=document.createElement('div');
    const sold=(typeof p.stock==='number'&&p.stock<=0);
    row.className='prow'+(sold?' sold':'');
    row.innerHTML=`<div class="prow-top">
        <div class="thumb" data-thumb="${i}" style="${p.image?`background-image:url(${p.image});border-style:solid`:''}">${p.image?`<span class="rm" data-rm="${i}">✕</span>`:'＋'}</div>
        <input class="name-in" type="text" value="${esc(p.label)}" placeholder="Nombre (opcional)" data-i="${i}" data-f="label">
        <input class="sw" type="color" value="${hex(p.color)}" data-i="${i}" data-f="color">
        <button class="del" data-del="${i}" aria-label="Eliminar">🗑</button>
      </div>
      <div class="prow-ctrl">
        <span class="lbl">Prob.</span>
        <input class="prob" type="range" min="1" max="100" step="1" value="${p.prob??50}" data-i="${i}" data-f="prob">
        <span class="pct" data-pct="${i}">–</span>
        <span class="lbl">Stock</span>
        <input class="stk" type="number" min="0" step="1" value="${p.stock==null?'':p.stock}" placeholder="∞" data-i="${i}" data-f="stock">
        ${sold?'<span class="stock-tag out">Agotado</span>':''}
      </div>`;el.appendChild(row);});
  updateProbPercents();}
function updateProbPercents(){
  const vis=prizes().filter(p=>!(typeof p.stock==='number'&&p.stock<=0));
  const sum=vis.reduce((s,p)=>s+Math.max(0,+p.prob||0),0);
  prizes().forEach((p,i)=>{const el=document.querySelector(`[data-pct="${i}"]`);if(!el)return;
    if(typeof p.stock==='number'&&p.stock<=0){el.textContent='0%';return;}
    const pc=sum>0?Math.round(Math.max(0,+p.prob||0)/sum*100):Math.round(100/(vis.length||1));
    el.textContent=pc+'%';});}
function renderConfig(){renderPills();renderTheme();renderPrizeRows();}

/* ---------- Exportar / Importar plantilla ---------- */
const exportTplBtn=document.getElementById('exportTplBtn');
if(exportTplBtn) exportTplBtn.onclick=()=>{
  const data=JSON.stringify(tpl(),null,2);
  const blob=new Blob([data],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=`plantilla-${(tpl().name||'ruleta').trim().replace(/[^a-z0-9-_]+/gi,'_').toLowerCase()||'ruleta'}.json`;
  document.body.appendChild(a);a.click();a.remove();
  URL.revokeObjectURL(url);
  toast('Plantilla exportada.');
};
const tplFp=document.getElementById('tplFilePick');
const importTplBtn=document.getElementById('importTplBtn');
if(importTplBtn) importTplBtn.onclick=()=>{
  if(!confirm('Esto reemplazará la plantilla activa (colores, textos, premios e imágenes) con la del archivo. ¿Continuar?'))return;
  if(tplFp){tplFp.value='';tplFp.click();}
};
if(tplFp) tplFp.onchange=()=>{
  const f=tplFp.files[0];if(!f)return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const data=JSON.parse(reader.result);
      if(!data||typeof data!=='object'||Array.isArray(data))throw new Error('formato inválido');
      const d=buildDefaults().templates[active]||buildDefaults().templates.a;
      config.templates[active]=normalizeTemplate(data,d);
      save();renderConfig();applyTheme();draw();updateHub();updatePlayTitle();
      toast('Plantilla importada correctamente.');
    }catch(e){
      toast('Archivo inválido. Debe ser una plantilla .json exportada desde esta app.');
    }
  };
  reader.readAsText(f);
};
function esc(s){return(s||'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));}
function hex(c){return(c&&c[0]==='#')?c:'#cccccc';}

function openConfig(){renderConfig();cfg.classList.add('show');cfg.setAttribute('aria-hidden','false');}
const configTabs=document.getElementById('configTabs');
if(configTabs) configTabs.addEventListener('click',e=>{
  const b=e.target.closest('.tab-pill');if(!b)return;
  configTabs.querySelectorAll('.tab-pill').forEach(p=>p.classList.toggle('active',p===b));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.toggle('active',p.dataset.panel===b.dataset.tab));
  const body=document.querySelector('.config-body');if(body)body.scrollTop=0;
  b.scrollIntoView({inline:'center',block:'nearest'});
});
pinModal=document.getElementById('pinModal');const pinInput=document.getElementById('pinInput'),pinErr=document.getElementById('pinErr');
function openPin(){pinInput.value='';pinErr.textContent='';pinModal.classList.add('show');setTimeout(()=>pinInput.focus(),120);}
function closePin(){pinModal.classList.remove('show');}
document.getElementById('gearBtn').onclick=()=>openPin();
document.getElementById('pinCancel').onclick=closePin;
document.getElementById('pinOk').onclick=()=>{if(pinInput.value===(config.adminCode||'1234')){closePin();openConfig();}else{pinErr.textContent='Código incorrecto';pinInput.value='';}};
pinInput.addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('pinOk').click();});
document.getElementById('doneBtn').onclick=()=>{save();cfg.classList.remove('show');cfg.setAttribute('aria-hidden','true');applyTheme();draw();updateHub();updatePlayTitle();resetIdle();};
document.getElementById('tplName').oninput=e=>{tpl().name=e.target.value;renderPills();};
document.getElementById('headerTextIn').oninput=e=>{tpl().headerText=e.target.value;updatePlayTitle();};
document.getElementById('headerSizeIn').oninput=e=>{const v=parseInt(e.target.value)||22; tpl().headerSize=v; document.getElementById('headerSizeVal').textContent=`${v}px`; applyTheme();};
document.getElementById('cHeaderColor').oninput=e=>{tpl().headerColor=e.target.value; applyTheme();};
document.getElementById('fontSel').onchange=e=>{tpl().font=e.target.value;applyTheme();draw();};
document.getElementById('cBg').oninput=e=>{tpl().theme.bg=e.target.value;applyTheme();};
document.getElementById('cAccent').oninput=e=>{tpl().theme.accent=e.target.value;applyTheme();draw();};
document.getElementById('cAccent2').oninput=e=>{tpl().theme.accent2=e.target.value;applyTheme();};
document.getElementById('cFrame').oninput=e=>{tpl().frame=e.target.value;applyFrame();draw();};
document.getElementById('altA').oninput=e=>{tpl().altColors[0]=e.target.value;draw();};
document.getElementById('altB').oninput=e=>{tpl().altColors[1]=e.target.value;draw();};
document.getElementById('segMode').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;tpl().colorMode=b.dataset.m;renderColorMode();draw();});

document.getElementById('btnTextIn').oninput=e=>{tpl().btnText=e.target.value; applyTheme();};
document.getElementById('btnBorderSizeIn').oninput=e=>{tpl().btnBorderSize=Math.max(0, parseInt(e.target.value)||0); applyTheme();};
document.getElementById('cBtnBg').oninput=e=>{tpl().btnBg=e.target.value; applyTheme();};
document.getElementById('cBtnColor').oninput=e=>{tpl().btnColor=e.target.value; applyTheme();};
document.getElementById('cBtnBorder').oninput=e=>{tpl().btnBorderColor=e.target.value; applyTheme();};
document.getElementById('btnTextSizeIn').oninput=e=>{tpl().btnTextSize=parseInt(e.target.value)||21; document.getElementById('btnTextSizeVal').textContent=`${tpl().btnTextSize}px`; applyTheme();};
document.getElementById('btnWidthIn').oninput=e=>{tpl().btnWidth=parseInt(e.target.value)||0; document.getElementById('btnWidthVal').textContent=tpl().btnWidth>0?`${tpl().btnWidth}px`:'Auto'; applyTheme();};
document.getElementById('btnHeightIn').oninput=e=>{tpl().btnHeight=parseInt(e.target.value)||0; document.getElementById('btnHeightVal').textContent=tpl().btnHeight>0?`${tpl().btnHeight}px`:'Auto'; applyTheme();};
document.getElementById('btnRadiusIn').oninput=e=>{tpl().btnRadius=parseInt(e.target.value)||999; document.getElementById('btnRadiusVal').textContent=`${tpl().btnRadius}px`; applyTheme();};
document.getElementById('btnShadowIn').oninput=e=>{tpl().btnShadow=parseInt(e.target.value)||14; document.getElementById('btnShadowVal').textContent=`${tpl().btnShadow}px`; applyTheme();};

document.getElementById('cDivColor').oninput=e=>{tpl().divColor=e.target.value; applyTheme(); draw();};
document.getElementById('divWidthIn').oninput=e=>{tpl().divWidth=parseInt(e.target.value)||0; document.getElementById('divWidthVal').textContent=`${tpl().divWidth}px`; applyTheme(); draw();};
document.getElementById('rimWidthIn').oninput=e=>{tpl().rimWidth=parseInt(e.target.value)||3; document.getElementById('rimWidthVal').textContent=`${tpl().rimWidth}px`; applyTheme(); draw();};

document.getElementById('cBulbColor').oninput=e=>{tpl().bulbColor=e.target.value; draw();};
document.getElementById('bulbIntensityIn').oninput=e=>{tpl().bulbIntensity=parseFloat(e.target.value)||0.4; document.getElementById('bulbIntensityVal').textContent=tpl().bulbIntensity; draw();};
document.getElementById('bulbSizeIn').oninput=e=>{tpl().bulbSize=parseFloat(e.target.value)||1; document.getElementById('bulbSizeVal').textContent=tpl().bulbSize; draw();};
document.getElementById('bulbCountIn').oninput=e=>{tpl().bulbCount=parseInt(e.target.value)||24; document.getElementById('bulbCountVal').textContent=tpl().bulbCount; draw();};
document.getElementById('bulbSpeedIn').oninput=e=>{tpl().bulbSpeed=parseInt(e.target.value)||85; document.getElementById('bulbSpeedVal').textContent=`${tpl().bulbSpeed}ms`; draw();};

document.getElementById('cPrizeText').oninput=e=>{tpl().prizeTextColor=e.target.value; draw();};
document.getElementById('prizeTextSizeIn').oninput=e=>{tpl().prizeTextSize=parseInt(e.target.value)||22; document.getElementById('prizeTextSizeVal').textContent=`${tpl().prizeTextSize}px`; draw();};
document.getElementById('imgZoomIn').oninput=e=>{tpl().imgZoom=parseFloat(e.target.value)||1; document.getElementById('imgZoomVal').textContent=`${tpl().imgZoom}x`; draw();};
document.getElementById('imgZoomNoTextIn').oninput=e=>{tpl().imgZoomNoText=parseFloat(e.target.value)||1; document.getElementById('imgZoomNoTextVal').textContent=`${tpl().imgZoomNoText}x`; draw();};
document.getElementById('prizeTextStrokeIn').oninput=e=>{tpl().prizeTextStroke=parseFloat(e.target.value)||0; document.getElementById('prizeTextStrokeVal').textContent=tpl().prizeTextStroke; draw();};
document.getElementById('cPrizeStroke').oninput=e=>{tpl().prizeTextStrokeColor=e.target.value; draw();};

const headerLogoUpload=document.getElementById('headerLogoUpload'),headerLogoRemove=document.getElementById('headerLogoRemove');
if(headerLogoUpload) headerLogoUpload.onclick=()=>{pickTarget={type:'headerLogo'};fp.value='';fp.click();};
if(headerLogoRemove) headerLogoRemove.onclick=()=>{tpl().headerLogo=null;renderTheme();updatePlayTitle();};
document.getElementById('logoUpload').onclick=()=>{pickTarget={type:'logo'};fp.value='';fp.click();};
document.getElementById('logoRemove').onclick=()=>{tpl().logo=null;renderTheme();updateHub();};
document.getElementById('bgUpload').onclick=()=>{pickTarget={type:'bg'};fp.value='';fp.click();};
document.getElementById('bgRemove').onclick=()=>{tpl().bgImage=null;renderTheme();applyBg();};
document.getElementById('introLogoUpload').onclick=()=>{pickTarget={type:'introLogo'};fp.value='';fp.click();};
document.getElementById('introLogoRemove').onclick=()=>{tpl().introLogo=null;renderTheme();};
document.getElementById('introLogoSizeIn').oninput=e=>{tpl().introLogoSize=parseFloat(e.target.value)||1; document.getElementById('introLogoSizeVal').textContent=`${tpl().introLogoSize}x`; applyTheme();};
document.getElementById('introBgUpload').onclick=()=>{pickTarget={type:'introBg'};fp.value='';fp.click();};
document.getElementById('introBgRemove').onclick=()=>{tpl().introBg=null;renderTheme();};
document.getElementById('introTitleIn').oninput=e=>{tpl().introTitle=e.target.value;};
document.getElementById('introBtnTextIn').oninput=e=>{tpl().introBtnText=e.target.value;};
document.getElementById('introMode').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;tpl().introEnabled=(b.dataset.i==='on');renderIntroMode();});
document.getElementById('adminCodeIn').oninput=e=>{config.adminCode=(e.target.value.trim()||'1234');};
document.getElementById('idleIn').oninput=e=>{const v=parseInt(e.target.value)||0;tpl().idleSeconds=v;document.getElementById('idleVal').textContent=(v===0?'Nunca':`${v}s`);};
const resetBtn=document.getElementById('resetStockBtn');
const RESET_LABEL='🔄 Reiniciar premios (reponer stock)';
let resetArm=false,resetT;
resetBtn.onclick=()=>{
  if(!resetArm){resetArm=true;resetBtn.textContent='¿Seguro? Toca otra vez para reponer';clearTimeout(resetT);
    resetT=setTimeout(()=>{resetArm=false;resetBtn.textContent=RESET_LABEL;},3000);return;}
  resetArm=false;clearTimeout(resetT);resetBtn.textContent=RESET_LABEL;
  prizes().forEach(p=>{if(p.stock0!==null&&p.stock0!==undefined)p.stock=p.stock0;});
  save();renderPrizeRows();draw();toast('Premios repuestos. Ruleta lista para usar de nuevo.');};
function resetTemplateDesign(){
  const d=buildDefaults().templates[active]||buildDefaults().templates.a,t=tpl();
  t.headerSize=d.headerSize; t.headerColor=d.headerColor; t.headerLogo=d.headerLogo;
  t.font=d.font; t.frame=d.frame; t.theme={...d.theme};
  t.btnBg=d.btnBg; t.btnColor=d.btnColor; t.btnBorderSize=d.btnBorderSize; t.btnBorderColor=d.btnBorderColor;
  t.btnTextSize=d.btnTextSize; t.btnWidth=d.btnWidth; t.btnHeight=d.btnHeight; t.btnRadius=d.btnRadius; t.btnShadow=d.btnShadow;
  t.divColor=d.divColor; t.divWidth=d.divWidth; t.rimWidth=d.rimWidth;
  t.bulbColor=d.bulbColor; t.bulbIntensity=d.bulbIntensity; t.bulbSize=d.bulbSize; t.bulbCount=d.bulbCount; t.bulbSpeed=d.bulbSpeed;
  t.prizeTextColor=d.prizeTextColor; t.prizeTextSize=d.prizeTextSize; t.prizeTextStroke=d.prizeTextStroke; t.prizeTextStrokeColor=d.prizeTextStrokeColor;
  t.imgZoom=d.imgZoom; t.imgZoomNoText=d.imgZoomNoText;
  t.logo=d.logo; t.bgImage=d.bgImage;
  t.colorMode=d.colorMode; t.altColors=[...d.altColors];
  t.introLogo=d.introLogo; t.introLogoSize=d.introLogoSize; t.introBg=d.introBg;
}
const resetDesignBtn=document.getElementById('resetDesignBtn');
const RESET_DESIGN_LABEL='🔄 Restaurar diseño de fábrica';
let resetDesignArm=false,resetDesignT;
if(resetDesignBtn) resetDesignBtn.onclick=()=>{
  if(!resetDesignArm){resetDesignArm=true;resetDesignBtn.textContent='¿Seguro? Toca otra vez para restaurar';clearTimeout(resetDesignT);
    resetDesignT=setTimeout(()=>{resetDesignArm=false;resetDesignBtn.textContent=RESET_DESIGN_LABEL;},3000);return;}
  resetDesignArm=false;clearTimeout(resetDesignT);resetDesignBtn.textContent=RESET_DESIGN_LABEL;
  resetTemplateDesign();
  save();renderConfig();applyTheme();draw();updateHub();updatePlayTitle();
  toast('Diseño restaurado a los valores de fábrica.');
};
function renderIntroMode(){document.querySelectorAll('#introMode button').forEach(b=>b.classList.toggle('on',(b.dataset.i==='on')===!!tpl().introEnabled));}
fp.onchange=()=>{const f=fp.files[0];if(!f)return;
  const cfgs={logo:[480,'image/png'],prize:[260,'image/png'],bg:[1920,'image/jpeg',0.95],introLogo:[600,'image/png'],introBg:[1920,'image/jpeg',0.95],headerLogo:[600,'image/png']}[pickTarget.type];
  downscale(f,cfgs[0],cfgs[1],cfgs[2]).then(url=>{
    if(pickTarget.type==='logo'){tpl().logo=url;renderTheme();updateHub();}
    else if(pickTarget.type==='headerLogo'){tpl().headerLogo=url;renderTheme();updatePlayTitle();}
    else if(pickTarget.type==='bg'){tpl().bgImage=url;renderTheme();applyBg();}
    else if(pickTarget.type==='introLogo'){tpl().introLogo=url;renderTheme();}
    else if(pickTarget.type==='introBg'){tpl().introBg=url;renderTheme();}
    else{prizes()[pickTarget.i].image=url;renderPrizeRows();draw();}});};

const plist=document.getElementById('prizeList');
plist.addEventListener('input',e=>{const i=+e.target.dataset.i,f=e.target.dataset.f;if(f==null||isNaN(i))return;
  const p=prizes()[i];
  if(f==='prob'){p.prob=Math.max(1,Math.min(100,+e.target.value||1));updateProbPercents();}
  else if(f==='stock'){const v=String(e.target.value).trim();p.stock=(v===''?null:Math.max(0,parseInt(v)||0));p.stock0=p.stock;updateProbPercents();draw();}
  else{p[f]=e.target.value;if(f==='color'||f==='label')draw();}});
plist.addEventListener('click',e=>{const rm=e.target.dataset.rm,del=e.target.closest('[data-del]'),th=e.target.closest('[data-thumb]');
  if(rm!=null){e.stopPropagation();prizes()[+rm].image=null;renderPrizeRows();draw();return;}
  if(del){prizes().splice(+del.dataset.del,1);renderPrizeRows();draw();return;}
  if(th){pickTarget={type:'prize',i:+th.dataset.thumb};fp.value='';fp.click();}});
document.getElementById('addPrize').onclick=()=>{const p=prizes();p.push({label:'',weight:1,prob:50,stock:null,stock0:null,color:PAL[active]?PAL[active][p.length%PAL[active].length]:'#cccccc',image:null});
  renderPrizeRows();draw();const b=document.querySelector('.config-body');b.scrollTop=b.scrollHeight;};
}catch(e){console.error('Error al inicializar el panel de configuración:',e);}

/* ---------- Ganador ---------- */
const backdrop=document.getElementById('backdrop'),winSheet=document.getElementById('winSheet');
function showWinner(p){document.getElementById('winnerText').textContent=(p.label||'').trim()||'¡Premio!';
  const wi=document.getElementById('winImg');if(p.image){wi.src=p.image;wi.style.display='block';}else wi.style.display='none';
  backdrop.classList.add('show');winSheet.classList.add('show');burst();}
function closeWin(){backdrop.classList.remove('show');winSheet.classList.remove('show');}
document.getElementById('winClose').onclick=closeWin;backdrop.onclick=closeWin;
const cc=document.getElementById('confetti'),cctx=cc.getContext('2d');let parts=[];
function sizeC(){cc.width=innerWidth;cc.height=innerHeight;}sizeC();addEventListener('resize',sizeC);
function burst(){const cols=[getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(),getComputedStyle(document.documentElement).getPropertyValue('--accent2').trim(),'#ffd000','#ffffff'];parts=[];
  for(let i=0;i<140;i++)parts.push({x:innerWidth/2,y:innerHeight*.35,vx:(Math.random()-.5)*11,vy:Math.random()*-13-4,g:.28+Math.random()*.12,s:5+Math.random()*7,c:cols[i%cols.length],rot:Math.random()*6,vr:(Math.random()-.5)*.4,life:1});requestAnimationFrame(anim);}
function anim(){cctx.clearRect(0,0,cc.width,cc.height);let alive=false;
  parts.forEach(p=>{p.vy+=p.g;p.x+=p.vx;p.y+=p.vy;p.rot+=p.vr;p.life-=.006;
    if(p.life>0&&p.y<cc.height+40){alive=true;cctx.save();cctx.globalAlpha=Math.max(0,p.life);cctx.translate(p.x,p.y);cctx.rotate(p.rot);cctx.fillStyle=p.c;cctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);cctx.restore();}});
  if(alive)requestAnimationFrame(anim);else cctx.clearRect(0,0,cc.width,cc.height);}
let toastT;function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),3400);}

/* ---------- Pantalla de inicio / espera ---------- */
const intro=document.getElementById('intro');
function sizeIntroLogo(img){
  const landscape=matchMedia('(orientation:landscape) and (max-height:640px)').matches;
  const mult=tpl().introLogoSize||1;
  const targetH=(landscape?Math.min(innerHeight*0.24,150):Math.min(innerWidth*0.46,220))*mult;
  const maxW=landscape?innerWidth*0.40:innerWidth*0.86;
  const maxH=landscape?innerHeight*0.80:innerHeight*0.60;
  const apply=()=>{
    const ratio=(img.naturalWidth&&img.naturalHeight)?img.naturalWidth/img.naturalHeight:1;
    let h=Math.min(targetH,maxH),w=h*ratio;
    if(w>maxW){w=maxW;h=w/ratio;}
    img.style.width=`${w}px`;img.style.height=`${h}px`;
  };
  if(img.complete&&img.naturalWidth) apply(); else img.onload=apply;
}
function showIntro(){
  if(cfg.classList.contains('show'))return;
  const t=tpl();
  if(t.introBg) intro.style.background=`center/cover no-repeat url(${t.introBg})`;
  else if(t.bgImage) intro.style.background=`center/cover no-repeat url(${t.bgImage})`;
  else intro.style.background='radial-gradient(120% 90% at 50% -10%, var(--bg2), var(--bg))';
  const lg=document.getElementById('introLogo'),logo=t.introLogo||t.logo;
  if(logo){lg.src=logo;lg.style.display='block';sizeIntroLogo(lg);}else lg.style.display='none';
  const it=document.getElementById('introTitle'),titleText=(t.introTitle||'').trim();
  it.textContent=titleText;it.style.display=titleText?'':'none';
  document.getElementById('introBtn').textContent=t.introBtnText||'Toca para jugar';
  intro.classList.add('show');
}
addEventListener('resize',()=>{if(intro.classList.contains('show')){const lg=document.getElementById('introLogo');if(lg.style.display==='block')sizeIntroLogo(lg);}});
function hideIntro(){intro.classList.remove('show');resetIdle();}
intro.addEventListener('click',hideIntro);

let idleT;
function resetIdle(){clearTimeout(idleT);const s=tpl().idleSeconds;if(s==null||s<=0)return;idleT=setTimeout(()=>{
  if(!cfg.classList.contains('show')&&!winSheet.classList.contains('show')&&!pinModal.classList.contains('show')) showIntro();
},s*1000);}
['pointerdown','keydown','touchstart'].forEach(ev=>document.addEventListener(ev,()=>{if(!intro.classList.contains('show'))resetIdle();},{passive:true}));

/* ---------- Init ---------- */
document.getElementById('spinBtn').onclick=spin;canvas.onclick=spin;
applyTheme();draw();updateHub();updatePlayTitle();
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>draw());
if(tpl().introEnabled) showIntro(); else resetIdle();