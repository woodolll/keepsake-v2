import './question-sample.js?v=demo3';
import {referencePage} from './reference-magazine.js?v=object-index-2';
import {EDITIONS,composeIdentity,fixtureProfile} from './identity.js';
import {renderSpread,renderCredits,attachImageErrors} from './editorial-renderer.js';
import {PHOTO_SPREAD} from './spread-layout.js';
const assets=await fetch('./assets/manifest.json').then(r=>r.json()).catch(()=>[]);
const names={book:'책 사진',vase:'화병 사진',knot:'크롬 조형물 사진'};
function objectPhoto(id){const a=assets.find(a=>a.id===id);return a?`<img class="photo-image" src="${a.src}" data-asset-id="${id}" alt="${id} 실사 사진">`:`<span class="missing-asset">필요한 이미지: ${names[id]||id}</span>`;}
document.querySelectorAll('[data-object]').forEach(el=>el.innerHTML=objectPhoto(el.dataset.object));
attachImageErrors(document);
const reader=document.querySelector('#reader'),question=document.querySelector('#question');
let current='collector',page=0,cover='corner',opener=null;
const labels={flower:['01 / FLOWER','한 송이의 감각'],key:['02 / OBJECT','열려 있는 가능성'],orange:['03 / SENSORY','낯선 온도'],book:['04 / COLLECTION','작은 세계들'],vase:['05 / STILL LIFE','머무르는 장면'],knot:['01 / FORM','고정되지 않은 형태']};
const pageTitles=['COVER','01 / IDENTITY','02–03 / OBJECTS','04 / EDITORIAL'];
function folio(e,n){return `<div class="folio"><span>KEEPSAKE — ${e.word.toUpperCase()}</span><span>${n} / ${e.number}</span></div>`;}
function render(){const e=EDITIONS[current];const content=document.querySelector('#reader-content');document.querySelector('#reader-title').textContent=e.number+' — '+e.name;
 let html='';
 if(page===0)html=`<div class="cover-wrap"><div class="cover-toggle" aria-label="커버 디자인"><button data-cover="corner" aria-pressed="${cover==='corner'}">B / CORNER</button><button data-cover="vertical" aria-pressed="${cover==='vertical'}">C / VERTICAL</button></div><article class="sheet cover ${cover==='vertical'?'vertical':''}" style="background:${e.visual.palette[0]};color:${e.visual.palette[1]}"><h2>${e.word}</h2><span>${e.number}</span></article></div>`;
 if(page===1)html=`<article class="sheet ${current}"><div class="running"><span>THE WHOLE YOU</span><span>IDENTITY / ${e.number}</span></div><h2 class="identity-title">${e.title.replaceAll('\n','<br>')}</h2><div class="identity-object">${objectPhoto(e.object)}</div><p class="intro-text">${e.intro}</p>${folio(e,'01')}</article>`;
 if(page===2)html=referencePage(current==='explorer'?1:0)+'<a class="reference-reader-link" href="spread.html">첨부 원본 매거진 두 가지 보기 ↗</a>';
 if(page===3)html=`<article class="sheet ${current}"><div class="running"><span>THE EDITOR'S NOTES</span><span>AN ILLUSTRATIVE STUDY</span></div><h2 class="editorial-title">${current==='explorer'?'READ<br>BETWEEN.':current==='observer'?'A quieter kind<br>of discovery.':'Things that<br>tell a story.'}</h2>${e.notes.map((n,i)=>`<section class="editorial-item"><span>0${i+1}</span><div><small>${n[0]}</small><h3>${n[1]}</h3><p>${n[2]}</p></div></section>`).join('')}<p class="prototype-note">디자인 검토용 큐레이터 노트입니다. 실제 문화 추천과 근거 기반 Why You는 분석 엔진 연결 후 제공됩니다.</p>${folio(e,'04')}</article>`;
 content.innerHTML=html;attachImageErrors(content);
 document.querySelectorAll('[data-page]').forEach(b=>{b.setAttribute('aria-selected',String(+b.dataset.page===page));b.tabIndex=+b.dataset.page===page?0:-1;});
 document.querySelector('#page-count').textContent=pageTitles[page]+' · '+(page+1)+' / 4';document.querySelector('#prev-page').disabled=page===0;document.querySelector('#next-page').disabled=page===3;
 const identity=composeIdentity(fixtureProfile(current));
 document.querySelector('#identity-details').innerHTML=[['편집 구조',identity.tokens.grid],['타이포그래피',identity.tokens.typeFamily],['이미지 처리',identity.tokens.imageTreatment],['여백 비율',Math.round(identity.tokens.whitespace*100)+'%'],['오브제 배율',identity.tokens.objectScale+'×'],['편집 리듬',identity.tokens.rhythm]].map(([k,v])=>`<div><strong>${k}</strong>${v}</div>`).join('')+`<p>가상 분석 fixture를 사용하는 편집 규칙 실험입니다. ${e.description}</p>`;
}
document.querySelectorAll('[data-edition]').forEach(b=>b.addEventListener('click',()=>{current=b.dataset.edition;page=2;cover='corner';opener=b;render();reader.showModal();}));
document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>{page=+b.dataset.page;render();}));
document.querySelector('.reader-tabs').addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();page=e.key==='Home'?0:e.key==='End'?3:(page+(e.key==='ArrowRight'?1:3))%4;render();document.querySelector(`[data-page="${page}"]`).focus();});
reader.addEventListener('click',e=>{const b=e.target.closest('[data-cover]');if(b){cover=b.dataset.cover;render();document.querySelector(`[data-cover="${cover}"]`).focus();}});
document.querySelector('#prev-page').addEventListener('click',()=>{if(page>0){page--;render();}});document.querySelector('#next-page').addEventListener('click',()=>{if(page<3){page++;render();}});
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.close).close()));
[reader,question].forEach(d=>{d.addEventListener('close',()=>opener?.focus());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});});
document.querySelectorAll('.edition-card .mini-mag').forEach((el,i)=>{el.className='reference-card';el.innerHTML=referencePage(i===1?1:0);});
