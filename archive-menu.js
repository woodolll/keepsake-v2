import './packaging-photo.js?v=sample1';
import {PRODUCT_CONFIG} from './identity.js';
const menu=document.querySelector('#archive-menu'),info=document.querySelector('#archive-info');
document.querySelector('#archive-open').addEventListener('click',()=>menu.showModal());
document.querySelector('#archive-close').addEventListener('click',()=>menu.close());
menu.addEventListener('close',()=>document.querySelector('#archive-open').focus());
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.close()));
document.querySelector('#menu-question').addEventListener('click',()=>{menu.close();document.querySelector('.world-nav [data-question]').click();});
document.querySelector('#index-open').addEventListener('click',()=>menu.close());
document.querySelector('#archive-info-close').addEventListener('click',()=>info.close());
for(const button of menu.querySelectorAll('[data-archive-info]'))button.addEventListener('click',()=>{
 const wrapping=button.dataset.archiveInfo==='wrapping';menu.close();if(!wrapping){location.href='preview.html#keepsakes';return;}if(wrapping){document.dispatchEvent(new Event('show-packaging'));return;}
 document.querySelector('#archive-info-title').textContent=wrapping?'The wrapping':'The keepsakes';
 document.querySelector('#archive-info-body').innerHTML=wrapping?`<p>소장하는 순간까지, 다섯 가지 방식으로.</p><ol>${PRODUCT_CONFIG.packaging.map(x=>`<li>${x.replaceAll('_',' ')}</li>`).join('')}</ol><small>명세에 정의된 패키징 5종입니다. 패키징 이미지와 제작 기능은 준비 중입니다.</small>`:'<p>당신의 이야기를 간직하는 작은 컬렉션.</p><ol><li>개인화 커버 2종</li><li>메인 매거진</li><li>포토카드 2장</li><li>콜라주</li></ol><small>현재는 매거진 시안을 볼 수 있습니다. 개인화 굿즈 생성 기능은 준비 중입니다.</small><a href="spread.html">매거진 미리보기 ↗</a>';
 info.showModal();
});
for(const dialog of [menu,info])dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
