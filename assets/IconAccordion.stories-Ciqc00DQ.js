import{j as o}from"./jsx-runtime-4WDyTGeM.js";import{T as C}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{D as j}from"./DetailTable-B4mQNk0z.js";import{I as e,a as h}from"./IconAccordion-CkUVGgiH.js";import{B as d}from"./Badge-B5h4WNES.js";import"./CountBadge-3ANCZLmo.js";import"./WarningIconBadge-t25aDLj8.js";import{E as m}from"./WarningIcon-DSaUQRF0.js";import"./EditIcon-BarJNwgW.js";import"./LinkIcon-DxnDj71h.js";import"./SvgIcon-DgPANJTo.js";import{C as i,a as s}from"./ConnectedIcon-CNSvJcRX.js";import"./index-Dl6G-zuu.js";import"./index-eOQoo3sK.js";import"./lang-BqISUGWn.js";import"./AccordionSummary-BvuTPOIc.js";import"./styled-DaAyEikA.js";import"./index-CmspVeCA.js";import"./react-is.production.min-DUDD-a5e.js";import"./useSlot-19y32CJk.js";import"./mergeSlotProps-Dc5z_XIy.js";import"./isHostComponent-DVu5iVWx.js";import"./useForkRef-BDoLG09A.js";import"./Paper-B6pP1Hjl.js";import"./useControlled-1Y2rT-1r.js";import"./Collapse-BkKNoJVW.js";import"./utils-Dh94M0rq.js";import"./TransitionGroupContext-xAci1nHd.js";import"./index-CmOK7BR8.js";import"./useTheme-CYpYpbD_.js";import"./useTimeout-B4b6mSVs.js";import"./ButtonBase-gXIT4mbS.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./SvgIcon-d6V0mnb4.js";const ao={title:"Design System/Composite Components/IconAccordion",tags:["autodocs"],component:e},S=[{label:"IP",value:"20.30.30.10"},{label:"MAC",value:"04:210:20:3b:92"},{label:"Version",value:"48"},{label:"Voltage",value:"4.204 V"},{label:"Temperature",value:"39.028 C"},{label:"Created",value:"2021-08-12 12:00:00 -0400"}],r=o.jsx(h,{children:o.jsx(j,{data:S})}),c={render:({icon:n=o.jsx(i,{status:s.CONNECTED}),label:l="Accordion Label",...p})=>o.jsx(C,{children:o.jsx(e,{icon:n,label:l,...p,children:r})})},t={render:({icon:n=o.jsx(i,{status:s.CONNECTED}),label:l="Accordion Label",...p})=>o.jsx(C,{children:o.jsx(e,{icon:n,label:l,...p})})},a={render:({...n})=>o.jsxs(C,{children:[o.jsx(e,{...n,icon:o.jsx(i,{status:s.DISCONNECTED}),label:"Accordion Label 1",children:r}),o.jsx(e,{...n,icon:o.jsx(i,{status:s.CONNECTED}),label:"Accordion Label 2",children:r}),o.jsx(e,{...n,icon:o.jsx(d,{Icon:m}),label:"Accordion Label 3",children:r}),o.jsx(e,{...n,icon:o.jsx(d,{Icon:m}),label:"Accordion Label No Content"}),o.jsx(e,{...n,icon:o.jsx(d,{Icon:m}),label:"Accordion Label 3",children:r})]})};var b,A,I;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: ({
    icon = <ConnectedIcon status={CONNECTED_STATUS.CONNECTED} />,
    label = 'Accordion Label',
    ...props
  }) => <ThemeProviderWrapper>
      <IconAccordion icon={icon} label={label} {...props}>
        {content}
      </IconAccordion>
    </ThemeProviderWrapper>
}`,...(I=(A=c.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var E,T,u;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: ({
    icon = <ConnectedIcon status={CONNECTED_STATUS.CONNECTED} />,
    label = 'Accordion Label',
    ...props
  }) => <ThemeProviderWrapper>
      <IconAccordion icon={icon} label={label} {...props} />
    </ThemeProviderWrapper>
}`,...(u=(T=t.parameters)==null?void 0:T.docs)==null?void 0:u.source}}};var N,x,D;a.parameters={...a.parameters,docs:{...(N=a.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: ({
    ...props
  }) => <ThemeProviderWrapper>
      <IconAccordion {...props} icon={<ConnectedIcon status={CONNECTED_STATUS.DISCONNECTED} />} label='Accordion Label 1'>
        {content}
      </IconAccordion>
      <IconAccordion {...props} icon={<ConnectedIcon status={CONNECTED_STATUS.CONNECTED} />} label='Accordion Label 2'>
        {content}
      </IconAccordion>
      <IconAccordion {...props} icon={<Badge Icon={ExhibitComponentIcon} />} label='Accordion Label 3'>
        {content}
      </IconAccordion>
      <IconAccordion {...props} icon={<Badge Icon={ExhibitComponentIcon} />} label='Accordion Label No Content' />
      <IconAccordion {...props} icon={<Badge Icon={ExhibitComponentIcon} />} label='Accordion Label 3'>
        {content}
      </IconAccordion>
    </ThemeProviderWrapper>
}`,...(D=(x=a.parameters)==null?void 0:x.docs)==null?void 0:D.source}}};const io=["Default","NoContents","Multiple"];export{c as Default,a as Multiple,t as NoContents,io as __namedExportsOrder,ao as default};
