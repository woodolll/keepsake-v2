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
// Second spread: Pippi's mismatched socks dominate the right page;
// supporting fragments form an irregular collage at fourteen distinct scales.
const collageTwo=[
 {i:[-2,-3,24,36,-19],c:[3,34,12],align:'left'},
 {i:[22,1,18,18,12],c:[31,19,13],align:'left'},
 {i:[16,32,32,32,-11],c:[29,64,18],align:'center'},
 {i:[1,49,13,22,18],c:[3,72,12],align:'left'},
 {i:[29,78,19,14,-17],c:[32,88,15],align:'left'},
 {i:[-1,79,22,15,9],c:[4,89,17],align:'left'},
 {i:[15,12,16,20,-23],c:[17,33,12],align:'left'},
 {i:[50,-1,17,24,-14],c:[51,24,14],align:'left'},
 {i:[60,-5,43,65,14],c:[72,62,18],align:'center'},
 {i:[49,39,15,23,-22],c:[51,63,12],align:'left'},
 {i:[67,73,23,16,17],c:[70,89,15],align:'left'},
 {i:[49,79,20,12,-9],c:[51,90,17],align:'left'},
 {i:[86,73,14,13,-16],c:[87,87,11],align:'left'},
 {i:[91,35,9,24,21],c:[91,60,8],align:'left'}
];
// Third spread: a large keepsake drawer and repaired ceramic cup are the
// two anchors. Every supporting object has its own scale and caption space.
const collageThree=[
 {i:[-3,-4,23,39,-17],c:[3,34,11],align:'left'},
 {i:[22,-3,27,23,11],c:[33,20,13],align:'left'},
 {i:[15,33,28,31,-14],c:[28,63,18],align:'center'},
 {i:[1,48,12,20,15],c:[3,69,11],align:'left'},
 {i:[26,76,21,16,-19],c:[31,89,16],align:'left'},
 {i:[-1,78,24,15,8],c:[4,89,18],align:'left'},
 {i:[11,13,19,19,-8],c:[16,31,13],align:'left'},
 {i:[50,0,20,22,-16],c:[52,23,16],align:'center'},
 {i:[68,-3,36,44,10],c:[82,40,15],align:'left'},
 {i:[79,48,20,17,-21],c:[86,65,11],align:'left'},
 {i:[48,37,34,40,-9],c:[52,77,22],align:'center'},
 {i:[51,85,15,10,14],c:[66,87,10],align:'left'},
 {i:[74,57,16,27,12],c:[76,85,10],align:'left'},
 {i:[87,75,13,12,-12],c:[88,88,10],align:'left'}
];
// The fourth spread is a composed collage: two oversized anchors, with
// smaller objects tucked around them. Captions retain clear white space.
const collageFour=[
 {i:[-3,-4,21,40,-16],c:[3,34,11],align:'left'},
 {i:[15,-1,14,23,13],c:[16,21,10],align:'left'},
 {i:[29,-5,24,29,-17],c:[41,13,8],align:'left'},
 {i:[-2,48,20,28,-14],c:[4,76,12],align:'left'},
 {i:[8,16,46,52,-9],c:[31,65,17],align:'center'},
 {i:[12,71,22,24,8],c:[32,79,12],align:'left'},
 {i:[39,73,14,21,-18],c:[42,89,12],align:'left'},
 {i:[51,-7,25,29,13],c:[54,20,17],align:'center'},
 {i:[70,-10,36,54,8],c:[86,47,11],align:'left'},
 {i:[49,33,23,28,-18],c:[51,62,12],align:'left'},
 {i:[70,32,19,31,-12],c:[77,66,13],align:'left'},
 {i:[50,73,21,20,7],c:[54,89,16],align:'left'},
 {i:[68,58,17,29,-20],c:[72,88,11],align:'left'},
 {i:[85,70,20,22,19],c:[84,89,13],align:'left'}
];
// An oversized pair of red high-tops anchors the final spread.
const collageFive=slots.map(slot=>({...slot,i:[...slot.i],c:[...slot.c]}));
collageFive[0]={i:[-4,-4,24,36,-20],c:[3,34,11],align:'left'};
collageFive[1]={i:[17,0,15,22,16],c:[19,20,11],align:'left'};
collageFive[2]={i:[29,-5,25,29,-19],c:[43,18,9],align:'left'};
collageFive[3]={i:[-3,51,18,25,-14],c:[3,76,12],align:'left'};
collageFive[4]={i:[6,17,53,57,-12],c:[28,74,22],align:'center'};
collageFive[5]={i:[1,78,22,17,-16],c:[18,86,12],align:'left'};
collageFive[6]={i:[35,82,18,14,17],c:[37,89,12],align:'left'};
const mount=document.querySelector('#spread-mount'),viewport=document.querySelector('#spread-viewport');
let selected=Math.max(0,Math.min(4,Number(location.hash.slice(1))-1||0));
const chapters=document.querySelector('#chapters');
titles.forEach((title,index)=>{const b=document.createElement('button');b.textContent=`0${index+1} / ${String(index*14+1).padStart(2,'0')}–${(index+1)*14}`;b.title=title;b.onclick=()=>render(index);chapters.append(b)});
function render(index=selected){selected=index;history.replaceState(null,'',`#${index+1}`);mount.replaceChildren();const page=document.createElement('article');page.className='magazine-spread'+(index===1?' collage-two':index===2?' collage-three':index===3?' collage-four':index===4?' collage-five':'');page.setAttribute('aria-label',`${titles[index]} / ${index*14+1}–${(index+1)*14}`);
 const running=document.createElement('div');running.className='running';running.innerHTML='<span>KEEPSAKE / THE PERSONAL EDIT</span><span>JUNE — WORLD EDITION</span>';page.append(running);
 fragments.slice(index*14,index*14+14).forEach((f,n)=>{const slot=(index===1?collageTwo:index===2?collageThree:index===3?collageFour:index===4?collageFive:slots)[n];const figure=document.createElement('figure');figure.className='editorial-object';const [x,y,w,h,r]=slot.i;figure.style.cssText=`left:${x}%;top:${y}%;width:${w}%;height:${h}%;--rotation:${r}deg`;const img=document.createElement('img');img.src=`assets/fragments/${String(f.id).padStart(2,'0')}.webp`;img.alt=f.value;img.decoding='async';figure.append(img);page.append(figure);
 const caption=document.createElement('button');caption.className=`editorial-caption ${slot.align}`;caption.style.cssText=`left:${slot.c[0]}%;top:${slot.c[1]}%;width:${slot.c[2]}%`;caption.setAttribute('aria-label',`${f.id}. ${f.value} 자세히 보기`);const number=document.createElement('b');number.textContent=`#${String(f.id).padStart(2,'0')} `;const title=document.createElement('strong');title.textContent=f.value;const body=document.createElement('span');body.textContent=f.reason;const category=document.createElement('small');category.textContent=`${categories[f.id-1].name} / JUNE`;caption.append(number,title,body,category);caption.onclick=()=>showDetail(f);page.append(caption);
 });const folio=document.createElement('div');folio.className='folio';const left=document.createElement('span');left.textContent=`${String(index*2+2).padStart(3,'0')}  KEEPSAKE / ${titles[index]}`;const right=document.createElement('span');right.textContent=`THE WORLD OF JUNE  ${String(index*2+3).padStart(3,'0')}`;folio.append(left,right);page.append(folio);mount.append(page);[...chapters.children].forEach((b,i)=>b.setAttribute('aria-pressed',String(i===selected)));document.querySelector('#progress').textContent=`${index+1} / 5`;document.querySelector('#previous').disabled=index===0;document.querySelector('#next').disabled=index===4;
}
function showDetail(f){document.querySelector('#detail-image').src=`assets/fragments/${String(f.id).padStart(2,'0')}.webp`;document.querySelector('#detail-image').alt=f.value;document.querySelector('#detail-category').textContent=`#${String(f.id).padStart(2,'0')} / ${categories[f.id-1].name}`;document.querySelector('#detail-title').textContent=f.value;document.querySelector('#detail-reason').textContent=f.reason;document.querySelector('#fragment-detail').showModal()}
document.querySelector('#close-detail').onclick=()=>document.querySelector('#fragment-detail').close();
document.querySelector('#previous').onclick=()=>render(selected-1);document.querySelector('#next').onclick=()=>render(selected+1);
document.querySelector('#zoom').onclick=e=>{const zoom=viewport.classList.toggle('zoomed');e.currentTarget.setAttribute('aria-pressed',String(zoom));e.currentTarget.textContent=zoom?'화면에 맞춤 −':'크게 보기 ＋'};
document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||/INPUT|TEXTAREA/.test(e.target.tagName))return;if(e.key==='ArrowRight'&&selected<4)render(selected+1);if(e.key==='ArrowLeft'&&selected>0)render(selected-1)});
document.querySelector('#print').onclick=()=>{const current=selected;mount.replaceChildren();const pages=[];for(let i=0;i<5;i++){render(i);pages.push(mount.firstElementChild)}mount.replaceChildren(...pages);Promise.all([...mount.querySelectorAll('img')].map(img=>img.decode().catch(()=>{}))).then(()=>{window.print();render(current)})};render();
