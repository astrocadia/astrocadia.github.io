import{_ as s,a as n}from"./ThemeProviderWrapper-Be5RUURM.js";import{r as v,m as b,a as j}from"./mergeSlotProps-D2P12luN.js";import{u as k}from"./useForkRef-BDoLG09A.js";const E=["className","elementType","ownerState","externalForwardedProps","getSlotOwnerState","internalForwardedProps"],L=["component","slots","slotProps"],N=["component"];function z(o,e){const{className:x,elementType:_,ownerState:p,externalForwardedProps:l,getSlotOwnerState:d,internalForwardedProps:a}=e,F=s(e,E),{component:c,slots:t={[o]:void 0},slotProps:O={[o]:void 0}}=l,g=s(l,L),i=t[o]||_,r=v(O[o],p),P=b(n({className:x},F,{externalForwardedProps:o==="root"?g:void 0,externalSlotProps:r})),{props:{component:f},internalRef:y}=P,m=s(P.props,N),C=k(y,r==null?void 0:r.ref,e.ref),u=d?d(m):{},T=n({},p,u),S=o==="root"?f||c:f,w=j(i,n({},o==="root"&&!c&&!t[o]&&a,o!=="root"&&!t[o]&&a,m,S&&{as:S},{ref:C}),T);return Object.keys(u).forEach(h=>{delete w[h]}),[i,w]}export{z as u};
