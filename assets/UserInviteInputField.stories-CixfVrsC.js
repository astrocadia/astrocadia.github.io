import{j as t}from"./jsx-runtime-4WDyTGeM.js";import{r as o}from"./index-Dl6G-zuu.js";import{T as u}from"./ThemeProviderWrapper-Be5RUURM.js";import{U as l}from"./UserInviteInputField-CFuwBBje.js";import{A as g}from"./WarningIcon-6HpPPylF.js";import"./EditIcon-bNkpr5Ld.js";import"./LinkIcon-CKhuJxKk.js";import"./SvgIcon-76a5Fjoi.js";import{B as s}from"./Button-CxrygEYf.js";import"./index-eOQoo3sK.js";import"./index-dIKOytT1.js";import"./ControlledTextField-BIRBLCqk.js";import"./TextField-H_O97xAh.js";import"./FormControl-BB9KS_Cj.js";import"./FormControl-CEdSnwwK.js";import"./styled-Dt2_JBRt.js";import"./utils-DoM3o7-Q.js";import"./useFormControl-f2Zb6bR-.js";import"./isMuiElement-DAcuSkv2.js";import"./FormHelperText-DeZFn-fQ.js";import"./FormHelperText-B-lqvv-N.js";import"./formControlState-Dq1zat_P.js";import"./Input-KeXyPRhr.js";import"./createSvgIcon-CBDqugwZ.js";import"./createSvgIcon-D7FplSTg.js";import"./SvgIcon-DROc5w4B.js";import"./useForkRef-BDoLG09A.js";import"./createChainedFunction-BO_9K8Jh.js";import"./ownerWindow-BN2rbQ_G.js";import"./ownerDocument-DW-IO8s5.js";import"./useTimeout-B4b6mSVs.js";import"./useId-BkqTTtmk.js";import"./useControlled-1Y2rT-1r.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./InputAdornment-B5oVS-sc.js";import"./isHostComponent-DVu5iVWx.js";import"./Typography-8CCtzQ9L.js";import"./InputLabel-DM-4l14M.js";import"./InputLabel-CoHzGKZp.js";import"./FormLabel-B9PyWtWF.js";import"./Select-B-hvHM5Y.js";import"./react-is.production.min-DUDD-a5e.js";import"./Menu-BhnrG3vD.js";import"./Popover-Db_KuLdV.js";import"./Modal-PRNVlI3H.js";import"./Fade-u7WpI_Fx.js";import"./useTheme-DLZNzqMo.js";import"./utils-CzoQ7LGy.js";import"./TransitionGroupContext-xAci1nHd.js";import"./index-CmOK7BR8.js";import"./getScrollbarSize-Bqq2hMjQ.js";import"./mergeSlotProps-D2P12luN.js";import"./useSlotProps-CP3WIws3.js";import"./Portal-3LY7w8wx.js";import"./Paper-Dxqu9lYo.js";import"./Grow-BnLMXtPt.js";import"./MenuList-CRTvLIIN.js";import"./List-C41wlV70.js";import"./ListContext-BMbj8Y86.js";import"./InputAdornmentButtonText-CEtyyzTv.js";import"./InputAdornmentButton-CL6prMWf.js";import"./IconButton-DYHDsDKu.js";import"./IconButton-Djqk-I0k.js";import"./ButtonBase-Cp5BTdG6.js";import"./Tooltip-B5Gmbdco.js";import"./Button-C5OdypjM.js";const Bt={title:"Design System/Composite Components/UserInviteInputField",tags:["autodocs"],component:l},i={render:()=>{const[e,m]=o.useState(""),[r,n]=o.useState(!1),v=o.useCallback(d=>{m(d)},[]);return t.jsxs(u,{children:[t.jsx("div",{style:{height:"2rem"},children:r&&t.jsx(g,{style:{cursor:"pointer"},onClick:()=>{n(!1)}})}),t.jsx("form",{children:t.jsx(l,{currentUserEmails:["abc@example.com","abc@gumband.com"],activeEmail:e,setActiveEmail:v,isInviteActive:r,onInvite:()=>{n(!0)}})}),t.jsxs("div",{style:{color:"grey",margin:"1rem 0"},children:["Existing users (for testing):",t.jsx("div",{style:{marginTop:".5rem",paddingLeft:"1rem"},children:"abc@example.com,"}),t.jsx("div",{style:{paddingLeft:"1rem"},children:"abc@gumband.com"})]}),r&&t.jsxs(t.Fragment,{children:[t.jsxs(s,{onClick:()=>{n(!1),m("")},children:[" ","Cancel"]}),t.jsx("span",{style:{margin:"0 .25rem"}}),t.jsx(s,{variant:"secondary",onClick:()=>{alert(`Inviting ${e}`)},disabled:!e,children:"Invite"})]})]})}};var a,p,c;i.parameters={...i.parameters,docs:{...(a=i.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
}`,...(c=(p=i.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};const Tt=["Default"];export{i as Default,Tt as __namedExportsOrder,Bt as default};
