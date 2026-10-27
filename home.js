const canvas=document.querySelector('#world-canvas'),ctx=canvas.getContext('2d');
const categories=await fetch('./categories.json').then(r=>{if(!r.ok)throw Error('categories unavailable');return r.json();});
const colors=['#f2ff55','#ff59c7','#65ffc4','#67ddff','#b78aff','#ffb45e'];
const enabled={PORTRAIT:true,WORLD:true},kept=new Set();
try{JSON.parse(localStorage.getItem('keepsake-v2:kept-categories')||'[]').forEach(id=>{if(categories.some(c=>c.id===id))kept.add(id);});}catch{}
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let w=innerWidth,h=innerHeight,scroll=scrollY,stage=0,progress=0,scaled=false,hover=null,pinned=false,frame=0,last=0,dragging=null;
const rand=n=>{const v=Math.sin(n*137.531+3.27)*43758.5453;return v-Math.floor(v);};
const points=categories.flatMap((c,i)=>Array.from({length:10},(_,j)=>({c,i,j,x:w/2,y:h/2,size:2,alpha:1,r:rand(i*10+j),color:colors[(i<40?0:3)+(i%3)]})));
const steps=[...document.querySelectorAll('.story-step')];let tops=[];
function resize(){w=innerWidth;h=innerHeight;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);tops=steps.map(s=>s.offsetTop);}
resize();addEventListener('resize',resize);addEventListener('scroll',()=>scroll=scrollY,{passive:true});
function position(p,s){const left=p.i<40,side=left?-1:1,n=left?p.i:p.i-40,group=p.i%3,t=(n*10+p.j)/(left?400:300),mobile=w<700;
 if(s===0){const q=n/(left?40:30);return {x:w/2+side*16,y:h*.37+q*h*.92,size:Math.max(.6,5*(1-q)),alpha:p.j===0?1-q*.8:0};}
 if(s===1)return {x:w/2+side*w*.16+(p.r-.5)*w*.16,y:h*.48+rand(p.i*31+p.j)*h*.34,size:2.5,alpha:.9};
 if(s===2)return {x:w*(left?.28:.72)+Math.cos(t*43)*Math.sqrt(p.r)*w*.13,y:h*.56+(group-1)*h*.14+Math.sin(t*43)*h*.06,size:2.8,alpha:.85};
 if(s===3||s===4)return {x:w/2+side*(w*(mobile?.1:.12)+Math.pow(p.r,3)*w*.24),y:h*.16+t*h*.75,size:scaled?2+p.r*7:2,alpha:.85};
 if(s===5){const col=(n*10+p.j)%24,row=Math.floor((n*10+p.j)/24);return {x:w/2+side*(w*.08+col*(mobile?4:6)),y:h*.43+row*7,size:scaled?2+p.r*6:3,alpha:.9};}
 if(s===6){if(kept.has(p.c.id))return{x:w/2+(p.r-.5)*150,y:h*.46+rand(p.i+p.j)*140,size:3,alpha:.8};return{x:p.r*w,y:h*.83+rand(p.i*4+p.j)*h*.17,size:2.5,alpha:.8};}
 return {x:p.r*w,y:h*.85+rand(p.i+p.j)*h*.15,size:2,alpha:.25};
}
function updateStage(){let index=0;for(let i=1;i<tops.length;i++)if(scroll>=tops[i]-h*.2)index=i;stage=index;const length=(tops[index+1]??document.documentElement.scrollHeight)-tops[index];progress=Math.max(0,Math.min(1,(scroll-(tops[index]-h*.2))/length));document.querySelectorAll('.world-legend').forEach(l=>l.classList.toggle('active',stage>=2&&stage<7));document.querySelector('.world-progress').style.height=(scroll/Math.max(1,document.documentElement.scrollHeight-h)*100)+'%';}
// Cache the halo and star once per color instead of blurring 700 paths every frame.
const starSprites=new Map(colors.map(color=>{
 const sprite=document.createElement('canvas');sprite.width=sprite.height=128;
 const brush=sprite.getContext('2d'),halo=brush.createRadialGradient(64,64,6,64,64,60);
 halo.addColorStop(0,color+'66');halo.addColorStop(.4,color+'24');halo.addColorStop(1,color+'00');
 brush.fillStyle=halo;brush.fillRect(0,0,128,128);
 brush.fillStyle=color;brush.shadowColor=color;brush.shadowBlur=10;brush.beginPath();
 for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,r=k%2?10.32:24,x=64+Math.cos(a)*r,y=64+Math.sin(a)*r;if(k===0)brush.moveTo(x,y);else brush.lineTo(x,y);}
 brush.closePath();brush.fill();brush.shadowBlur=0;
 return [color,sprite];
}));
function drawStar(x,y,r){const extent=r*128/24;ctx.drawImage(starSprites.get(ctx.fillStyle),x-extent/2,y-extent/2,extent,extent);}
function draw(time){if(document.hidden){frame=requestAnimationFrame(draw);return;}const lerp=reduced?1:Math.min(.18,(time-last)/130||.1);last=time;updateStage();ctx.clearRect(0,0,w,h);
 if(stage===3||stage===4){ctx.strokeStyle='#51617f';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(w/2,h*.14);ctx.lineTo(w/2,h*.92);ctx.stroke();ctx.font='10px Arial';ctx.fillStyle='#aab8d4';['67 QUESTIONS','30 AXES','5 LAYERS'].forEach((x,i)=>{const y=h*(.18+i*.32);ctx.fillStyle='#101d35';ctx.beginPath();ctx.arc(w/2,y,3,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#aab8d4';ctx.fillText(x,w/2+10,y+3);});}
 if(stage===1||stage===2){ctx.font='bold 13px Arial';ctx.textAlign='center';ctx.fillStyle='#e4e6f4';ctx.fillText('PORTRAIT',w*.28,h*.39);ctx.fillText('WORLD',w*.72,h*.39);ctx.textAlign='start';}
 for(const p of points){const a=position(p,stage),b=position(p,Math.min(7,stage+1));const mix=stage<6?Math.max(0,(progress-.68)/.32):0;const tx=a.x+(b.x-a.x)*mix,ty=a.y+(b.y-a.y)*mix;p.x+=(tx-p.x)*lerp;p.y+=(ty-p.y)*lerp;p.size+=(a.size-p.size)*lerp;p.alpha+=((enabled[p.c.tier]?a.alpha:.035)-p.alpha)*lerp;ctx.globalAlpha=p.alpha;ctx.fillStyle=p.color;const size=hover?.c.id===p.c.id?p.size+2:p.size;drawStar(p.x,p.y,Math.max(1.8,size));}
 ctx.globalAlpha=1;frame=requestAnimationFrame(draw);
}
frame=requestAnimationFrame(draw);addEventListener('pagehide',()=>cancelAnimationFrame(frame));
const tip=document.querySelector('#particle-tip');
addEventListener('scroll',()=>{tip.hidden=true;hover=null;pinned=false;},{passive:true});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){tip.hidden=true;hover=null;pinned=false;}});
function showTip(p,x,y){hover=p;tip.hidden=false;tip.innerHTML=`<strong>${p.c.name}</strong>${p.c.tier} / CATEGORY ${String(p.c.id).padStart(2,'0')}<br>카테고리 탐색 · 실제 분석 결과 아님`;tip.style.left=Math.max(8,Math.min(w-245,x+16))+'px';tip.style.top=Math.max(75,Math.min(h-130,y+16))+'px';}
function nearest(x,y){let best=null,dist=16;for(const p of points){if(!enabled[p.c.tier])continue;const d=Math.hypot(x-p.x,y-p.y);if(d<dist){best=p;dist=d;}}return best;}
canvas.addEventListener('pointermove',e=>{if(pinned)return;const p=nearest(e.clientX,e.clientY);canvas.style.cursor=p?'pointer':'default';if(p)showTip(p,e.clientX,e.clientY);else{tip.hidden=true;hover=null;}});
canvas.addEventListener('pointerleave',()=>{if(!pinned){tip.hidden=true;hover=null;}});
canvas.addEventListener('click',e=>{const p=nearest(e.clientX,e.clientY);pinned=Boolean(p);if(p)showTip(p,e.clientX,e.clientY);else{tip.hidden=true;hover=null;}});
canvas.addEventListener('keydown',e=>{if(e.key==='Escape'){tip.hidden=true;hover=null;pinned=false;return;}if(!['ArrowRight','ArrowLeft','ArrowUp','ArrowDown','Home','End'].includes(e.key))return;e.preventDefault();const visible=points.filter(p=>p.j===0&&enabled[p.c.tier]);if(!visible.length)return;let i=visible.findIndex(p=>p.c.id===hover?.c.id);i=e.key==='Home'?0:e.key==='End'?visible.length-1:(i+(e.key==='ArrowLeft'||e.key==='ArrowUp'?-1:1)+visible.length)%visible.length;const p=visible[i];pinned=true;showTip(p,p.x,p.y);});
document.querySelectorAll('[data-tier]').forEach(el=>el.addEventListener('change',()=>{enabled[el.dataset.tier]=el.checked;tip.hidden=true;hover=null;pinned=false;}));
document.querySelector('#scale-dots').addEventListener('change',e=>scaled=e.target.checked);
document.querySelector('#reset-filters').addEventListener('click',()=>document.querySelectorAll('[data-tier]').forEach(el=>{el.checked=true;enabled[el.dataset.tier]=true;}));
const zone=document.querySelector('#keep-zone'),chips=document.querySelector('#category-chips'),index=document.querySelector('#category-index'),search=document.querySelector('#category-search');
function chip(c){return `<button class="category-chip" draggable="true" data-category="${c.id}" aria-pressed="${kept.has(c.id)}">${c.name}</button>`;}
function renderList(){const term=search.value.trim().toLocaleLowerCase();const list=categories.filter(c=>c.name.toLocaleLowerCase().includes(term));document.querySelector('#category-list').innerHTML=list.map(c=>`<button data-category="${c.id}" aria-pressed="${kept.has(c.id)}"><span>${String(c.id).padStart(2,'0')} / ${c.name}</span><small>${kept.has(c.id)?'✓ ':''}${c.tier}</small></button>`).join('');document.querySelector('#category-result').textContent=`${list.length} / 70개 카테고리 · 눌러서 간직하기`;}
function renderSelection(){chips.innerHTML=categories.map(chip).join('');document.querySelector('#kept-items').innerHTML=categories.filter(c=>kept.has(c.id)).map(chip).join('');document.querySelector('#keep-count').textContent=`${kept.size}개 선택`;renderList();requestAnimationFrame(resize);}
function save(){try{localStorage.setItem('keepsake-v2:kept-categories',JSON.stringify([...kept]));}catch{}renderSelection();}
function toggle(id){if(kept.has(id))kept.delete(id);else kept.add(id);save();}
document.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b&&!dragging){const id=+b.dataset.category;toggle(id);const replacement=e.target.closest('#category-index')?document.querySelector(`#category-list [data-category="${id}"]`):document.querySelector(`#category-chips [data-category="${id}"]`);replacement?.focus({preventScroll:true});}});
document.addEventListener('dragstart',e=>{const b=e.target.closest('[data-category]');if(b){dragging=+b.dataset.category;e.dataTransfer.setData('text/plain',String(dragging));e.dataTransfer.effectAllowed='copy';}});
zone.addEventListener('dragover',e=>{e.preventDefault();zone.classList.add('dragover');});zone.addEventListener('dragleave',()=>zone.classList.remove('dragover'));
zone.addEventListener('drop',e=>{e.preventDefault();const id=Number(e.dataTransfer.getData('text/plain'));if(categories.some(c=>c.id===id)){kept.add(id);save();}zone.classList.remove('dragover');dragging=null;});document.addEventListener('dragend',()=>{dragging=null;zone.classList.remove('dragover');});
document.querySelector('#clear-kept').addEventListener('click',()=>{kept.clear();save();});
document.querySelector('#index-open').addEventListener('click',()=>{renderList();index.showModal();search.focus();});document.querySelector('#index-close').addEventListener('click',()=>index.close());index.addEventListener('close',()=>document.querySelector('#index-open').focus());search.addEventListener('input',renderList);renderSelection();
