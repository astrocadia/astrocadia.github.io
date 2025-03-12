import{j as o}from"./jsx-runtime-4WDyTGeM.js";import{e as v,k as T,l as I,b as a,_ as H,T as U}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{c as D}from"./index-eOQoo3sK.js";import{r as F}from"./index-Dl6G-zuu.js";import{a as Z,b as Y,s as m,e as G,f as J}from"./styled-DaAyEikA.js";import{c as K}from"./index-CmspVeCA.js";import{u as S}from"./useSlot-19y32CJk.js";import{c as d}from"./createSvgIcon-DWxpDd4T.js";import{P as Q}from"./Paper-B6pP1Hjl.js";import{I as X}from"./IconButton-BRjw76_K.js";import"./mergeSlotProps-Dc5z_XIy.js";import"./isHostComponent-DVu5iVWx.js";import"./useForkRef-BDoLG09A.js";import"./SvgIcon-d6V0mnb4.js";import"./ButtonBase-gXIT4mbS.js";import"./useTimeout-B4b6mSVs.js";import"./TransitionGroupContext-xAci1nHd.js";import"./useIsFocusVisible-NzCoqL_q.js";function ee(e){return Y("MuiAlert",e)}const b=Z("MuiAlert",["root","action","icon","message","filled","colorSuccess","colorInfo","colorWarning","colorError","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),te=d(o.jsx("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),oe=d(o.jsx("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),re=d(o.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),se=d(o.jsx("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),ne=d(o.jsx("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),ae=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],le=K(),ie=e=>{const{variant:r,color:s,severity:t,classes:i}=e,f={root:["root",`color${v(s||t)}`,`${r}${v(s||t)}`,`${r}`],icon:["icon"],message:["message"],action:["action"]};return J(f,ee,i)},ce=m(Q,{name:"MuiAlert",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:s}=e;return[r.root,r[s.variant],r[`${s.variant}${v(s.color||s.severity)}`]]}})(({theme:e})=>{const r=e.palette.mode==="light"?T:I,s=e.palette.mode==="light"?I:T;return a({},e.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px",variants:[...Object.entries(e.palette).filter(([,t])=>t.main&&t.light).map(([t])=>({props:{colorSeverity:t,variant:"standard"},style:{color:e.vars?e.vars.palette.Alert[`${t}Color`]:r(e.palette[t].light,.6),backgroundColor:e.vars?e.vars.palette.Alert[`${t}StandardBg`]:s(e.palette[t].light,.9),[`& .${b.icon}`]:e.vars?{color:e.vars.palette.Alert[`${t}IconColor`]}:{color:e.palette[t].main}}})),...Object.entries(e.palette).filter(([,t])=>t.main&&t.light).map(([t])=>({props:{colorSeverity:t,variant:"outlined"},style:{color:e.vars?e.vars.palette.Alert[`${t}Color`]:r(e.palette[t].light,.6),border:`1px solid ${(e.vars||e).palette[t].light}`,[`& .${b.icon}`]:e.vars?{color:e.vars.palette.Alert[`${t}IconColor`]}:{color:e.palette[t].main}}})),...Object.entries(e.palette).filter(([,t])=>t.main&&t.dark).map(([t])=>({props:{colorSeverity:t,variant:"filled"},style:a({fontWeight:e.typography.fontWeightMedium},e.vars?{color:e.vars.palette.Alert[`${t}FilledColor`],backgroundColor:e.vars.palette.Alert[`${t}FilledBg`]}:{backgroundColor:e.palette.mode==="dark"?e.palette[t].dark:e.palette[t].main,color:e.palette.getContrastText(e.palette[t].main)})}))]})}),de=m("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(e,r)=>r.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),pe=m("div",{name:"MuiAlert",slot:"Message",overridesResolver:(e,r)=>r.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),P=m("div",{name:"MuiAlert",slot:"Action",overridesResolver:(e,r)=>r.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),j={success:o.jsx(te,{fontSize:"inherit"}),warning:o.jsx(oe,{fontSize:"inherit"}),error:o.jsx(re,{fontSize:"inherit"}),info:o.jsx(se,{fontSize:"inherit"})},ue=F.forwardRef(function(r,s){const t=le({props:r,name:"MuiAlert"}),{action:i,children:f,className:q,closeText:h="Close",color:y,components:g={},componentsProps:V={},icon:x,iconMapping:E=j,onClose:A,role:z="alert",severity:p="success",slotProps:O={},slots:R={},variant:N="standard"}=t,$=H(t,ae),n=a({},t,{color:y,severity:p,variant:N,colorSeverity:y||p}),c=ie(n),C={slots:a({closeButton:g.CloseButton,closeIcon:g.CloseIcon},R),slotProps:a({},V,O)},[L,_]=S("closeButton",{elementType:X,externalForwardedProps:C,ownerState:n}),[B,W]=S("closeIcon",{elementType:ne,externalForwardedProps:C,ownerState:n});return o.jsxs(ce,a({role:z,elevation:0,ownerState:n,className:G(c.root,q),ref:s},$,{children:[x!==!1?o.jsx(de,{ownerState:n,className:c.icon,children:x||E[p]||j[p]}):null,o.jsx(pe,{ownerState:n,className:c.message,children:f}),i!=null?o.jsx(P,{ownerState:n,className:c.action,children:i}):null,i==null&&A?o.jsx(P,{ownerState:n,className:c.action,children:o.jsx(L,a({size:"small","aria-label":h,title:h,color:"inherit",onClick:A},_,{children:o.jsx(B,a({fontSize:"small"},W))}))}):null]}))}),l=({className:e,...r})=>o.jsx(ue,{className:D("Alert",e),...r});try{l.displayName="Alert",l.__docgenInfo={description:"",displayName:"Alert",props:{action:{defaultValue:null,description:"The action to display. It renders after the message, at the end of the alert.",name:"action",required:!1,type:{name:"ReactNode"}},classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"Partial<AlertClasses>"}},closeText:{defaultValue:{value:"'Close'"},description:`Override the default label for the *close popup* icon button.

For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).`,name:"closeText",required:!1,type:{name:"string"}},color:{defaultValue:null,description:"The color of the component. Unless provided, the value is taken from the `severity` prop.\nIt supports both default and custom theme colors, which can be added as shown in the\n[palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).",name:"color",required:!1,type:{name:"enum",value:[{value:'"error"'},{value:'"info"'},{value:'"success"'},{value:'"warning"'}]}},components:{defaultValue:{value:"{}"},description:"The components used for each slot inside.\n@deprecated use the `slots` prop instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).",name:"components",required:!1,type:{name:"{ CloseButton?: ElementType<any, keyof IntrinsicElements>; CloseIcon?: ElementType<any, keyof IntrinsicElements>; } | undefined"}},componentsProps:{defaultValue:{value:"{}"},description:"The extra props for the slot components.\nYou can override the existing props or add new ones.\n@deprecated use the `slotProps` prop instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).",name:"componentsProps",required:!1,type:{name:"{ closeButton?: IconButtonProps; closeIcon?: SvgIconProps; } | undefined"}},severity:{defaultValue:{value:"'success'"},description:"The severity of the alert. This defines the color and icon used.",name:"severity",required:!1,type:{name:"enum",value:[{value:'"error"'},{value:'"info"'},{value:'"success"'},{value:'"warning"'}]}},icon:{defaultValue:null,description:"Override the icon displayed before the children.\nUnless provided, the icon is mapped to the value of the `severity` prop.\nSet to `false` to remove the `icon`.",name:"icon",required:!1,type:{name:"ReactNode"}},role:{defaultValue:{value:"'alert'"},description:"The ARIA role attribute of the element.",name:"role",required:!1,type:{name:"string"}},iconMapping:{defaultValue:null,description:"The component maps the `severity` prop to a range of different icons,\nfor instance success to `<SuccessOutlined>`.\nIf you wish to change this mapping, you can provide your own.\nAlternatively, you can use the `icon` prop to override the icon displayed.",name:"iconMapping",required:!1,type:{name:"Partial<Record<OverridableStringUnion<AlertColor, AlertPropsColorOverrides>, ReactNode>>"}},onClose:{defaultValue:null,description:"Callback fired when the component requests to be closed.\nWhen provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.\n@param event The event source of the callback.",name:"onClose",required:!1,type:{name:"((event: SyntheticEvent<Element, Event>) => void)"}},variant:{defaultValue:{value:"'standard'"},description:"The variant to use.",name:"variant",required:!1,type:{name:"enum",value:[{value:'"filled"'},{value:'"outlined"'},{value:'"standard"'}]}},sx:{defaultValue:null,description:"The system prop that allows defining system overrides as well as additional CSS styles.",name:"sx",required:!1,type:{name:"SxProps<Theme>"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},children:{defaultValue:null,description:"The content of the component.",name:"children",required:!1,type:{name:"ReactNode"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}},elevation:{defaultValue:{value:"1"},description:"Shadow depth, corresponds to `dp` in the spec.\nIt accepts values between 0 and 24 inclusive.",name:"elevation",required:!1,type:{name:"number"}},square:{defaultValue:{value:"false"},description:"If `true`, rounded corners are disabled.",name:"square",required:!1,type:{name:"boolean"}},slots:{defaultValue:{value:"{}"},description:"The components used for each slot inside.",name:"slots",required:!1,type:{name:"AlertSlots"}},slotProps:{defaultValue:{value:"{}"},description:"The props used for each slot inside.",name:"slotProps",required:!1,type:{name:"{ closeButton?: SlotProps<ElementType<IconButtonProps, keyof IntrinsicElements>, {}, AlertOwnerState>; closeIcon?: SlotProps<...>; } | undefined"}}}}}catch{}const qe={title:"Design System/Components/Alert",tags:["autodocs"],component:l},u={render:()=>o.jsx(U,{children:o.jsxs("div",{style:{display:"grid",gap:10},children:[o.jsx(l,{severity:"error",children:"This is an error alert — check it out!"}),o.jsx(l,{severity:"warning",children:"This is a warning alert — check it out!"}),o.jsx(l,{severity:"info",children:"This is an info alert — check it out!"}),o.jsx(l,{severity:"success",children:"This is a success alert — check it out!"})]})})};var k,w,M;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <div style={{
      display: 'grid',
      gap: 10
    }}>
        <Alert severity='error'>This is an error alert — check it out!</Alert>
        <Alert severity='warning'>
          This is a warning alert — check it out!
        </Alert>
        <Alert severity='info'>This is an info alert — check it out!</Alert>
        <Alert severity='success'>
          This is a success alert — check it out!
        </Alert>
      </div>
    </ThemeProviderWrapper>
}`,...(M=(w=u.parameters)==null?void 0:w.docs)==null?void 0:M.source}}};const Ve=["Default"];export{u as Default,Ve as __namedExportsOrder,qe as default};
