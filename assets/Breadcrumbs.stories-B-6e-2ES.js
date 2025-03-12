import{j as r}from"./jsx-runtime-4WDyTGeM.js";import{T as s}from"./ThemeProviderWrapper-Be5RUURM.js";import{B as c,a as d}from"./BreadcrumbItem-BA-1pkmA.js";import{R as t}from"./RouteWrapper-CKCgQWge.js";import"./index-Dl6G-zuu.js";import"./index-eOQoo3sK.js";import"./WarningIcon-DZ-0i3Yx.js";import"./SvgIcon-eIfT25mh.js";import"./SvgIcon-DROc5w4B.js";import"./styled-Dt2_JBRt.js";import"./EditIcon-C_DteFoa.js";import"./LinkIcon-8pN4OFct.js";import"./react-is.production.min-DUDD-a5e.js";import"./createSvgIcon-D7FplSTg.js";import"./ButtonBase-Cp5BTdG6.js";import"./useTimeout-B4b6mSVs.js";import"./TransitionGroupContext-xAci1nHd.js";import"./useForkRef-BDoLG09A.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./Typography-8CCtzQ9L.js";import"./useSlotProps-CP3WIws3.js";import"./mergeSlotProps-D2P12luN.js";import"./isHostComponent-DVu5iVWx.js";import"./eventHelpers-DNy-jsQX.js";import"./index-CmOK7BR8.js";import"./index-DhieATjG.js";const cr={title:"Design System/Components/Breadcrumbs",tags:["autodocs"],component:c},l={render:()=>{const e=["All","Account","Settings"],a=()=>{alert("breadcrumb clicked")};return r.jsx(s,{children:r.jsx(t,{children:r.jsx("div",{style:{backgroundColor:"var(--background-workspace-color)"},children:e&&e.length!==0&&r.jsx(c,{children:e.map((n,o)=>r.jsx(d,{label:n,onClick:o===e.length-1?void 0:()=>{a()}},n))})})})})}},i={render:()=>{const e=["All","Account"],a=()=>{alert("breadcrumb clicked")};return r.jsx(s,{children:r.jsx(t,{children:r.jsx("div",{style:{backgroundColor:"var(--background-workspace-color)"},children:e&&e.length!==0&&r.jsx(c,{children:e.map((n,o)=>r.jsx(d,{label:n,onClick:o===e.length-1?void 0:()=>{a()}},n))})})})})}},b={render:()=>{const e=["All","Account","Settings","Security & Privacy"],a=()=>{alert("breadcrumb clicked")};return r.jsx(s,{children:r.jsx(t,{children:r.jsx("div",{style:{backgroundColor:"var(--background-workspace-color)"},children:e&&e.length!==0&&r.jsx(c,{maxItems:3,itemsAfterCollapse:2,children:e.map((n,o)=>r.jsx(d,{label:n,onClick:o===e.length-1?void 0:()=>{a()}},n))})})})})}},m={render:()=>{const e=["All","Kinds","Of","Different","Breadcrumbs","That","Are","Displayed","In","The","Breadcrumbs","Component"],a=()=>{alert("breadcrumb clicked")};return r.jsx(s,{children:r.jsx(t,{children:r.jsx("div",{style:{backgroundColor:"var(--background-workspace-color)"},children:e&&e.length!==0&&r.jsx(c,{maxItems:3,itemsAfterCollapse:2,children:e.map((n,o)=>r.jsx(d,{label:n,onClick:o===e.length-1?void 0:()=>{a()}},n))})})})})}},u={render:()=>{const e=["This is a long breadcrumb","Here is another very long breadcrumb","This is another long breadcrumb","Thisisyetanotherlongverylongbreadcrumb"],a=()=>{alert("breadcrumb clicked")};return r.jsx(s,{children:r.jsx(t,{children:r.jsx("div",{style:{backgroundColor:"var(--background-workspace-color)"},children:e&&e.length!==0&&r.jsx(c,{maxItems:3,itemsAfterCollapse:2,children:e.map((n,o)=>r.jsx(d,{label:n,onClick:o===e.length-1?void 0:()=>{a()}},n))})})})})}},p={render:()=>{const e=["Disabling","expand does not seem","to be possible for","MUI","Breadcrumbs"],a=()=>{alert("breadcrumb clicked")};return r.jsx(s,{children:r.jsx(t,{children:r.jsx("div",{style:{backgroundColor:"var(--background-workspace-color)"},children:e&&e.length!==0&&r.jsx(c,{disabled:!0,maxItems:3,itemsAfterCollapse:2,children:e.map((n,o)=>r.jsx(d,{label:n,onClick:o===e.length-1?void 0:()=>{a()}},n))})})})})}};var k,g,h;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => {
    const breadcrumbs: Array<string> = ['All', 'Account', 'Settings'];
    const onClick = () => {
      // eslint-disable-next-line no-alert
      alert('breadcrumb clicked');
    };
    return <ThemeProviderWrapper>
        <RouteWrapper>
          <div style={{
          backgroundColor: 'var(--background-workspace-color)'
        }}>
            {breadcrumbs && breadcrumbs.length !== 0 && <Breadcrumbs>
                {breadcrumbs.map((breadcrumb, index) => <BreadcrumbItem key={breadcrumb} label={breadcrumb} onClick={index === breadcrumbs.length - 1 ? undefined : () => {
              onClick();
            }} />)}
              </Breadcrumbs>}
          </div>
        </RouteWrapper>
      </ThemeProviderWrapper>;
  }
}`,...(h=(g=l.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var x,v,C;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => {
    const breadcrumbs: Array<string> = ['All', 'Account'];
    const onClick = () => {
      // eslint-disable-next-line no-alert
      alert('breadcrumb clicked');
    };
    return <ThemeProviderWrapper>
        <RouteWrapper>
          <div style={{
          backgroundColor: 'var(--background-workspace-color)'
        }}>
            {breadcrumbs && breadcrumbs.length !== 0 && <Breadcrumbs>
                {breadcrumbs.map((breadcrumb, index) => <BreadcrumbItem key={breadcrumb} label={breadcrumb} onClick={index === breadcrumbs.length - 1 ? undefined : () => {
              onClick();
            }} />)}
              </Breadcrumbs>}
          </div>
        </RouteWrapper>
      </ThemeProviderWrapper>;
  }
}`,...(C=(v=i.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var y,j,A;b.parameters={...b.parameters,docs:{...(y=b.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => {
    const breadcrumbs: Array<string> = ['All', 'Account', 'Settings', 'Security & Privacy'];
    const onClick = () => {
      // eslint-disable-next-line no-alert
      alert('breadcrumb clicked');
    };
    return <ThemeProviderWrapper>
        <RouteWrapper>
          <div style={{
          backgroundColor: 'var(--background-workspace-color)'
        }}>
            {breadcrumbs && breadcrumbs.length !== 0 && <Breadcrumbs maxItems={3} itemsAfterCollapse={2}>
                {breadcrumbs.map((breadcrumb, index) => <BreadcrumbItem key={breadcrumb} label={breadcrumb} onClick={index === breadcrumbs.length - 1 ? undefined : () => {
              onClick();
            }} />)}
              </Breadcrumbs>}
          </div>
        </RouteWrapper>
      </ThemeProviderWrapper>;
  }
}`,...(A=(j=b.parameters)==null?void 0:j.docs)==null?void 0:A.source}}};var B,f,T;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const breadcrumbs: Array<string> = ['All', 'Kinds', 'Of', 'Different', 'Breadcrumbs', 'That', 'Are', 'Displayed', 'In', 'The', 'Breadcrumbs', 'Component'];
    const onClick = () => {
      // eslint-disable-next-line no-alert
      alert('breadcrumb clicked');
    };
    return <ThemeProviderWrapper>
        <RouteWrapper>
          <div style={{
          backgroundColor: 'var(--background-workspace-color)'
        }}>
            {breadcrumbs && breadcrumbs.length !== 0 && <Breadcrumbs maxItems={3} itemsAfterCollapse={2}>
                {breadcrumbs.map((breadcrumb, index) => <BreadcrumbItem key={breadcrumb} label={breadcrumb} onClick={index === breadcrumbs.length - 1 ? undefined : () => {
              onClick();
            }} />)}
              </Breadcrumbs>}
          </div>
        </RouteWrapper>
      </ThemeProviderWrapper>;
  }
}`,...(T=(f=m.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var W,I,P;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => {
    const breadcrumbs: Array<string> = ['This is a long breadcrumb', 'Here is another very long breadcrumb', 'This is another long breadcrumb', 'Thisisyetanotherlongverylongbreadcrumb'];
    const onClick = () => {
      // eslint-disable-next-line no-alert
      alert('breadcrumb clicked');
    };
    return <ThemeProviderWrapper>
        <RouteWrapper>
          <div style={{
          backgroundColor: 'var(--background-workspace-color)'
        }}>
            {breadcrumbs && breadcrumbs.length !== 0 && <Breadcrumbs maxItems={3} itemsAfterCollapse={2}>
                {breadcrumbs.map((breadcrumb, index) => <BreadcrumbItem key={breadcrumb} label={breadcrumb} onClick={index === breadcrumbs.length - 1 ? undefined : () => {
              onClick();
            }} />)}
              </Breadcrumbs>}
          </div>
        </RouteWrapper>
      </ThemeProviderWrapper>;
  }
}`,...(P=(I=u.parameters)==null?void 0:I.docs)==null?void 0:P.source}}};var R,S,w;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => {
    const breadcrumbs: Array<string> = ['Disabling', 'expand does not seem', 'to be possible for', 'MUI', 'Breadcrumbs'];
    const onClick = () => {
      // eslint-disable-next-line no-alert
      alert('breadcrumb clicked');
    };
    return <ThemeProviderWrapper>
        <RouteWrapper>
          <div style={{
          backgroundColor: 'var(--background-workspace-color)'
        }}>
            {breadcrumbs && breadcrumbs.length !== 0 && <Breadcrumbs disabled maxItems={3} itemsAfterCollapse={2}>
                {breadcrumbs.map((breadcrumb, index) => <BreadcrumbItem label={breadcrumb} key={breadcrumb} onClick={index === breadcrumbs.length - 1 ? undefined : () => {
              onClick();
            }} />)}
              </Breadcrumbs>}
          </div>
        </RouteWrapper>
      </ThemeProviderWrapper>;
  }
}`,...(w=(S=p.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};const sr=["Default","OneLevel","ThreeLevel","ManyLevel","LongBreadcrumbs","Disabled"];export{l as Default,p as Disabled,u as LongBreadcrumbs,m as ManyLevel,i as OneLevel,b as ThreeLevel,sr as __namedExportsOrder,cr as default};
