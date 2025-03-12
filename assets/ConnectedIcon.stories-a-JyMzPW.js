import{j as e}from"./jsx-runtime-4WDyTGeM.js";import{T as c}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{C as p,a as o}from"./ConnectedIcon-BwtbO1pB.js";import"./index-Dl6G-zuu.js";import"./index-eOQoo3sK.js";import"./Badge-B5h4WNES.js";import"./CountBadge-3ANCZLmo.js";import"./WarningIconBadge-DYC2RgsF.js";import"./WarningIcon-hyuTG_uV.js";import"./SvgIcon-DKK2_66P.js";import"./SvgIcon-d6V0mnb4.js";import"./styled-DaAyEikA.js";import"./EditIcon-DQffeilE.js";import"./LinkIcon-CTu8-jnD.js";const m={[o.CONNECTED]:"Connected",[o.DISCONNECTED]:"Disconnected",[o.NEVER_CONNECTED]:"Never Connected"},I={title:"Design System/Composite Components/ConnectedIcon",tags:["autodocs"],component:p},d=({children:r,title:i})=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",color:"var(--typography-secondary-color)",alignItems:"center",gap:4},children:[e.jsx("div",{style:{alignItems:"center",fontSize:"1.5rem"},children:r}),e.jsx("div",{style:{textAlign:"center"},children:i})]}),t={render:()=>e.jsx(c,{children:e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"20px"},children:Object.values(o).map(r=>e.jsx(d,{title:m[r],children:e.jsx(p,{status:r})},r))})})};var s,n,a;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px'
    }}>
        {Object.values(CONNECTED_STATUS).map(status => <IconWrapper key={status} title={statuses[status]}>
            <ConnectedIcon status={status} />
          </IconWrapper>)}
      </div>
    </ThemeProviderWrapper>
}`,...(a=(n=t.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const O=["Default"];export{t as Default,O as __namedExportsOrder,I as default};
