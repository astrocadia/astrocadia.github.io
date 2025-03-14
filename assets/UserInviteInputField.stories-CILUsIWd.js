import{j as t}from"./jsx-runtime-4WDyTGeM.js";import{r as o}from"./index-Dl6G-zuu.js";import{T as u}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{U as l}from"./UserInviteInputField-COQOgqBy.js";import{A as g}from"./WarningIcon-DSaUQRF0.js";import"./EditIcon-BarJNwgW.js";import"./LinkIcon-DxnDj71h.js";import"./SvgIcon-DgPANJTo.js";import{B as s}from"./Button-XD4BQnZC.js";import"./index-eOQoo3sK.js";import"./index-dIKOytT1.js";import"./ControlledTextField-Dxj0VxPy.js";import"./TextField-ifwCBnOs.js";import"./FormControl-CtU1ru_y.js";import"./FormControl-BW8ARzgi.js";import"./styled-DaAyEikA.js";import"./utils-DoM3o7-Q.js";import"./useFormControl-f2Zb6bR-.js";import"./isMuiElement-DAcuSkv2.js";import"./FormHelperText-0C2Da3IP.js";import"./FormHelperText-h5eDLKOl.js";import"./formControlState-Dq1zat_P.js";import"./Input-CEgvW9FL.js";import"./createSvgIcon-3kI-rNei.js";import"./createSvgIcon-DWxpDd4T.js";import"./SvgIcon-d6V0mnb4.js";import"./useForkRef-BDoLG09A.js";import"./createChainedFunction-BO_9K8Jh.js";import"./ownerWindow-BN2rbQ_G.js";import"./ownerDocument-DW-IO8s5.js";import"./useTimeout-B4b6mSVs.js";import"./useId-BkqTTtmk.js";import"./useControlled-1Y2rT-1r.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./InputAdornment-mWN1sDOu.js";import"./isHostComponent-DVu5iVWx.js";import"./Typography-n3eyoqZV.js";import"./InputLabel-G3r7xtE-.js";import"./InputLabel-B0NhuLFQ.js";import"./FormLabel-Ca9udkQO.js";import"./Select-D6nlqWyC.js";import"./react-is.production.min-DUDD-a5e.js";import"./Menu-CnssX2u1.js";import"./Popover-B7dHjqFW.js";import"./Modal-_7pSkSOU.js";import"./Fade-Baf6ytQl.js";import"./useTheme-CYpYpbD_.js";import"./utils-Dh94M0rq.js";import"./TransitionGroupContext-xAci1nHd.js";import"./index-CmOK7BR8.js";import"./getScrollbarSize-Bqq2hMjQ.js";import"./mergeSlotProps-Dc5z_XIy.js";import"./useSlotProps-DeMrnH46.js";import"./Portal-3LY7w8wx.js";import"./Paper-B6pP1Hjl.js";import"./Grow-CF8DuDB2.js";import"./MenuList-CUm--JsH.js";import"./List-B5csL-18.js";import"./ListContext-BMbj8Y86.js";import"./InputAdornmentButtonText-7cjbxGH9.js";import"./InputAdornmentButton-By8KmxJo.js";import"./IconButton-BSilU2Vk.js";import"./IconButton-BRjw76_K.js";import"./ButtonBase-gXIT4mbS.js";import"./Tooltip-CSQNJ7MT.js";import"./Button-BYmqNiby.js";const St={title:"Michael Pflueger Portfolio/UserInviteInputField",tags:["autodocs"],parameters:{docs:{description:{component:"An input field for inviting new users to our app."}}},component:l},i={render:()=>{const[e,m]=o.useState(""),[r,n]=o.useState(!1),v=o.useCallback(d=>{m(d)},[]);return t.jsxs(u,{children:[t.jsx("div",{style:{height:"2rem"},children:r&&t.jsx(g,{style:{cursor:"pointer"},onClick:()=>{n(!1)}})}),t.jsx("form",{children:t.jsx(l,{currentUserEmails:["abc@example.com","abc@gumband.com"],activeEmail:e,setActiveEmail:v,isInviteActive:r,onInvite:()=>{n(!0)}})}),t.jsxs("div",{style:{color:"grey",margin:"1rem 0"},children:["Existing users (for testing):",t.jsx("div",{style:{marginTop:".5rem",paddingLeft:"1rem"},children:"abc@example.com,"}),t.jsx("div",{style:{paddingLeft:"1rem"},children:"abc@gumband.com"})]}),r&&t.jsxs(t.Fragment,{children:[t.jsxs(s,{onClick:()=>{n(!1),m("")},children:[" ","Cancel"]}),t.jsx("span",{style:{margin:"0 .25rem"}}),t.jsx(s,{variant:"secondary",onClick:()=>{alert(`Inviting ${e}`)},disabled:!e,children:"Invite"})]})]})}};var a,p,c;i.parameters={...i.parameters,docs:{...(a=i.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => {
    const [activeEmail, setActiveEmail] = useState<string>('');
    const [isInviteActive, setIsInviteActive] = useState<boolean>(false);
    const handleSetActiveEmail = useCallback((email: string) => {
      setActiveEmail(email);
    }, []);
    return <ThemeProviderWrapper>
        <div style={{
        height: '2rem'
      }}>
          {isInviteActive && <ArrowBackIcon style={{
          cursor: 'pointer'
        }} onClick={() => {
          setIsInviteActive(false);
        }} />}
        </div>
        <form>
          <UserInviteInputField currentUserEmails={['abc@example.com', 'abc@gumband.com']} activeEmail={activeEmail} setActiveEmail={handleSetActiveEmail} isInviteActive={isInviteActive} onInvite={() => {
          setIsInviteActive(true);
        }} />
        </form>
        <div style={{
        color: 'grey',
        margin: '1rem 0'
      }}>
          Existing users (for testing):
          <div style={{
          marginTop: '.5rem',
          paddingLeft: '1rem'
        }}>
            abc@example.com,
          </div>
          <div style={{
          paddingLeft: '1rem'
        }}>abc@gumband.com</div>
        </div>
        {isInviteActive && <>
            <Button onClick={() => {
          setIsInviteActive(false);
          setActiveEmail('');
        }}>
              {' '}
              Cancel
            </Button>
            <span style={{
          margin: '0 .25rem'
        }} />
            <Button variant='secondary' onClick={() => {
          // eslint-disable-next-line no-alert
          alert(\`Inviting \${activeEmail}\`);
        }} disabled={!activeEmail}>
              Invite
            </Button>
          </>}
      </ThemeProviderWrapper>;
  }
}`,...(c=(p=i.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};const Tt=["Default"];export{i as Default,Tt as __namedExportsOrder,St as default};
