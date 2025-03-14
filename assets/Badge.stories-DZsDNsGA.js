import{j as e}from"./jsx-runtime-4WDyTGeM.js";import{T as i}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{C as l}from"./WarningIcon-DSaUQRF0.js";import"./EditIcon-BarJNwgW.js";import"./LinkIcon-DxnDj71h.js";import"./SvgIcon-DgPANJTo.js";import{B as r}from"./Badge-B5h4WNES.js";import"./index-Dl6G-zuu.js";import"./SvgIcon-d6V0mnb4.js";import"./styled-DaAyEikA.js";import"./index-eOQoo3sK.js";const re={title:"Design System/Components/Badge",tags:["autodocs"],component:r},d={render:({Icon:a=l,...n})=>e.jsx(i,{children:e.jsx("div",{style:{padding:"5rem",backgroundColor:"white"},children:e.jsx(r,{Icon:a,...n})})})},s={render:({Icon:a=l,variant:n="circle",...o})=>e.jsx(i,{children:e.jsx("div",{style:{padding:"5rem",backgroundColor:"white"},children:e.jsx(r,{Icon:a,variant:n,...o})})})},c={render:({Icon:a=l,label:n="Sample Label",...o})=>e.jsx(i,{children:e.jsx("div",{style:{padding:"5rem",backgroundColor:"white"},children:e.jsx(r,{Icon:a,label:n,...o})})})},p={render:({Icon:a=l,label:n="Sample Label",variant:o="circle",...J})=>e.jsx(i,{children:e.jsx("div",{style:{padding:"5rem",backgroundColor:"white"},children:e.jsx(r,{Icon:a,label:n,variant:o,...J})})})},t={render:({Icon:a=l,label:n="Sample Label",...o})=>e.jsx(i,{children:e.jsx("div",{style:{padding:"5rem",backgroundColor:"white",maxWidth:"16rem"},children:e.jsx(r,{Icon:a,label:n,...o})})})},m={render:()=>e.jsx(i,{children:e.jsxs("div",{style:{padding:"5rem",backgroundColor:"white",display:"flex",gap:"1rem"},children:[e.jsx(r,{label:"Sample Label"}),e.jsx(r,{label:"5"}),e.jsx(r,{label:"105"})]})})},g={render:()=>e.jsx(i,{children:e.jsxs("div",{style:{padding:"5rem",backgroundColor:"white",display:"flex",gap:"1rem"},children:[e.jsx(r,{label:"Sample Label",variant:"circle"}),e.jsx(r,{label:"5",variant:"circle"}),e.jsx(r,{label:"105",variant:"circle"})]})})},b={render:()=>e.jsx(i,{children:e.jsxs("div",{style:{padding:"5rem",backgroundColor:"white",display:"flex",gap:"1rem"},children:[e.jsx(r,{}),e.jsx(r,{variant:"circle"})]})})},h={render:()=>e.jsx(i,{children:e.jsxs("div",{style:{padding:"5rem",backgroundColor:"white",display:"flex",flexWrap:"wrap",gap:"1rem"},children:[e.jsx(r,{Icon:l,size:"large"}),e.jsx(r,{Icon:l,variant:"circle",size:"large"}),e.jsx(r,{Icon:l,size:"large",label:"Sample Label"}),e.jsx(r,{Icon:l,variant:"circle",size:"large",label:"Sample Label"}),e.jsx(r,{size:"large",label:"Sample Label"}),e.jsx(r,{label:"S",size:"large"}),e.jsx(r,{variant:"circle",size:"large",label:"Sample Label"}),e.jsx(r,{label:"S",variant:"circle",size:"large"}),e.jsx(r,{size:"large"}),e.jsx(r,{variant:"circle",size:"large"})]})})};var v,u,x;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: ({
    Icon = CheckIcon,
    ...props
  }) => <ThemeProviderWrapper>
      <div style={{
      padding: '5rem',
      backgroundColor: 'white'
    }}>
        <Badge Icon={Icon} {...props} />
      </div>
    </ThemeProviderWrapper>
}`,...(x=(u=d.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var j,C,y;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: ({
    Icon = CheckIcon,
    variant = 'circle',
    ...props
  }) => <ThemeProviderWrapper>
      <div style={{
      padding: '5rem',
      backgroundColor: 'white'
    }}>
        <Badge Icon={Icon} variant={variant} {...props} />
      </div>
    </ThemeProviderWrapper>
}`,...(y=(C=s.parameters)==null?void 0:C.docs)==null?void 0:y.source}}};var I,L,S;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: ({
    Icon = CheckIcon,
    label = 'Sample Label',
    ...props
  }) => <ThemeProviderWrapper>
      <div style={{
      padding: '5rem',
      backgroundColor: 'white'
    }}>
        <Badge Icon={Icon} label={label} {...props} />
      </div>
    </ThemeProviderWrapper>
}`,...(S=(L=c.parameters)==null?void 0:L.docs)==null?void 0:S.source}}};var W,k,B;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: ({
    Icon = CheckIcon,
    label = 'Sample Label',
    variant = 'circle',
    ...props
  }) => <ThemeProviderWrapper>
      <div style={{
      padding: '5rem',
      backgroundColor: 'white'
    }}>
        <Badge Icon={Icon} label={label} variant={variant} {...props} />
      </div>
    </ThemeProviderWrapper>
}`,...(B=(k=p.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var w,z,T;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: ({
    Icon = CheckIcon,
    label = 'Sample Label',
    ...props
  }) => <ThemeProviderWrapper>
      <div style={{
      padding: '5rem',
      backgroundColor: 'white',
      maxWidth: '16rem'
    }}>
        <Badge Icon={Icon} label={label} {...props} />
      </div>
    </ThemeProviderWrapper>
}`,...(T=(z=t.parameters)==null?void 0:z.docs)==null?void 0:T.source}}};var P,f,O;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <div style={{
      padding: '5rem',
      backgroundColor: 'white',
      display: 'flex',
      gap: '1rem'
    }}>
        <Badge label='Sample Label' />
        <Badge label='5' />
        <Badge label='105' />
      </div>
    </ThemeProviderWrapper>
}`,...(O=(f=m.parameters)==null?void 0:f.docs)==null?void 0:O.source}}};var R,E,D;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <div style={{
      padding: '5rem',
      backgroundColor: 'white',
      display: 'flex',
      gap: '1rem'
    }}>
        <Badge label='Sample Label' variant='circle' />
        <Badge label='5' variant='circle' />
        <Badge label='105' variant='circle' />
      </div>
    </ThemeProviderWrapper>
}`,...(D=(E=g.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};var _,q,A;b.parameters={...b.parameters,docs:{...(_=b.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <div style={{
      padding: '5rem',
      backgroundColor: 'white',
      display: 'flex',
      gap: '1rem'
    }}>
        <Badge />
        <Badge variant='circle' />
      </div>
    </ThemeProviderWrapper>
}`,...(A=(q=b.parameters)==null?void 0:q.docs)==null?void 0:A.source}}};var F,G,H;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <div style={{
      padding: '5rem',
      backgroundColor: 'white',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
        <Badge Icon={CheckIcon} size='large' />
        <Badge Icon={CheckIcon} variant='circle' size='large' />
        <Badge Icon={CheckIcon} size='large' label='Sample Label' />
        <Badge Icon={CheckIcon} variant='circle' size='large' label='Sample Label' />
        <Badge size='large' label='Sample Label' />
        <Badge label='S' size='large' />
        <Badge variant='circle' size='large' label='Sample Label' />
        <Badge label='S' variant='circle' size='large' />
        <Badge size='large' />
        <Badge variant='circle' size='large' />
      </div>
    </ThemeProviderWrapper>
}`,...(H=(G=h.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};const ae=["Default","Circular","RoundedWithLabel","CircularWithLabel","LongLabel","RoundedWithLabelOnly","CircularWithLabelOnly","Empty","Large"];export{s as Circular,p as CircularWithLabel,g as CircularWithLabelOnly,d as Default,b as Empty,h as Large,t as LongLabel,c as RoundedWithLabel,m as RoundedWithLabelOnly,ae as __namedExportsOrder,re as default};
