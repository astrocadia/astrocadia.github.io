import{i as o}from"./lang-BqISUGWn.js";const l=(r,e)=>r.localeCompare(e,void 0,{numeric:!0,sensitivity:"base"}),p=(r,e)=>r.localeCompare(e,void 0,{numeric:!0,sensitivity:"base",caseFirst:"lower"}),C=(r,e=!1)=>(t,s)=>e?p(t[r],s[r]):l(t[r],s[r]),O=(r,e,t=!1)=>(s,a)=>{const i=s[r],c=s[e]||"",n=a[r],m=a[e]||"";if(!o(i)&&!o(n)){const u=i-n;if(u!==0)return u}else if(o(i)){if(!o(n))return 1}else return-1;return t?p(c,m):l(c,m)};export{O as a,l as b,C as c,p as s};
