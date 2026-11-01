import {fragments} from './sample-person.js';
const categories=await fetch('categories.json').then(r=>{if(!r.ok)throw Error('Category data unavailable');return r.json()});
const titles=['A sense of somewhere.','The things that move me.','Small, everyday pleasures.','A world of my own.','The long way home.'];
// Image and caption rectangles follow the supplied two-page editorial reference.
// x, y, width, height, rotation; all coordinates are percentages of the spread.
const slots=[
 {i:[0,0,19,36,-12],c:[5,36,11],align:'left'},
 {i:[18,3,11,25,4],c:[18,28,10],align:'left'},
 {i:[26,0,22,25,-9],c:[38,12,9],align:'left'},
 {i:[2,48,14,28,-6],c:[16,57,10],align:'left'},
 {i:[15,27,33,35,0],c:[27,61,18],align:'center'},
 {i:[0,72,22,24,-13],c:[21,77,10],align:'left'},
 {i:[29,73,18,19,7],c:[34,91,12],align:'left'},
 {i:[51,0,25,25,-9],c:[54,25,20],align:'center'},
 {i:[77,0,23,44,0],c:[87,44,10],align:'left'},
 {i:[51,33,15,23,-10],c:[53,56,10],align:'left'},
 {i:[71,35,15,28,4],c:[76,63,10],align:'left'},
 {i:[52,67,17,24,-8],c:[52,90,16],align:'left'},
 {i:[64,62,18,31,-19],c:[68,45,9],align:'center'},
 {i:[86,61,14,29,12],c:[86,90,11],align:'left'}
];
const mount=document.querySelector('#spread-mount'),viewport=document.querySelector('#spread-viewport');
let selected=Math.max(0,Math.min(4,Number(location.hash.slice(1))-1||0));
const chapters=document.querySelector('#chapters');
titles.forEach((title,index)=>{const b=document.createElement('button');b.textContent=`0${index+1} / ${String(index*14+1).padStart(2,'0')}–${(index+1)*14}`;b.title=title;b.onclick=()=>render(index);chapters.append(b)});
function render(index=selected){selected=index;history.replaceState(null,'',`#${index+1}`);mount.replaceChildren();const page=document.createElement('article');page.className='magazine-spread';page.setAttribute('aria-label',`${titles[index]} / ${index*14+1}–${(index+1)*14}`);
 const running=document.createElement('div');running.className='running';running.innerHTML='<span>KEEPSAKE / THE PERSONAL EDIT</span><span>JUNE — WORLD EDITION</span>';page.append(running);
 fragments.slice(index*14,index*14+14).forEach((f,n)=>{const slot=slots[n];const figure=document.createElement('figure');figure.className='editorial-object';const [x,y,w,h,r]=slot.i;figure.style.cssText=`left:${x}%;top:${y}%;width:${w}%;height:${h}%;--rotation:${r}deg`;const img=document.createElement('img');img.src=`assets/fragments/${String(f.id).padStart(2,'0')}.webp`;img.alt=f.value;img.decoding='async';figure.append(img);page.append(figure);
 const caption=document.createElement('button');caption.className=`editorial-caption ${slot.align}`;caption.style.cssText=`left:${slot.c[0]}%;top:${slot.c[1]}%;width:${slot.c[2]}%`;caption.setAttribute('aria-label',`${f.id}. ${f.value} 자세히 보기`);const number=document.createElement('b');number.textContent=`#${String(f.id).padStart(2,'0')} `;const title=document.createElement('strong');title.textContent=f.value;const body=document.createElement('span');body.textContent=f.reason;const category=document.createElement('small');category.textContent=`${categories[f.id-1].name} / JUNE`;caption.append(number,title,body,category);caption.onclick=()=>showDetail(f);page.append(caption);
 });const folio=document.createElement('div');folio.className='folio';const left=document.createElement('span');left.textContent=`${String(index*2+2).padStart(3,'0')}  KEEPSAKE / ${titles[index]}`;const right=document.createElement('span');right.textContent=`THE WORLD OF JUNE  ${String(index*2+3).padStart(3,'0')}`;folio.append(left,right);page.append(folio);mount.append(page);[...chapters.children].forEach((b,i)=>b.setAttribute('aria-pressed',String(i===selected)));document.querySelector('#progress').textContent=`${index+1} / 5`;document.querySelector('#previous').disabled=index===0;document.querySelector('#next').disabled=index===4;
}
function showDetail(f){document.querySelector('#detail-image').src=`assets/fragments/${String(f.id).padStart(2,'0')}.webp`;document.querySelector('#detail-image').alt=f.value;document.querySelector('#detail-category').textContent=`#${String(f.id).padStart(2,'0')} / ${categories[f.id-1].name}`;document.querySelector('#detail-title').textContent=f.value;document.querySelector('#detail-reason').textContent=f.reason;document.querySelector('#fragment-detail').showModal()}
document.querySelector('#close-detail').onclick=()=>document.querySelector('#fragment-detail').close();
document.querySelector('#previous').onclick=()=>render(selected-1);document.querySelector('#next').onclick=()=>render(selected+1);
document.querySelector('#zoom').onclick=e=>{const zoom=viewport.classList.toggle('zoomed');e.currentTarget.setAttribute('aria-pressed',String(zoom));e.currentTarget.textContent=zoom?'화면에 맞춤 −':'크게 보기 ＋'};
document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||/INPUT|TEXTAREA/.test(e.target.tagName))return;if(e.key==='ArrowRight'&&selected<4)render(selected+1);if(e.key==='ArrowLeft'&&selected>0)render(selected-1)});
document.querySelector('#print').onclick=()=>{const current=selected;mount.replaceChildren();const pages=[];for(let i=0;i<5;i++){render(i);pages.push(mount.firstElementChild)}mount.replaceChildren(...pages);Promise.all([...mount.querySelectorAll('img')].map(img=>img.decode().catch(()=>{}))).then(()=>{window.print();render(current)})};render();
