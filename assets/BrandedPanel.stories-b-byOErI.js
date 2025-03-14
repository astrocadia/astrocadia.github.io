import{j as e}from"./jsx-runtime-4WDyTGeM.js";import{T as s}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{c as I}from"./index-eOQoo3sK.js";import{G as A}from"./GumbandLogoPaddedDark-D3tEVDL8.js";import{I as p}from"./IconButton-BSilU2Vk.js";import{A as F,r as N}from"./WarningIcon-DSaUQRF0.js";import"./EditIcon-BarJNwgW.js";import"./LinkIcon-DxnDj71h.js";import"./SvgIcon-DgPANJTo.js";import"./index-Dl6G-zuu.js";import"./IconButton-BRjw76_K.js";import"./styled-DaAyEikA.js";import"./ButtonBase-gXIT4mbS.js";import"./useTimeout-B4b6mSVs.js";import"./TransitionGroupContext-xAci1nHd.js";import"./useForkRef-BDoLG09A.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./Tooltip-CSQNJ7MT.js";import"./useTheme-CYpYpbD_.js";import"./ownerDocument-DW-IO8s5.js";import"./Portal-3LY7w8wx.js";import"./index-CmOK7BR8.js";import"./useSlotProps-DeMrnH46.js";import"./mergeSlotProps-Dc5z_XIy.js";import"./isHostComponent-DVu5iVWx.js";import"./useControlled-1Y2rT-1r.js";import"./useId-BkqTTtmk.js";import"./Grow-CF8DuDB2.js";import"./utils-Dh94M0rq.js";import"./SvgIcon-d6V0mnb4.js";const i=({children:o,className:_,footer:d,onBack:m,OnBackIconButtonProps:L,onForward:c,OnForwardIconButtonProps:w})=>e.jsxs("div",{className:I(_,"BrandedPanel"),children:[e.jsxs("div",{className:"BrandedPanel__wrapper",children:[e.jsxs("div",{className:"BrandedPanel__header",children:[e.jsx("div",{className:"BrandedPanel__back",children:m&&e.jsx(p,{variant:"ghost",onClick:m,...L,children:e.jsx(F,{})})}),e.jsx("img",{className:"logo",src:A,alt:"Gumband Logo"}),e.jsx("div",{className:"BrandedPanel__forward",children:c&&e.jsx(p,{variant:"ghost",onClick:c,...w,children:e.jsx(N,{})})})]}),e.jsx("div",{className:"BrandedPanel__content",children:o})]}),d&&e.jsx("div",{className:"BrandedPanel__footer",children:d})]});try{i.displayName="BrandedPanel",i.__docgenInfo={description:"",displayName:"BrandedPanel",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},footer:{defaultValue:null,description:"",name:"footer",required:!1,type:{name:"ReactNode"}},onBack:{defaultValue:null,description:"",name:"onBack",required:!1,type:{name:"MouseEventHandler<HTMLButtonElement>"}},OnBackIconButtonProps:{defaultValue:null,description:"",name:"OnBackIconButtonProps",required:!1,type:{name:"IconButtonProps"}},onForward:{defaultValue:null,description:"",name:"onForward",required:!1,type:{name:"MouseEventHandler<HTMLButtonElement>"}},OnForwardIconButtonProps:{defaultValue:null,description:"",name:"OnForwardIconButtonProps",required:!1,type:{name:"IconButtonProps"}}}}}catch{}const oe={title:"Design System/Views/BrandedPanel",tags:["autodocs"],component:i},r={render:()=>e.jsx(s,{children:e.jsxs(i,{children:[e.jsx("p",{children:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. A rem reprehenderit nisi deleniti suscipit omnis sequi totam ut possimus veniam."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit rerum ipsa quia recusandae fuga, voluptatem optio accusantium deleniti quae officiis?"})]})})},n={render:()=>e.jsx(s,{children:e.jsxs(i,{onBack:()=>alert("Back Clicked"),children:[e.jsx("p",{children:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. A rem reprehenderit nisi deleniti suscipit omnis sequi totam ut possimus veniam."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit rerum ipsa quia recusandae fuga, voluptatem optio accusantium deleniti quae officiis?"})]})})},a={render:()=>e.jsx(s,{children:e.jsxs(i,{onForward:()=>alert("Forward Clicked"),children:[e.jsx("p",{children:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. A rem reprehenderit nisi deleniti suscipit omnis sequi totam ut possimus veniam."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit rerum ipsa quia recusandae fuga, voluptatem optio accusantium deleniti quae officiis?"})]})})},t={render:()=>e.jsx(s,{children:e.jsxs(i,{onBack:()=>alert("Back Clicked"),onForward:()=>alert("Forward Clicked"),children:[e.jsx("p",{children:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. A rem reprehenderit nisi deleniti suscipit omnis sequi totam ut possimus veniam."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit rerum ipsa quia recusandae fuga, voluptatem optio accusantium deleniti quae officiis?"})]})})};var l,u,f;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <BrandedPanel>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. A rem
          reprehenderit nisi deleniti suscipit omnis sequi totam ut possimus
          veniam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
          rerum ipsa quia recusandae fuga, voluptatem optio accusantium deleniti
          quae officiis?
        </p>
      </BrandedPanel>
    </ThemeProviderWrapper>
}`,...(f=(u=r.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var h,B,g;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      {/* eslint-disable-next-line no-alert */}
      <BrandedPanel onBack={() => alert('Back Clicked')}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. A rem
          reprehenderit nisi deleniti suscipit omnis sequi totam ut possimus
          veniam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
          rerum ipsa quia recusandae fuga, voluptatem optio accusantium deleniti
          quae officiis?
        </p>
      </BrandedPanel>
    </ThemeProviderWrapper>
}`,...(g=(B=n.parameters)==null?void 0:B.docs)==null?void 0:g.source}}};var v,x,P;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      {/* eslint-disable-next-line no-alert */}
      <BrandedPanel onForward={() => alert('Forward Clicked')}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. A rem
          reprehenderit nisi deleniti suscipit omnis sequi totam ut possimus
          veniam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
          rerum ipsa quia recusandae fuga, voluptatem optio accusantium deleniti
          quae officiis?
        </p>
      </BrandedPanel>
    </ThemeProviderWrapper>
}`,...(P=(x=a.parameters)==null?void 0:x.docs)==null?void 0:P.source}}};var j,q,k;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <BrandedPanel
    // eslint-disable-next-line no-alert
    onBack={() => alert('Back Clicked')}
    // eslint-disable-next-line no-alert
    onForward={() => alert('Forward Clicked')}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. A rem
          reprehenderit nisi deleniti suscipit omnis sequi totam ut possimus
          veniam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
          rerum ipsa quia recusandae fuga, voluptatem optio accusantium deleniti
          quae officiis?
        </p>
      </BrandedPanel>
    </ThemeProviderWrapper>
}`,...(k=(q=t.parameters)==null?void 0:q.docs)==null?void 0:k.source}}};const de=["Default","BackAction","ForwardAction","DoubleAction"];export{n as BackAction,r as Default,t as DoubleAction,a as ForwardAction,de as __namedExportsOrder,oe as default};
