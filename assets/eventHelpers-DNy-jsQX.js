const t=e=>e.type==="keydown"||e.type==="keyup"||e.type==="keypress",a=(e,r)=>{if(r)return n=>{t(n)?t(n)&&e.includes(n.key)&&r(n):r(n)}},d=e=>a(["Enter"," ","Spacebar"],e),s=e=>a(["Enter"],e);export{d as a,s as b};
