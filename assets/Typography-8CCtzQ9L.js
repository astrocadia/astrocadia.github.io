import{e as y,a as s,_ as T}from"./ThemeProviderWrapper-Be5RUURM.js";import{r as B}from"./index-Dl6G-zuu.js";import{c as W,b as C,s as M,u as R,h as P,e as j,f as U}from"./styled-Dt2_JBRt.js";import{j as _}from"./jsx-runtime-4WDyTGeM.js";function N(a){return W("MuiTypography",a)}C("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);const E=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],L=a=>{const{align:t,gutterBottom:r,noWrap:n,paragraph:i,variant:o,classes:p}=a,e={root:["root",o,a.align!=="inherit"&&`align${y(t)}`,r&&"gutterBottom",n&&"noWrap",i&&"paragraph"]};return U(e,N,p)},$=M("span",{name:"MuiTypography",slot:"Root",overridesResolver:(a,t)=>{const{ownerState:r}=a;return[t.root,r.variant&&t[r.variant],r.align!=="inherit"&&t[`align${y(r.align)}`],r.noWrap&&t.noWrap,r.gutterBottom&&t.gutterBottom,r.paragraph&&t.paragraph]}})(({theme:a,ownerState:t})=>s({margin:0},t.variant==="inherit"&&{font:"inherit"},t.variant!=="inherit"&&a.typography[t.variant],t.align!=="inherit"&&{textAlign:t.align},t.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},t.gutterBottom&&{marginBottom:"0.35em"},t.paragraph&&{marginBottom:16})),u={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},z={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},A=a=>z[a]||a,k=B.forwardRef(function(t,r){const n=R({props:t,name:"MuiTypography"}),i=A(n.color),o=P(s({},n,{color:i})),{align:p="inherit",className:e,component:g,gutterBottom:d=!1,noWrap:f=!1,paragraph:l=!1,variant:h="body1",variantMapping:m=u}=o,x=T(o,E),c=s({},o,{align:p,color:i,className:e,component:g,gutterBottom:d,noWrap:f,paragraph:l,variant:h,variantMapping:m}),v=g||(l?"p":m[h]||u[h])||"span",b=L(c);return _.jsx($,s({as:v,ref:r,ownerState:c,className:j(b.root,e)},x))});export{k as T};
