export const referencePages=[
 {src:'assets/reference-spread.png',title:'THINGS THAT STAY',format:'spread',alt:'첨부 원본 양면 매거진 — Things That Stay'},
 {src:'assets/reference-page.png',title:'MY LITTLE THINGS',format:'single',alt:'첨부 원본 단면 매거진 — My Little Things'}
];
export function referencePage(index=0){const p=referencePages[index];return `<figure class="reference-magazine ${p.format}"><img src="${p.src}" alt="${p.alt}" width="${index?557:1536}" height="${index?745:1024}"></figure>`;}
