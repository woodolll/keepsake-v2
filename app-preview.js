// Use the actual desktop site's pages and interaction engines in the app shell.
// Keeping each page mounted preserves the star world's scroll/selection state.
const root=document.querySelector('#app-content');
const pages={home:'index.html',world:'preview.html#index',magazine:'spread.html',archive:'preview.html#keepsakes'};
const frames=new Map();
const names={home:'KEEPSAKE 별 모양 인터랙티브 홈',world:'KEEPSAKE 70개 조각',magazine:'KEEPSAKE 매거진',archive:'KEEPSAKE 마이 아카이브'};
function render(name){const tab=Object.hasOwn(pages,name)?name:'home';history.replaceState(null,'',`#${tab}`);document.querySelectorAll('[data-tab]').forEach(b=>{if(b.dataset.tab===tab)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
 if(!frames.has(tab)){const frame=document.createElement('iframe');frame.className='desktop-page-frame';frame.title=names[tab];frame.src=pages[tab];frame.addEventListener('load',()=>{try{const doc=frame.contentDocument;doc.documentElement.classList.add('inside-app-preview');const style=doc.createElement('style');style.textContent='.inside-app-preview a[href="app-preview.html"]{display:none!important}';doc.head.append(style)}catch{}});frames.set(tab,frame);root.append(frame)}
 for(const [key,frame]of frames)frame.hidden=key!==tab;
}
root.classList.add('desktop-site-content');document.body.classList.add('desktop-site-app');
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>render(b.dataset.tab));
document.querySelector('#profile').onclick=()=>render('archive');
render(location.hash.slice(1)||'home');
