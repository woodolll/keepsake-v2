export const designs=[
{name:'MODERN CASE',kr:'모던 케이스',file:'modern-v2.webp',description:'은빛 반투명 케이스. 단정한 표면 사이로 아카이브를 비추는 포장.'},
{name:'KRAFT ARCHIVE',kr:'크라프트 아카이브',file:'kraft-v4.webp',description:'크라프트 종이와 아이보리 끈, 작은 메모. 오래 간직한 소포 같은 포장.'},
{name:'CHRISTMAS EDITION',kr:'크리스마스 에디션',file:'christmas-v4.webp',description:'블랙·크림 다이아몬드 패턴에 붉은 벨벳 리본을 더한 겨울의 선물.'},
{name:'PRINCESS GIFT',kr:'프린세스 기프트',file:'princess-v3.webp',description:'핑크 무늬 종이와 풍성한 아이보리 리본, 작은 타원 라벨.'},
{name:'ART WRAP',kr:'아트 랩',file:'art-fox-v5.webp',description:'여우 일러스트와 붉은 실로 마무리한 오브제 중심의 아트 포장.'}
];
let selected=0,opener=null;
const modal=document.createElement('dialog');modal.id='packaging-demo';modal.setAttribute('aria-labelledby','packaging-title');modal.innerHTML=`<header><span>KEEPSAKE / THE WRAPPING</span><button id="pack-close" aria-label="패키징 닫기">×</button></header><div class="pack-layout"><div class="pack-stage photo-stage"><img id="pack-photo" alt=""></div><section class="pack-options"><p class="pack-eyebrow">FIVE WAYS TO KEEP A WORLD</p><h2 id="packaging-title">A gift,<br>made yours.</h2><div id="pack-tabs" role="group" aria-label="패키징 종류"></div><h3 id="pack-name"></h3><p id="pack-description"></p><p class="pack-disclaimer">참조 홈페이지에서 가져온 패키징 시안 이미지입니다. 이미지에 인쇄된 이름은 원본 라벨입니다. 실제 주문·제작·배송은 연결하지 않았습니다.</p><a href="preview.html#packaging">JUNE의 아카이브에서 보기 ↗</a></section></div>`;document.body.append(modal);
function render(){const d=designs[selected];const img=modal.querySelector('#pack-photo');img.src=`assets/${d.file}`;img.alt=d.kr+' 패키징 시안';modal.querySelector('#pack-tabs').innerHTML=designs.map((x,i)=>`<button data-pack="${i}" aria-pressed="${selected===i}"><span>0${i+1}</span>${x.kr}</button>`).join('');modal.querySelector('#pack-name').textContent=d.name;modal.querySelector('#pack-description').textContent=d.description;}
modal.addEventListener('click',e=>{const b=e.target.closest('[data-pack]');if(b){selected=+b.dataset.pack;render();}});
document.addEventListener('show-packaging',e=>{opener=document.activeElement;selected=e.detail?.index??0;render();if(!modal.open)modal.showModal();});modal.querySelector('#pack-close').addEventListener('click',()=>modal.close());modal.addEventListener('close',()=>opener?.focus());
