export const referencePages=[
 {src:'assets/reference-spread.jpg',title:'OBJECT INDEX',format:'spread',alt:'첨부 원본 양면 매거진 — Object Index'},
 {src:'assets/reference-page.jpg',title:'EVERYDAY ARCHIVE',format:'single',alt:'첨부 원본 단면 매거진 — Everyday Archive'}
];
export function referencePage(index=0){const p=referencePages[index];return `<figure class="reference-magazine ${p.format}"><img src="${p.src}" alt="${p.alt}" width="${index?450:736}" height="${index?637:487}"></figure>`;}
