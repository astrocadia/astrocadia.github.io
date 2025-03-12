import{j as o}from"./jsx-runtime-4WDyTGeM.js";import{r as s}from"./index-Dl6G-zuu.js";import{T as c}from"./ThemeProviderWrapper-Be5RUURM.js";import{A as W}from"./ActionTriggerButton-hG8o9D5a.js";import"./index-eOQoo3sK.js";import"./WarningIcon-6HpPPylF.js";import"./SvgIcon-76a5Fjoi.js";import"./SvgIcon-DROc5w4B.js";import"./styled-Dt2_JBRt.js";import"./EditIcon-bNkpr5Ld.js";import"./LinkIcon-CKhuJxKk.js";import"./IconButton-DYHDsDKu.js";import"./IconButton-Djqk-I0k.js";import"./ButtonBase-Cp5BTdG6.js";import"./useTimeout-B4b6mSVs.js";import"./TransitionGroupContext-xAci1nHd.js";import"./useForkRef-BDoLG09A.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./Tooltip-B5Gmbdco.js";import"./useTheme-DLZNzqMo.js";import"./ownerDocument-DW-IO8s5.js";import"./Portal-3LY7w8wx.js";import"./index-CmOK7BR8.js";import"./useSlotProps-CP3WIws3.js";import"./mergeSlotProps-D2P12luN.js";import"./isHostComponent-DVu5iVWx.js";import"./useControlled-1Y2rT-1r.js";import"./useId-BkqTTtmk.js";import"./Grow-BnLMXtPt.js";import"./utils-CzoQ7LGy.js";import"./useToggle-B4o7u8Ia.js";import"./CircularProgress-DSSoc34d.js";const pe={title:"Design System/Components/ActionTriggerButton",tags:["autodocs"],component:W},m={design:{type:"figma",url:"https://www.figma.com/proto/0jimeeoOUb0jnANEyfRvW4/Component-Details?page-id=3322%3A52311&node-id=4013-32363&t=hapriD8UoqoSZYVc-0&scaling=min-zoom&content-scaling=fixed"}},r=({onClickNetworkTimingMS:e=15,busy:p=!1,...h})=>{const[j,u]=s.useState(!1),[A,a]=s.useState(p),N=s.useCallback(()=>{u(!1),a(!0),setTimeout(()=>{a(!1),u(!0)},e)},[e]);return s.useEffect(()=>{a(p)},[p]),o.jsx(W,{...h,busy:A,success:j,onClick:N})},t={render:({...e})=>o.jsx(c,{children:o.jsx(r,{...e})}),parameters:m},n={render:({...e})=>o.jsx(c,{children:o.jsx(r,{onClickNetworkTimingMS:1e3,...e})}),parameters:m},i={render:({...e})=>o.jsx(c,{children:o.jsx(r,{onClickNetworkTimingMS:5e3,...e})}),parameters:m};var l,d,g;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`({
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
  return <ActionTriggerButton {...props} busy={isBusy} success={isSuccess} onClick={onClick} />;
}`,...(g=(d=r.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var S,k,T;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: ({
    ...props
  }) => <ThemeProviderWrapper>
      <ActionTriggerButtonOnClickWrapper {...props} />
    </ThemeProviderWrapper>,
  parameters
}`,...(T=(k=t.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};var f,C,B;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: ({
    ...props
  }) => <ThemeProviderWrapper>
      <ActionTriggerButtonOnClickWrapper onClickNetworkTimingMS={1000} {...props} />
    </ThemeProviderWrapper>,
  parameters
}`,...(B=(C=n.parameters)==null?void 0:C.docs)==null?void 0:B.source}}};var w,y,x;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: ({
    ...props
  }) => <ThemeProviderWrapper>
      <ActionTriggerButtonOnClickWrapper onClickNetworkTimingMS={5000} {...props} />
    </ThemeProviderWrapper>,
  parameters
}`,...(x=(y=i.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};const ae=["ActionTriggerButtonOnClickWrapper","Default","MediumNetworkSimulation","SlowNetworkSimulation"];export{r as ActionTriggerButtonOnClickWrapper,t as Default,n as MediumNetworkSimulation,i as SlowNetworkSimulation,ae as __namedExportsOrder,pe as default};
