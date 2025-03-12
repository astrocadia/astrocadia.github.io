import{j as t}from"./jsx-runtime-4WDyTGeM.js";import{r as S}from"./index-Dl6G-zuu.js";import{T as P}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{M as r}from"./MainPanelCoplanarSubpageBlockCheckbox-BZ_0p_QH.js";import"./index-eOQoo3sK.js";import"./Card-D3c9tIK2.js";import"./styled-DaAyEikA.js";import"./Paper-B6pP1Hjl.js";import"./Checkbox-SjERWzSA.js";import"./WarningIcon-hyuTG_uV.js";import"./SvgIcon-DKK2_66P.js";import"./SvgIcon-d6V0mnb4.js";import"./EditIcon-DQffeilE.js";import"./LinkIcon-CTu8-jnD.js";import"./SwitchBase-bjyHYJtY.js";import"./useFormControl-f2Zb6bR-.js";import"./ButtonBase-gXIT4mbS.js";import"./useTimeout-B4b6mSVs.js";import"./TransitionGroupContext-xAci1nHd.js";import"./useForkRef-BDoLG09A.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./useControlled-1Y2rT-1r.js";import"./createSvgIcon-DWxpDd4T.js";import"./eventHelpers-DNy-jsQX.js";import"./MainPanelCoplanarSubpageCardHeader-BOmt4s70.js";import"./Badge-B5h4WNES.js";import"./CountBadge-3ANCZLmo.js";import"./WarningIconBadge-DYC2RgsF.js";import"./CardContent-dRcBLWpc.js";const X={title:"Design System/Composite Components/MainPanelCoplanar/MainPanelCoplanarSubpageBlockCheckbox",decorators:[e=>t.jsx(P,{children:t.jsx(e,{})})],tags:["autodocs"],component:r,args:{title:"MainPanelCoplanarSubpageBlockCheckbox"},parameters:{design:{type:"figma",url:"https://www.figma.com/design/ObQmdiOj0v670OEemKDmhU/Exhibit-Settings?m=auto&node-id=876-25985&t=Yq1GAbmbn7z87WOc-1"}}},o={render:()=>{const[e,C]=S.useState(!1);return t.jsx(r,{title:"MainPanelCoplanarSubpageBlockCheckbox",checked:e,onClick:()=>C(!e)})}},a={args:{subtitle:"Example Description"}},i={args:{title:"Checkbox Title with a long title that will cause the text to wrap onto multiple lines if I do it right. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent viverra ante id tellus commodo dapibus. Nam eu pretium lorem, luctus venenatis orci."}},s={render:e=>t.jsxs(t.Fragment,{children:[t.jsx(r,{...e}),t.jsx(r,{checked:!0,...e}),t.jsx(r,{disabled:!0,...e}),t.jsx(r,{checked:!0,disabled:!0,...e})]})};var n,c,p;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => {
    const [checked, setChecked] = useState(false);
    return <MainPanelCoplanarSubpageBlockCheckbox title='MainPanelCoplanarSubpageBlockCheckbox' checked={checked} onClick={() => setChecked(!checked)} />;
  }
}`,...(p=(c=o.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var l,m,d;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    subtitle: 'Example Description'
  }
}`,...(d=(m=a.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var u,h,g;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    title: 'Checkbox Title with a long title that will cause the text to wrap onto multiple lines if I do it right. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent viverra ante id tellus commodo dapibus. Nam eu pretium lorem, luctus venenatis orci.'
  }
}`,...(g=(h=i.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var b,k,x;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: props => {
    return <>
        <MainPanelCoplanarSubpageBlockCheckbox {...props} />
        <MainPanelCoplanarSubpageBlockCheckbox checked {...props} />
        <MainPanelCoplanarSubpageBlockCheckbox disabled {...props} />
        <MainPanelCoplanarSubpageBlockCheckbox checked disabled {...props} />
      </>;
  }
}`,...(x=(k=s.parameters)==null?void 0:k.docs)==null?void 0:x.source}}};const Z=["Default","WithDescription","LongTitle","Siblings"];export{o as Default,i as LongTitle,s as Siblings,a as WithDescription,Z as __namedExportsOrder,X as default};
