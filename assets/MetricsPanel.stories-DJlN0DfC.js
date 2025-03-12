import{j as r}from"./jsx-runtime-4WDyTGeM.js";import{T as a}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{B as x}from"./BarChart-CWzl2KNJ.js";import{M as e}from"./MetricsPanel-Dc_syfxa.js";import"./index-Dl6G-zuu.js";import"./createSvgIcon-3kI-rNei.js";import"./createSvgIcon-DWxpDd4T.js";import"./SvgIcon-d6V0mnb4.js";import"./styled-DaAyEikA.js";import"./useForkRef-BDoLG09A.js";import"./createChainedFunction-BO_9K8Jh.js";import"./ownerWindow-BN2rbQ_G.js";import"./ownerDocument-DW-IO8s5.js";import"./isMuiElement-DAcuSkv2.js";import"./useTimeout-B4b6mSVs.js";import"./useId-BkqTTtmk.js";import"./useControlled-1Y2rT-1r.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./index-eOQoo3sK.js";import"./datetime-B8oWyIaC.js";import"./CircularProgress-FYYVMTPs.js";import"./useMobileMediaQuery-DuF0AuJt.js";import"./useMediaQuery-CDF-4tKz.js";import"./IconButton-CI5pklQo.js";import"./IconButton-BRjw76_K.js";import"./ButtonBase-gXIT4mbS.js";import"./TransitionGroupContext-xAci1nHd.js";import"./Tooltip-CSQNJ7MT.js";import"./useTheme-CYpYpbD_.js";import"./Portal-3LY7w8wx.js";import"./index-CmOK7BR8.js";import"./useSlotProps-DeMrnH46.js";import"./mergeSlotProps-Dc5z_XIy.js";import"./isHostComponent-DVu5iVWx.js";import"./Grow-CF8DuDB2.js";import"./utils-Dh94M0rq.js";import"./ListTooltipContent-D4oSKkQx.js";import"./lang-BqISUGWn.js";import"./index-Bu4DXql-.js";import"./Dot-B-sjopOf.js";import"./ActivityGaugeIcon-ZtsyvAmh.js";import"./Badge-B5h4WNES.js";import"./CountBadge-3ANCZLmo.js";import"./WarningIconBadge-DYC2RgsF.js";import"./WarningIcon-hyuTG_uV.js";import"./SvgIcon-DKK2_66P.js";import"./EditIcon-DQffeilE.js";import"./LinkIcon-CTu8-jnD.js";import"./MetricsCard-CBele5Q-.js";import"./CardList-CPK--B32.js";import"./Card-D3c9tIK2.js";import"./Paper-B6pP1Hjl.js";import"./ListItem-CazW7o9q.js";import"./List-B5csL-18.js";import"./ListContext-BMbj8Y86.js";import"./ListItem-CgztQErV.js";import"./ListItemSecondaryAction-jR0jlMNJ.js";import"./RichTooltip-CT5n6NUI.js";import"./Tooltip-DS9FjgPS.js";import"./useToggle-B4o7u8Ia.js";import"./MetricsCardSkeleton-Cw5lDrQw.js";import"./Skeleton-dRlu6SwO.js";import"./colorManipulator-CH2yvhWM.js";const Or={title:"Design System/Composite Components/Metrics/MetricsPanel",tags:["autodocs"],component:e},t={render:()=>r.jsx(a,{children:r.jsx(e,{metricsCardProps:Array.from({length:3},(p,s)=>({title:"Lorem ipsem",subtitle:"dolor sit amet",value:s.toString()})),children:r.jsx("div",{style:{backgroundColor:"blue",height:550,width:"100%"}})})})},o={render:()=>r.jsx(a,{children:r.jsx(e,{metricsCardProps:[],children:r.jsx("div",{style:{backgroundColor:"blue",height:550,width:"100%"}})})})},i={render:()=>r.jsx(a,{children:r.jsx(e,{metricsCardProps:[],isLoading:!0,children:r.jsx("div",{style:{backgroundColor:"blue",height:550,width:"100%"}})})})},n={render:()=>{const p=new Date().getTime(),s=1e3*60*60*24,S=[...Array(10)].map((k,m)=>new Date(p-s*m).toISOString());return r.jsx(a,{children:r.jsx(e,{metricsCardProps:Array.from({length:3},(k,m)=>({title:"Lorem ipsem",subtitle:"dolor sit amet",value:m.toString()})),children:r.jsx(x,{datasets:[{label:"Demo",data:[0,1,2,3,4,5,6,7,8,9],backgroundColor:"rgba(255, 109, 66, 0.6)",hoverBackgroundColor:"rgba(255, 109, 66, 1)"}],bucketCount:10,buckets:S})})})}};var d,c,l;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <MetricsPanel metricsCardProps={Array.from({
      length: 3
    }, (_, i) => {
      return {
        title: 'Lorem ipsem',
        subtitle: 'dolor sit amet',
        value: i.toString()
      };
    })}>
        <div style={{
        backgroundColor: 'blue',
        height: 550,
        width: '100%'
      }} />
      </MetricsPanel>
    </ThemeProviderWrapper>
}`,...(l=(c=t.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var u,h,g;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <MetricsPanel metricsCardProps={[]}>
        <div style={{
        backgroundColor: 'blue',
        height: 550,
        width: '100%'
      }} />
      </MetricsPanel>
    </ThemeProviderWrapper>
}`,...(g=(h=o.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var b,C,P;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <MetricsPanel metricsCardProps={[]} isLoading>
        <div style={{
        backgroundColor: 'blue',
        height: 550,
        width: '100%'
      }} />
      </MetricsPanel>
    </ThemeProviderWrapper>
}`,...(P=(C=i.parameters)==null?void 0:C.docs)==null?void 0:P.source}}};var _,v,M;n.parameters={...n.parameters,docs:{...(_=n.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => {
    const NOW_IN_MS = new Date().getTime();
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
    const buckets = [...Array(10)].map((_, i) => {
      return new Date(NOW_IN_MS - ONE_DAY_IN_MS * i).toISOString();
    });
    return <ThemeProviderWrapper>
        <MetricsPanel metricsCardProps={Array.from({
        length: 3
      }, (_, i) => {
        return {
          title: 'Lorem ipsem',
          subtitle: 'dolor sit amet',
          value: i.toString()
        };
      })}>
          <BarChart datasets={[{
          label: 'Demo',
          data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          backgroundColor: 'rgba(255, 109, 66, 0.6)',
          hoverBackgroundColor: 'rgba(255, 109, 66, 1)'
        }]} bucketCount={10} buckets={buckets} />
        </MetricsPanel>
      </ThemeProviderWrapper>;
  }
}`,...(M=(v=n.parameters)==null?void 0:v.docs)==null?void 0:M.source}}};const Ir=["Default","NoMetricsCards","Loading","BarChartView"];export{n as BarChartView,t as Default,i as Loading,o as NoMetricsCards,Ir as __namedExportsOrder,Or as default};
