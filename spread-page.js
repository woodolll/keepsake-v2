import {referencePage} from './reference-magazine.js?v=object-index-2';
import {renderCredits} from './editorial-renderer.js';
fetch('./assets/manifest.json').then(r=>r.json()).then(assets=>{const d=document.createElement('details');d.id='credits';d.className='photo-credits';d.innerHTML='<summary>랜딩 페이지 사진 출처 및 라이선스</summary>'+renderCredits(assets);document.querySelector('main').append(d);}).catch(()=>{});
let selected=location.hash==='#single'?1:0;const mount=document.querySelector('#spread-mount');
function render(){mount.innerHTML=referencePage(selected);document.querySelectorAll('[data-reference]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.reference===selected)));}
document.querySelectorAll('[data-reference]').forEach(b=>b.addEventListener('click',()=>{selected=+b.dataset.reference;render();}));
document.querySelector('#zoom').addEventListener('click',e=>{const on=document.querySelector('#spread-viewport').classList.toggle('reference-zoom');e.currentTarget.setAttribute('aria-pressed',String(on));e.currentTarget.textContent=on?'화면에 맞춤 −':'크게 보기 ＋';});render();
