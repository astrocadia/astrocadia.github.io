import{j as e}from"./jsx-runtime-4WDyTGeM.js";import{r as t}from"./index-Dl6G-zuu.js";import{T as S}from"./ThemeProviderWrapper-Be5RUURM.js";import{c as E}from"./index-eOQoo3sK.js";import{B as P}from"./Button-CxrygEYf.js";import{C as q,i as V}from"./WarningIcon-6HpPPylF.js";import"./EditIcon-bNkpr5Ld.js";import"./LinkIcon-CKhuJxKk.js";import"./SvgIcon-76a5Fjoi.js";import{I as z}from"./IconButton-DYHDsDKu.js";import{u as F}from"./useToggle-B4o7u8Ia.js";import{C as L}from"./CircularProgress-DSSoc34d.js";import"./Button-C5OdypjM.js";import"./styled-Dt2_JBRt.js";import"./ButtonBase-Cp5BTdG6.js";import"./useTimeout-B4b6mSVs.js";import"./TransitionGroupContext-xAci1nHd.js";import"./useForkRef-BDoLG09A.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./SvgIcon-DROc5w4B.js";import"./IconButton-Djqk-I0k.js";import"./Tooltip-B5Gmbdco.js";import"./useTheme-DLZNzqMo.js";import"./ownerDocument-DW-IO8s5.js";import"./Portal-3LY7w8wx.js";import"./index-CmOK7BR8.js";import"./useSlotProps-CP3WIws3.js";import"./mergeSlotProps-D2P12luN.js";import"./isHostComponent-DVu5iVWx.js";import"./useControlled-1Y2rT-1r.js";import"./useId-BkqTTtmk.js";import"./Grow-BnLMXtPt.js";import"./utils-CzoQ7LGy.js";const R=1e3,g=({busy:r,className:s,disabled:i,fullWidth:f,success:o,onClick:p,label:l})=>{const{toggled:c,setOn:C,setOff:y}=F(!1),[n,b]=t.useState(!!o);t.useEffect(()=>{let T;return o&&(b(!0),T=setTimeout(()=>{b(!1)},R)),()=>{T&&clearTimeout(T)}},[o]);const k=t.useMemo(()=>r?e.jsx(L,{size:"1rem"}):n?e.jsx(q,{}):e.jsx(V,{}),[r,n]),h=t.useMemo(()=>{if(n)return"Sent";if(c||r)return"Send"},[c,r,n]);return e.jsx("div",{className:E("ActionTriggerCard",{ActionTriggerCard__active:c,ActionTriggerCard__busy:r,ActionTriggerCard__disabled:i,ActionTriggerCard__fullWidth:f,ActionTriggerCard__success:n},s),onBlur:y,onFocus:C,onMouseOver:C,onMouseOut:y,children:e.jsxs("div",{className:"ActionTriggerCard__contentWrapper",children:[e.jsx("div",{className:"ActionTriggerCard__label",children:l}),e.jsx("div",{children:h&&!i?e.jsx(P,{disabled:i||r||n,startIcon:k,onClick:p,children:h}):e.jsx(z,{disabled:i||r||n,onClick:p,onTouchStart:C,children:k})})]})})};try{g.displayName="ActionTriggerCard",g.__docgenInfo={description:"",displayName:"ActionTriggerCard",props:{busy:{defaultValue:null,description:"",name:"busy",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},fullWidth:{defaultValue:null,description:"",name:"fullWidth",required:!1,type:{name:"boolean"}},success:{defaultValue:null,description:"",name:"success",required:!1,type:{name:"boolean"}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"() => void"}}}}}catch{}const he={title:"Design System/Components/ActionTriggerCard",tags:["autodocs"],component:g,argTypes:{className:{control:{type:"text"}}}},x={design:{type:"figma",url:"https://www.figma.com/file/9tFaCazTy4LxuJ69xp8D7g/Exhibit-Controls?type=design&node-id=348-8170&mode=design&t=k0PStBO403vTBnpA-0"}},a=({onClickNetworkTimingMS:r=15,busy:s=!1,...i})=>{const[f,o]=t.useState(!1),[p,l]=t.useState(s),c=t.useCallback(()=>{o(!1),l(!0),setTimeout(()=>{l(!1),o(!0)},r)},[r]);return t.useEffect(()=>{l(s)},[s]),e.jsx(g,{...i,busy:p,success:f,onClick:c})},d={render:({label:r="Default sample label",...s})=>e.jsx(S,{children:e.jsx("div",{style:{display:"flex",gap:10,padding:"10px",alignItems:"center"},children:e.jsx(a,{label:r,...s})})}),parameters:x},m={render:({label:r="Default sample label",...s})=>e.jsx(S,{children:e.jsx("div",{style:{padding:"10px"},children:e.jsx(a,{label:r,onClickNetworkTimingMS:1e3,...s})})}),parameters:x},u={render:({label:r="Default sample label",...s})=>e.jsx(S,{children:e.jsx("div",{style:{display:"flex",gap:10,padding:"10px",alignItems:"center"},children:e.jsx(a,{label:r,onClickNetworkTimingMS:5e3,...s})})}),parameters:x};var v,_,I;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`({
  onClickNetworkTimingMS = 15,
  busy = false,
  ...props
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(busy);
  const onClick = useCallback(() => {
    setIsSuccess(false);
    setIsBusy(true);
    setTimeout(() => {
      setIsBusy(false);
      setIsSuccess(true);
    }, onClickNetworkTimingMS);
  }, [onClickNetworkTimingMS]);
  useEffect(() => {
    setIsBusy(busy);
  }, [busy]);
  return <ActionTriggerCard {...props} busy={isBusy} success={isSuccess} onClick={onClick} />;
}`,...(I=(_=a.parameters)==null?void 0:_.docs)==null?void 0:I.source}}};var j,A,N;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: ({
    label = 'Default sample label',
    ...props
  }) => <ThemeProviderWrapper>
      <div style={{
      display: 'flex',
      gap: 10,
      padding: '10px',
      alignItems: 'center'
    }}>
        <ActionTriggerCardOnClickWrapper label={label} {...props} />
      </div>
    </ThemeProviderWrapper>,
  parameters
}`,...(N=(A=d.parameters)==null?void 0:A.docs)==null?void 0:N.source}}};var w,W,B;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: ({
    label = 'Default sample label',
    ...props
  }) => <ThemeProviderWrapper>
      <div style={{
      padding: '10px'
    }}>
        <ActionTriggerCardOnClickWrapper label={label} onClickNetworkTimingMS={1000} {...props} />
      </div>
    </ThemeProviderWrapper>,
  parameters
}`,...(B=(W=m.parameters)==null?void 0:W.docs)==null?void 0:B.source}}};var M,O,D;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: ({
    label = 'Default sample label',
    ...props
  }) => <ThemeProviderWrapper>
      <div style={{
      display: 'flex',
      gap: 10,
      padding: '10px',
      alignItems: 'center'
    }}>
        <ActionTriggerCardOnClickWrapper label={label} onClickNetworkTimingMS={5000} {...props} />
      </div>
    </ThemeProviderWrapper>,
  parameters
}`,...(D=(O=u.parameters)==null?void 0:O.docs)==null?void 0:D.source}}};const ve=["ActionTriggerCardOnClickWrapper","Default","MediumNetworkSimulation","SlowNetworkSimulation"];export{a as ActionTriggerCardOnClickWrapper,d as Default,m as MediumNetworkSimulation,u as SlowNetworkSimulation,ve as __namedExportsOrder,he as default};
