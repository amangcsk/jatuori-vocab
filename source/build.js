const fs=require('fs');
const dest=process.argv[2]||'..';
for(const lv of ['middle','high','toefl']){
  const files=fs.readdirSync('data').filter(f=>f.startsWith(lv+'_')).sort();
  let lines=[];
  for(const f of files) lines.push(...fs.readFileSync('data/'+f,'utf8').split('\n').filter(l=>l.trim()));
  // 난이도 3등분: (직접 매긴 난이도, 단어 길이, 단어) 순으로 정렬해 앞 1/3=1, 중간=2, 뒤=3
  const rows=lines.map((l,i)=>{const p=l.split('|');return {i,p,key:[+p[0],p[1].length,p[1]]};});
  const sorted=[...rows].sort((a,b)=>a.key[0]-b.key[0]||a.key[1]-b.key[1]||(a.key[2]<b.key[2]?-1:1));
  const n=sorted.length;
  sorted.forEach((r,rank)=>{r.p[0]=String(rank<n/3?1:rank<2*n/3?2:3);});
  const text=rows.map(r=>r.p.join('|')).join('\n');
  const js='window.WORDDATA=window.WORDDATA||{};WORDDATA.'+lv+'=`'+text+'`;\n';
  fs.writeFileSync(dest+'/words-'+lv+'.js',js);
  const c={1:0,2:0,3:0};rows.forEach(r=>c[r.p[0]]++);
  console.log(lv,n,JSON.stringify(c),(js.length/1024).toFixed(0)+'KB chars');
}
