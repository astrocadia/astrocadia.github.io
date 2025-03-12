import{j as e}from"./jsx-runtime-4WDyTGeM.js";import{r as t}from"./index-Dl6G-zuu.js";import{c as y}from"./index-eOQoo3sK.js";import{B as A}from"./Button-CqlPB7zF.js";import{T as W}from"./ThemeProviderWrapper-Be5RUURM.js";import"./Button-C5OdypjM.js";import"./styled-Dt2_JBRt.js";import"./ButtonBase-Cp5BTdG6.js";import"./useTimeout-B4b6mSVs.js";import"./TransitionGroupContext-xAci1nHd.js";import"./useForkRef-BDoLG09A.js";import"./useIsFocusVisible-NzCoqL_q.js";const d=({activeLabel:a="Stop Streaming",className:p="",inactiveLabel:m="Stream",initialState:w=!1,onClick:f=()=>{},..._})=>{const[l,B]=t.useState(w),[h,N]=t.useState(0),[L,j]=t.useState({}),i=t.useRef(null),n=t.useRef(null),P=t.useCallback(()=>{B(!l),f(l)},[l,f]);return t.useEffect(()=>{i.current&&n.current&&N(i.current.clientWidth-n.current.clientWidth)},[a,m]),t.useEffect(()=>{if(i.current&&n.current){const b=n.current.clientWidth+h;j({maxWidth:`${b}px`,minWidth:`${b}px`})}},[h,l]),e.jsx("div",{className:y("StreamButton",p,{StreamButton__active:l}),ref:i,children:e.jsxs(A,{className:y("StreamButton__button",p),onClick:P,style:L,..._,children:[e.jsxs("div",{className:"StreamButton__dotContainer",children:[e.jsx("div",{className:"StreamButton__dot"}),l&&e.jsxs("div",{className:"StreamButton__backgroundRipple",children:[e.jsx("div",{}),e.jsx("div",{})]})]}),e.jsx("div",{ref:n,children:l?a:m})]})})};try{d.displayName="StreamButton",d.__docgenInfo={description:"",displayName:"StreamButton",props:{activeLabel:{defaultValue:{value:"Stop Streaming"},description:"",name:"activeLabel",required:!1,type:{name:"string"}},inactiveLabel:{defaultValue:{value:"Stream"},description:"",name:"inactiveLabel",required:!1,type:{name:"string"}},initialState:{defaultValue:{value:"false"},description:"",name:"initialState",required:!1,type:{name:"boolean"}},onClick:{defaultValue:{value:"() => {}"},description:"",name:"onClick",required:!1,type:{name:"((event: boolean) => void)"}},children:{defaultValue:null,description:"The content of the component.",name:"children",required:!1,type:{name:"ReactNode"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null"}},disabled:{defaultValue:{value:`false
false`},description:"If `true`, the component is disabled.",name:"disabled",required:!1,type:{name:"boolean"}},classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"(Partial<ButtonClasses> & Partial<ClassNameMap<never>>)"}},action:{defaultValue:null,description:"A ref for imperative actions.\nIt currently only supports `focusVisible()` action.",name:"action",required:!1,type:{name:"Ref<ButtonBaseActions>"}},centerRipple:{defaultValue:{value:"false"},description:"If `true`, the ripples are centered.\nThey won't start at the cursor interaction position.",name:"centerRipple",required:!1,type:{name:"boolean"}},disableRipple:{defaultValue:{value:"false"},description:"If `true`, the ripple effect is disabled.\n\n⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure\nto highlight the element by applying separate styles with the `.Mui-focusVisible` class.",name:"disableRipple",required:!1,type:{name:"boolean"}},disableTouchRipple:{defaultValue:{value:"false"},description:"If `true`, the touch ripple effect is disabled.",name:"disableTouchRipple",required:!1,type:{name:"boolean"}},focusRipple:{defaultValue:{value:"false"},description:"If `true`, the base button will have a keyboard focus ripple.",name:"focusRipple",required:!1,type:{name:"boolean"}},focusVisibleClassName:{defaultValue:null,description:`This prop can help identify which element has keyboard focus.
The class name will be applied when the element gains the focus through keyboard interaction.
It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a \`focus-visible\` class to other components
if needed.`,name:"focusVisibleClassName",required:!1,type:{name:"string"}},LinkComponent:{defaultValue:{value:"'a'"},description:"The component used to render a link when the `href` prop is provided.",name:"LinkComponent",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}},onFocusVisible:{defaultValue:null,description:"Callback fired when the component is focused with a keyboard.\nWe trigger a `onFocus` callback too.",name:"onFocusVisible",required:!1,type:{name:"FocusEventHandler<any>"}},sx:{defaultValue:null,description:"The system prop that allows defining system overrides as well as additional CSS styles.",name:"sx",required:!1,type:{name:"SxProps<Theme>"}},tabIndex:{defaultValue:{value:"0"},description:"",name:"tabIndex",required:!1,type:{name:"number"}},TouchRippleProps:{defaultValue:null,description:"Props applied to the `TouchRipple` element.",name:"TouchRippleProps",required:!1,type:{name:"Partial<TouchRippleProps>"}},touchRippleRef:{defaultValue:null,description:"A ref that points to the `TouchRipple` element.",name:"touchRippleRef",required:!1,type:{name:"Ref<TouchRippleActions>"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}},disableFocusRipple:{defaultValue:{value:"false"},description:"If `true`, the  keyboard focus ripple is disabled.",name:"disableFocusRipple",required:!1,type:{name:"boolean"}},size:{defaultValue:{value:"'medium'"},description:"The size of the component.\n`small` is equivalent to the dense button styling.",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"large"'},{value:'"medium"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"input"'},{value:'"primary"'},{value:'"secondary"'},{value:'"ghost"'},{value:'"flow"'}]}},href:{defaultValue:null,description:"The URL to link to when the button is clicked.\nIf defined, an `a` element will be used as the root node.",name:"href",required:!1,type:{name:"string"}},fullWidth:{defaultValue:{value:"false"},description:"If `true`, the button will take up the full width of its container.",name:"fullWidth",required:!1,type:{name:"boolean"}},disableElevation:{defaultValue:{value:"false"},description:"If `true`, no elevation is used.",name:"disableElevation",required:!1,type:{name:"boolean"}},endIcon:{defaultValue:null,description:"Element placed after the children.",name:"endIcon",required:!1,type:{name:"ReactNode"}},startIcon:{defaultValue:null,description:"Element placed before the children.",name:"startIcon",required:!1,type:{name:"ReactNode"}}}}}catch{}const Q={title:"Design System/Components/StreamButton",tags:["autodocs"],component:d},c=a=>e.jsx(W,{children:e.jsx("div",{style:{display:"flex",width:a.activeLabel?`${8.25*a.activeLabel.length+50}px`:"160px",justifyContent:"flex-end"},children:e.jsx(d,{...a})})}),s={render:c},r={args:{activeLabel:"🥳 PARTY ROCKERS IN THE HOUSE TONIGHT!!! 🥳",inactiveLabel:"Party Rock? 🤔"},render:c},o={args:{disabled:!0},render:c},u={args:{disabled:!0,initialState:!0,activeLabel:"Can't stop streaming"},render:c};var v,g,R;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render
}`,...(R=(g=s.parameters)==null?void 0:g.docs)==null?void 0:R.source}}};var S,V,q;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    activeLabel: '🥳 PARTY ROCKERS IN THE HOUSE TONIGHT!!! 🥳',
    inactiveLabel: 'Party Rock? 🤔'
  },
  render
}`,...(q=(V=r.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};var T,x,I;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render
}`,...(I=(x=o.parameters)==null?void 0:x.docs)==null?void 0:I.source}}};var C,E,k;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    disabled: true,
    initialState: true,
    activeLabel: "Can't stop streaming"
  },
  render
}`,...(k=(E=u.parameters)==null?void 0:E.docs)==null?void 0:k.source}}};const X=["Default","CustomLabels","Disabled","DisabledActive"];export{r as CustomLabels,s as Default,o as Disabled,u as DisabledActive,X as __namedExportsOrder,Q as default};
