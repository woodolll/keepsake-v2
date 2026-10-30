import {person,fragments} from './sample-person.js';
import {designs} from './packaging-photo.js?v=sample1';
const categories=await fetch('categories.json').then(r=>r.json());
document.querySelector('#bio').textContent=person.description;
let tier='all';
function render(){const term=document.querySelector('#search').value.trim().toLocaleLowerCase();const list=fragments.filter(f=>(tier==='all'||(tier==='portrait'?f.id<=40:f.id>40))&&[categories[f.id-1].name,f.value,f.reason].join(' ').toLocaleLowerCase().includes(term));document.querySelector('#count').textContent=`${list.length} / 70 조각`;const target=document.querySelector('#fragments');target.replaceChildren();for(const f of list){const card=document.createElement('article');card.className='fragment';const n=document.createElement('small');n.textContent=`${String(f.id).padStart(2,'0')} / ${categories[f.id-1].name}`;const title=document.createElement('h3');title.textContent=f.value;const p=document.createElement('p');p.textContent=f.reason;const img=document.createElement('img');img.className='fragment-image';img.src='assets/fragments/'+String(f.id).padStart(2,'0')+'.webp';img.alt=f.value+' — 오리지널 상징 오브제';img.loading='lazy';img.decoding='async';card.append(n,img,title,p);target.append(card);}}
document.querySelector('#search').addEventListener('input',render);
document.querySelectorAll('[data-tier]').forEach(b=>b.addEventListener('click',()=>{tier=b.dataset.tier;document.querySelectorAll('[data-tier]').forEach(x=>x.setAttribute('aria-pressed',x===b));render();}));
function tab(name){if(!['index','keepsakes','editions','packaging'].includes(name))name='index';document.querySelectorAll('.panel').forEach(p=>p.hidden=p.id!==name);document.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.tab===name));}
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{tab(b.dataset.tab);history.replaceState(null,'',`#${b.dataset.tab}`);}));
document.querySelector('#pack-gallery').innerHTML=designs.map((d,i)=>`<button data-pack-preview="${i}"><img src="assets/${d.file}" alt="${d.kr}" loading="lazy"><small>0${i+1} / ${d.name}</small><span>${d.kr}</span></button>`).join('');
document.querySelectorAll('[data-pack-preview]').forEach(b=>b.addEventListener('click',()=>document.dispatchEvent(new CustomEvent('show-packaging',{detail:{index:+b.dataset.packPreview}}))));
document.querySelector('#open-pack').addEventListener('click',()=>document.dispatchEvent(new Event('show-packaging')));tab(location.hash.slice(1));render();
