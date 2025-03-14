import{j as r}from"./jsx-runtime-4WDyTGeM.js";import{T as s}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{B as c,a as d}from"./BreadcrumbItem-BG1KNnN0.js";import{R as t}from"./RouteWrapper-CKCgQWge.js";import"./index-Dl6G-zuu.js";import"./index-eOQoo3sK.js";import"./WarningIcon-DSaUQRF0.js";import"./SvgIcon-DgPANJTo.js";import"./SvgIcon-d6V0mnb4.js";import"./styled-DaAyEikA.js";import"./EditIcon-BarJNwgW.js";import"./LinkIcon-DxnDj71h.js";import"./react-is.production.min-DUDD-a5e.js";import"./createSvgIcon-DWxpDd4T.js";import"./ButtonBase-gXIT4mbS.js";import"./useTimeout-B4b6mSVs.js";import"./TransitionGroupContext-xAci1nHd.js";import"./useForkRef-BDoLG09A.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./Typography-n3eyoqZV.js";import"./useSlotProps-DeMrnH46.js";import"./mergeSlotProps-Dc5z_XIy.js";import"./isHostComponent-DVu5iVWx.js";import"./eventHelpers-DNy-jsQX.js";import"./index-CmOK7BR8.js";import"./index-DhieATjG.js";const cr={title:"Michael Pflueger Portfolio/Breadcrumbs",tags:["autodocs"],parameters:{docs:{description:{component:"Breadcrumbs for displaying a custom setting hierchy"}}},component:c},l={render:()=>{const e=["All","Account","Settings"],a=()=>{alert("breadcrumb clicked")};return r.jsx(s,{children:r.jsx(t,{children:r.jsx("div",{style:{backgroundColor:"var(--background-workspace-color)"},children:e&&e.length!==0&&r.jsx(c,{children:e.map((n,o)=>r.jsx(d,{label:n,onClick:o===e.length-1?void 0:()=>{a()}},n))})})})})}},i={render:()=>{const e=["All","Account"],a=()=>{alert("breadcrumb clicked")};return r.jsx(s,{children:r.jsx(t,{children:r.jsx("div",{style:{backgroundColor:"var(--background-workspace-color)"},children:e&&e.length!==0&&r.jsx(c,{children:e.map((n,o)=>r.jsx(d,{label:n,onClick:o===e.length-1?void 0:()=>{a()}},n))})})})})}},m={render:()=>{const e=["All","Account","Settings","Security & Privacy"],a=()=>{alert("breadcrumb clicked")};return r.jsx(s,{children:r.jsx(t,{children:r.jsx("div",{style:{backgroundColor:"var(--background-workspace-color)"},children:e&&e.length!==0&&r.jsx(c,{maxItems:3,itemsAfterCollapse:2,children:e.map((n,o)=>r.jsx(d,{label:n,onClick:o===e.length-1?void 0:()=>{a()}},n))})})})})}},b={render:()=>{const e=["All","Kinds","Of","Different","Breadcrumbs","That","Are","Displayed","In","The","Breadcrumbs","Component"],a=()=>{alert("breadcrumb clicked")};return r.jsx(s,{children:r.jsx(t,{children:r.jsx("div",{style:{backgroundColor:"var(--background-workspace-color)"},children:e&&e.length!==0&&r.jsx(c,{maxItems:3,itemsAfterCollapse:2,children:e.map((n,o)=>r.jsx(d,{label:n,onClick:o===e.length-1?void 0:()=>{a()}},n))})})})})}},u={render:()=>{const e=["This is a long breadcrumb","Here is another very long breadcrumb","This is another long breadcrumb","Thisisyetanotherlongverylongbreadcrumb"],a=()=>{alert("breadcrumb clicked")};return r.jsx(s,{children:r.jsx(t,{children:r.jsx("div",{style:{backgroundColor:"var(--background-workspace-color)"},children:e&&e.length!==0&&r.jsx(c,{maxItems:3,itemsAfterCollapse:2,children:e.map((n,o)=>r.jsx(d,{label:n,onClick:o===e.length-1?void 0:()=>{a()}},n))})})})})}},p={render:()=>{const e=["Disabling","expand does not seem","to be possible for","MUI","Breadcrumbs"],a=()=>{alert("breadcrumb clicked")};return r.jsx(s,{children:r.jsx(t,{children:r.jsx("div",{style:{backgroundColor:"var(--background-workspace-color)"},children:e&&e.length!==0&&r.jsx(c,{disabled:!0,maxItems:3,itemsAfterCollapse:2,children:e.map((n,o)=>r.jsx(d,{label:n,onClick:o===e.length-1?void 0:()=>{a()}},n))})})})})}};var k,g,h;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(C=(v=i.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var y,f,j;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(j=(f=m.parameters)==null?void 0:f.docs)==null?void 0:j.source}}};var B,A,T;b.parameters={...b.parameters,docs:{...(B=b.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(T=(A=b.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var W,I,P;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(P=(I=u.parameters)==null?void 0:I.docs)==null?void 0:P.source}}};var R,w,S;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(S=(w=p.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};const sr=["Default","OneLevel","ThreeLevel","ManyLevel","LongBreadcrumbs","Disabled"];export{l as Default,p as Disabled,u as LongBreadcrumbs,b as ManyLevel,i as OneLevel,m as ThreeLevel,sr as __namedExportsOrder,cr as default};
