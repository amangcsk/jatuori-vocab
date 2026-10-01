const fs=require('fs');
let bad=0, total=0;
const out={};
for(const lv of ['middle','high','toefl']){
  const files=fs.readdirSync('data').filter(f=>f.startsWith(lv+'_')).sort();
  let lines=[];
  for(const f of files) lines.push(...fs.readFileSync('data/'+f,'utf8').split('\n').filter(l=>l.trim()));
  out[lv]=lines;
  lines.forEach((l,i)=>{
    const p=l.split('|'); total++;
    const err=(m)=>{bad++;console.log(lv,i+1,p[1],m)};
    if(p.length!==8) return err('fields '+p.length);
    const [t,w,ipa,mean,e1,k1,e2,k2]=p;
    if(!/^[123]$/.test(t)) err('tier');
    if(!/^\/.+\/$/.test(ipa)) err('ipa '+ipa);
    const ms=mean.split(';'); if(ms.length<1||ms.length>3) err('meanings '+ms.length);
    ms.forEach(m=>{ if(!/^(명|동|형|부|전|접|대|감) .+/.test(m)) err('meaning fmt '+m); });
    [e1,e2].forEach(e=>{
      const m=e.match(/\*([^*]+)\*/); if(!m) return err('no star');
      // 표제어(앞 4글자 또는 전체) 포함 여부
      const stem=w.toLowerCase().replace(/[^a-z]/g,'').slice(0,Math.min(4,w.length));
      if(!m[1].toLowerCase().includes(stem) && !m[1].toLowerCase().startsWith(stem.slice(0,3))) err('headword? '+m[1]);
    });
    if(!k1||!k2) err('ko');
    if(l.includes('`')||l.includes('$')||l.includes('\\')) err('badchar');
  });
}
console.log('total',total,'problems',bad);
