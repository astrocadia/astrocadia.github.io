import{j as e}from"./jsx-runtime-4WDyTGeM.js";import{T as a,d as n}from"./Tab-tf68Ss10.js";import{c as j}from"./index-eOQoo3sK.js";import{r as Z}from"./index-Dl6G-zuu.js";import{u as $}from"./useMobileMediaQuery-DDszdcix.js";import{S as ee}from"./SheetTabs-BSckzjl7.js";import{S as ae}from"./StandardTabs-D3AvY6Sh.js";import{T as r}from"./ThemeProviderWrapper-Be5RUURM.js";import"./createSvgIcon-CBDqugwZ.js";import"./createSvgIcon-D7FplSTg.js";import"./SvgIcon-DROc5w4B.js";import"./styled-Dt2_JBRt.js";import"./useForkRef-BDoLG09A.js";import"./createChainedFunction-BO_9K8Jh.js";import"./ownerWindow-BN2rbQ_G.js";import"./ownerDocument-DW-IO8s5.js";import"./isMuiElement-DAcuSkv2.js";import"./useTimeout-B4b6mSVs.js";import"./useId-BkqTTtmk.js";import"./useControlled-1Y2rT-1r.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./index-Bu4DXql-.js";import"./Dot-B-sjopOf.js";import"./Tab-DNWywxxF.js";import"./ButtonBase-Cp5BTdG6.js";import"./TransitionGroupContext-xAci1nHd.js";import"./useMediaQuery-BI_VLzxJ.js";import"./Sheet-CLlLO5DQ.js";import"./useTheme-DLZNzqMo.js";import"./Modal-PRNVlI3H.js";import"./Fade-u7WpI_Fx.js";import"./utils-CzoQ7LGy.js";import"./index-CmOK7BR8.js";import"./getScrollbarSize-Bqq2hMjQ.js";import"./mergeSlotProps-D2P12luN.js";import"./isHostComponent-DVu5iVWx.js";import"./useSlotProps-CP3WIws3.js";import"./Portal-3LY7w8wx.js";import"./Paper-Dxqu9lYo.js";import"./Slide-DZCuTsi7.js";import"./TabDropdown-D8QYDNs0.js";import"./useToggle-B4o7u8Ia.js";import"./Tabs-CyjUKURl.js";import"./react-is.production.min-DUDD-a5e.js";const l=({children:h,className:T,sheet:v,...f})=>{const x=$(),y=Z.useMemo(()=>v===void 0?x:v,[v,x]);return e.jsxs(e.Fragment,{children:[!y&&e.jsx(ae,{className:j(T,"Tabs"),...f,children:h}),y&&e.jsx(ee,{className:j(T,"Tabs"),...f,children:h})]})};try{l.displayName="Tabs",l.__docgenInfo={description:"",displayName:"Tabs",props:{sheet:{defaultValue:null,description:"",name:"sheet",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"(Partial<TabsClasses> & Partial<ClassNameMap<never>>)"}},children:{defaultValue:null,description:"The content of the component.",name:"children",required:!1,type:{name:"ReactNode"}},sx:{defaultValue:null,description:"The system prop that allows defining system overrides as well as additional CSS styles.",name:"sx",required:!1,type:{name:"SxProps<Theme>"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},"aria-label":{defaultValue:null,description:"The label for the Tabs as a string.",name:"aria-label",required:!1,type:{name:"string"}},"aria-labelledby":{defaultValue:null,description:"An id or list of ids separated by a space that label the Tabs.",name:"aria-labelledby",required:!1,type:{name:"string"}},onChange:{defaultValue:null,description:`Callback fired when the value changes.
@param event The event source of the callback. **Warning**: This is a generic event not a change event.
@param value We default to the index of the child (number)`,name:"onChange",required:!1,type:{name:"((event: SyntheticEvent<Element, Event>, value: any) => void)"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}},action:{defaultValue:null,description:"Callback fired when the component mounts.\nThis is useful when you want to trigger an action programmatically.\nIt supports two actions: `updateIndicator()` and `updateScrollButtons()`\n@param actions This object contains all possible actions\nthat can be triggered programmatically.",name:"action",required:!1,type:{name:"Ref<TabsActions>"}},value:{defaultValue:null,description:"The value of the currently selected `Tab`.\nIf you don't want any selected `Tab`, you can set this prop to `false`.",name:"value",required:!1,type:{name:"any"}},slotProps:{defaultValue:{value:"{}"},description:`The extra props for the slot components.
You can override the existing props or add new ones.`,name:"slotProps",required:!1,type:{name:'{ startScrollButtonIcon?: SlotComponentProps<OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }, TabsStartScrollButtonIconSlotPropsOverrides, TabsOwnerState>; endScrollButtonIcon?: SlotComponentProps<...>; } | undefined'}},slots:{defaultValue:{value:"{}"},description:"The components used for each slot inside.",name:"slots",required:!1,type:{name:"{ StartScrollButtonIcon?: ElementType<any, keyof IntrinsicElements>; EndScrollButtonIcon?: ElementType<any, keyof IntrinsicElements>; } | undefined"}},orientation:{defaultValue:{value:"'horizontal'"},description:"The component orientation (layout flow direction).",name:"orientation",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},allowScrollButtonsMobile:{defaultValue:{value:"false"},description:"If `true`, the scroll buttons aren't forced hidden on mobile.\nBy default the scroll buttons are hidden on mobile and takes precedence over `scrollButtons`.",name:"allowScrollButtonsMobile",required:!1,type:{name:"boolean"}},centered:{defaultValue:{value:"false"},description:"If `true`, the tabs are centered.\nThis prop is intended for large views.",name:"centered",required:!1,type:{name:"boolean"}},ScrollButtonComponent:{defaultValue:{value:"TabScrollButton"},description:"The component used to render the scroll buttons.",name:"ScrollButtonComponent",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}},scrollButtons:{defaultValue:{value:"'auto'"},description:"Determine behavior of scroll buttons when tabs are set to scroll:\n\n- `auto` will only present them when not all the items are visible.\n- `true` will always present them.\n- `false` will never present them.\n\nBy default the scroll buttons are hidden on mobile.\nThis behavior can be disabled with `allowScrollButtonsMobile`.",name:"scrollButtons",required:!1,type:{name:'boolean | "auto"'}},selectionFollowsFocus:{defaultValue:null,description:"If `true` the selected tab changes on focus. Otherwise it only\nchanges on activation.",name:"selectionFollowsFocus",required:!1,type:{name:"boolean"}},TabScrollButtonProps:{defaultValue:{value:"{}"},description:"Props applied to the [`TabScrollButton`](/material-ui/api/tab-scroll-button/) element.",name:"TabScrollButtonProps",required:!1,type:{name:"Partial<TabScrollButtonProps>"}},textColor:{defaultValue:{value:"'primary'"},description:"Determines the color of the `Tab`.",name:"textColor",required:!1,type:{name:"enum",value:[{value:'"inherit"'},{value:'"primary"'},{value:'"secondary"'}]}},visibleScrollbar:{defaultValue:{value:"false"},description:"If `true`, the scrollbar is visible. It can be useful when displaying\na long vertical list of tabs.",name:"visibleScrollbar",required:!1,type:{name:"boolean"}}}}}catch{}const Ye={title:"Design System/Composite Components/Tabs",tags:["autodocs"],component:l},t={render:()=>e.jsx(r,{children:e.jsx("div",{style:{display:"flex",gap:10},children:e.jsxs(l,{value:0,children:[e.jsx(a,{label:"Account"}),e.jsx(a,{label:"Account",icon:e.jsx(n,{})}),e.jsx(a,{label:"Disabled",disabled:!0}),e.jsx(a,{label:"Disabled with Icon",icon:e.jsx(n,{}),disabled:!0})]})})})},o={render:()=>e.jsx(r,{children:e.jsx("div",{style:{display:"flex",gap:10},children:e.jsxs(l,{value:1,children:[e.jsx(a,{label:"Account"}),e.jsx(a,{label:"Account",icon:e.jsx(n,{})}),e.jsx(a,{label:"Disabled",disabled:!0}),e.jsx(a,{label:"Disabled with Icon",icon:e.jsx(n,{}),disabled:!0})]})})})},s={render:()=>e.jsx(r,{children:e.jsx("div",{style:{display:"flex",gap:10},children:e.jsxs(l,{value:2,children:[e.jsx(a,{label:"Account"}),e.jsx(a,{label:"Account",icon:e.jsx(n,{})}),e.jsx(a,{label:"Disabled",icon:e.jsx(n,{}),disabled:!0}),e.jsx(a,{label:"Disabled with Icon",icon:e.jsx(n,{}),disabled:!0})]})})})},i={render:()=>e.jsx(r,{children:e.jsx("div",{style:{display:"flex",gap:10},children:e.jsxs(l,{value:3,children:[e.jsx(a,{label:"Account"}),e.jsx(a,{label:"Account",icon:e.jsx(n,{})}),e.jsx(a,{label:"Disabled",icon:e.jsx(n,{}),disabled:!0}),e.jsx(a,{label:"Disabled with Icon",icon:e.jsx(n,{}),disabled:!0})]})})})},c={render:()=>e.jsx(r,{children:e.jsx("div",{style:{display:"flex",gap:10},children:e.jsx(l,{})})})},d={render:()=>e.jsx(r,{children:e.jsx("div",{style:{display:"flex",gap:10},children:e.jsxs(l,{value:0,orientation:"vertical",children:[e.jsx(a,{label:"Account"}),e.jsx(a,{label:"Account",icon:e.jsx(n,{})}),e.jsx(a,{label:"Disabled",disabled:!0}),e.jsx(a,{label:"Disabled with Icon",icon:e.jsx(n,{}),disabled:!0})]})})})},u={render:()=>e.jsx(r,{children:e.jsx("div",{style:{display:"flex",gap:10},children:e.jsxs(l,{value:1,orientation:"vertical",children:[e.jsx(a,{label:"Account"}),e.jsx(a,{label:"Account",icon:e.jsx(n,{})}),e.jsx(a,{label:"Disabled",disabled:!0}),e.jsx(a,{label:"Disabled with Icon",icon:e.jsx(n,{}),disabled:!0})]})})})},p={render:()=>e.jsx(r,{children:e.jsx("div",{style:{display:"flex",gap:10},children:e.jsxs(l,{value:2,orientation:"vertical",children:[e.jsx(a,{label:"Account"}),e.jsx(a,{label:"Account",icon:e.jsx(n,{})}),e.jsx(a,{label:"Disabled",icon:e.jsx(n,{}),disabled:!0}),e.jsx(a,{label:"Disabled with Icon",icon:e.jsx(n,{}),disabled:!0})]})})})},b={render:()=>e.jsx(r,{children:e.jsx("div",{style:{display:"flex",gap:10},children:e.jsxs(l,{value:3,orientation:"vertical",children:[e.jsx(a,{label:"Account"}),e.jsx(a,{label:"Account",icon:e.jsx(n,{})}),e.jsx(a,{label:"Disabled",icon:e.jsx(n,{}),disabled:!0}),e.jsx(a,{label:"Disabled with Icon",icon:e.jsx(n,{}),disabled:!0})]})})})},m={render:()=>e.jsx(r,{children:e.jsx("div",{style:{display:"flex",gap:10},children:e.jsx(l,{orientation:"vertical"})})})};var I,g,S;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    return <ThemeProviderWrapper>
        <div style={{
        display: 'flex',
        gap: 10
      }}>
          <Tabs value={0}>
            <Tab label='Account' />
            <Tab label='Account' icon={<AccountCircleIcon />} />
            <Tab label='Disabled' disabled />
            <Tab label='Disabled with Icon' icon={<AccountCircleIcon />} disabled />
          </Tabs>
        </div>
      </ThemeProviderWrapper>;
  }
}`,...(S=(g=t.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};var A,D,w;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => {
    return <ThemeProviderWrapper>
        <div style={{
        display: 'flex',
        gap: 10
      }}>
          <Tabs value={1}>
            <Tab label='Account' />
            <Tab label='Account' icon={<AccountCircleIcon />} />
            <Tab label='Disabled' disabled />
            <Tab label='Disabled with Icon' icon={<AccountCircleIcon />} disabled />
          </Tabs>
        </div>
      </ThemeProviderWrapper>;
  }
}`,...(w=(D=o.parameters)==null?void 0:D.docs)==null?void 0:w.source}}};var C,P,V;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <div style={{
      display: 'flex',
      gap: 10
    }}>
        <Tabs value={2}>
          <Tab label='Account' />
          <Tab label='Account' icon={<AccountCircleIcon />} />
          <Tab label='Disabled' icon={<AccountCircleIcon />} disabled />
          <Tab label='Disabled with Icon' icon={<AccountCircleIcon />} disabled />
        </Tabs>
      </div>
    </ThemeProviderWrapper>
}`,...(V=(P=s.parameters)==null?void 0:P.docs)==null?void 0:V.source}}};var q,W,B;i.parameters={...i.parameters,docs:{...(q=i.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <div style={{
      display: 'flex',
      gap: 10
    }}>
        <Tabs value={3}>
          <Tab label='Account' />
          <Tab label='Account' icon={<AccountCircleIcon />} />
          <Tab label='Disabled' icon={<AccountCircleIcon />} disabled />
          <Tab label='Disabled with Icon' icon={<AccountCircleIcon />} disabled />
        </Tabs>
      </div>
    </ThemeProviderWrapper>
}`,...(B=(W=i.parameters)==null?void 0:W.docs)==null?void 0:B.source}}};var E,_,M;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <div style={{
      display: 'flex',
      gap: 10
    }}>
        <Tabs />
      </div>
    </ThemeProviderWrapper>
}`,...(M=(_=c.parameters)==null?void 0:_.docs)==null?void 0:M.source}}};var N,k,O;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => {
    return <ThemeProviderWrapper>
        <div style={{
        display: 'flex',
        gap: 10
      }}>
          <Tabs value={0} orientation='vertical'>
            <Tab label='Account' />
            <Tab label='Account' icon={<AccountCircleIcon />} />
            <Tab label='Disabled' disabled />
            <Tab label='Disabled with Icon' icon={<AccountCircleIcon />} disabled />
          </Tabs>
        </div>
      </ThemeProviderWrapper>;
  }
}`,...(O=(k=d.parameters)==null?void 0:k.docs)==null?void 0:O.source}}};var F,R,z;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => {
    return <ThemeProviderWrapper>
        <div style={{
        display: 'flex',
        gap: 10
      }}>
          <Tabs value={1} orientation='vertical'>
            <Tab label='Account' />
            <Tab label='Account' icon={<AccountCircleIcon />} />
            <Tab label='Disabled' disabled />
            <Tab label='Disabled with Icon' icon={<AccountCircleIcon />} disabled />
          </Tabs>
        </div>
      </ThemeProviderWrapper>;
  }
}`,...(z=(R=u.parameters)==null?void 0:R.docs)==null?void 0:z.source}}};var H,L,Q;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <div style={{
      display: 'flex',
      gap: 10
    }}>
        <Tabs value={2} orientation='vertical'>
          <Tab label='Account' />
          <Tab label='Account' icon={<AccountCircleIcon />} />
          <Tab label='Disabled' icon={<AccountCircleIcon />} disabled />
          <Tab label='Disabled with Icon' icon={<AccountCircleIcon />} disabled />
        </Tabs>
      </div>
    </ThemeProviderWrapper>
}`,...(Q=(L=p.parameters)==null?void 0:L.docs)==null?void 0:Q.source}}};var Y,G,J;b.parameters={...b.parameters,docs:{...(Y=b.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <div style={{
      display: 'flex',
      gap: 10
    }}>
        <Tabs value={3} orientation='vertical'>
          <Tab label='Account' />
          <Tab label='Account' icon={<AccountCircleIcon />} />
          <Tab label='Disabled' icon={<AccountCircleIcon />} disabled />
          <Tab label='Disabled with Icon' icon={<AccountCircleIcon />} disabled />
        </Tabs>
      </div>
    </ThemeProviderWrapper>
}`,...(J=(G=b.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,U,X;m.parameters={...m.parameters,docs:{...(K=m.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <div style={{
      display: 'flex',
      gap: 10
    }}>
        <Tabs orientation='vertical' />
      </div>
    </ThemeProviderWrapper>
}`,...(X=(U=m.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};const Ge=["Default","IconTabSelected","DisabledTabSelected","DisabledIconTabSelected","Empty","VerticalDefault","VerticalIconTabSelected","VerticalDisabledTabSelected","VerticalDisabledIconTabSelected","VerticalEmpty"];export{t as Default,i as DisabledIconTabSelected,s as DisabledTabSelected,c as Empty,o as IconTabSelected,d as VerticalDefault,b as VerticalDisabledIconTabSelected,p as VerticalDisabledTabSelected,m as VerticalEmpty,u as VerticalIconTabSelected,Ge as __namedExportsOrder,Ye as default};
