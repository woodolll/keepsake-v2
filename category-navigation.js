const existing=document.querySelector('#archive-open');
if(existing){
 existing.setAttribute('aria-controls','archive-menu');
 const menu=document.querySelector('#archive-menu');
 const toggle=document.createElement('button');toggle.className='category-menu-toggle';toggle.textContent='☰ 카테고리';toggle.setAttribute('aria-label','카테고리 메뉴 닫기');toggle.onclick=()=>menu.close();menu.prepend(toggle);
}else{
 const header=document.querySelector('.top,.reader-nav');
 if(header){
  const button=document.createElement('button');button.id='site-category-open';button.className='site-category-button';button.textContent='☰ 카테고리';button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','site-category-menu');button.setAttribute('aria-expanded','false');header.prepend(button);header.classList.add('persistent-site-header');
  new ResizeObserver(()=>document.documentElement.style.setProperty('--site-header-height',header.getBoundingClientRect().height+'px')).observe(header);
  const menu=document.createElement('dialog');menu.id='site-category-menu';menu.setAttribute('aria-label','카테고리 메뉴');
  menu.innerHTML='<div class="site-menu-heading"><button class="site-category-button" data-close>☰ 카테고리</button><button class="site-menu-close" data-close aria-label="카테고리 메뉴 닫기">×</button></div><p>YOUR PERSONAL ARCHIVE</p><nav aria-label="카테고리"><a href="index.html">The beginning <em>01</em></a><a href="preview.html#index">A little preview <em>02</em></a><a href="preview.html#keepsakes">The keepsakes <em>03</em></a><a href="spread.html">The magazine <em>04</em></a><a href="preview.html#packaging">The wrapping <em>05</em></a></nav>';
  document.body.append(menu);
  button.onclick=()=>{if(!menu.open)menu.showModal();button.setAttribute('aria-expanded','true')};
  menu.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>menu.close());
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.close()));
  menu.addEventListener('close',()=>{button.setAttribute('aria-expanded','false');button.focus()});
  menu.addEventListener('click',e=>{if(e.target!==menu)return;const r=menu.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)menu.close()});
  // Same-page menu links must select the corresponding preview panel as well.
  window.addEventListener('hashchange',()=>{const name=location.hash.slice(1);document.querySelector(`[data-tab="${CSS.escape(name)}"]`)?.click()});
 }
}
