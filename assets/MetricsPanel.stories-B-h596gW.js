import{j as r}from"./jsx-runtime-4WDyTGeM.js";import{T as a}from"./ThemeProviderWrapper-Be5RUURM.js";import{B as x}from"./BarChart-BEhSM6ct.js";import{M as e}from"./MetricsPanel-C076jbmG.js";import"./index-Dl6G-zuu.js";import"./createSvgIcon-CBDqugwZ.js";import"./createSvgIcon-D7FplSTg.js";import"./SvgIcon-DROc5w4B.js";import"./styled-Dt2_JBRt.js";import"./useForkRef-BDoLG09A.js";import"./createChainedFunction-BO_9K8Jh.js";import"./ownerWindow-BN2rbQ_G.js";import"./ownerDocument-DW-IO8s5.js";import"./isMuiElement-DAcuSkv2.js";import"./useTimeout-B4b6mSVs.js";import"./useId-BkqTTtmk.js";import"./useControlled-1Y2rT-1r.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./index-eOQoo3sK.js";import"./datetime-B8oWyIaC.js";import"./CircularProgress-BgQ2h3g8.js";import"./useMobileMediaQuery-DDszdcix.js";import"./useMediaQuery-BI_VLzxJ.js";import"./IconButton-vPDIoB2n.js";import"./IconButton-Djqk-I0k.js";import"./ButtonBase-Cp5BTdG6.js";import"./TransitionGroupContext-xAci1nHd.js";import"./Tooltip-B5Gmbdco.js";import"./useTheme-DLZNzqMo.js";import"./Portal-3LY7w8wx.js";import"./index-CmOK7BR8.js";import"./useSlotProps-CP3WIws3.js";import"./mergeSlotProps-D2P12luN.js";import"./isHostComponent-DVu5iVWx.js";import"./Grow-BnLMXtPt.js";import"./utils-CzoQ7LGy.js";import"./ListTooltipContent-D4oSKkQx.js";import"./lang-BqISUGWn.js";import"./index-Bu4DXql-.js";import"./Dot-B-sjopOf.js";import"./ActivityGaugeIcon-BLxmV33a.js";import"./Badge-jwGZ2zHx.js";import"./CountBadge-3ANCZLmo.js";import"./WarningIconBadge-7pfZhuGS.js";import"./WarningIcon-DZ-0i3Yx.js";import"./SvgIcon-eIfT25mh.js";import"./EditIcon-C_DteFoa.js";import"./LinkIcon-8pN4OFct.js";import"./MetricsCard-DNmTCJeT.js";import"./CardList-CPK--B32.js";import"./Card-sUXJUunV.js";import"./Paper-Dxqu9lYo.js";import"./ListItem-DL2UJvRw.js";import"./List-C41wlV70.js";import"./ListContext-BMbj8Y86.js";import"./ListItem-6Y_zk0LJ.js";import"./ListItemSecondaryAction-eJlCA5Er.js";import"./RichTooltip-6x3F_uCL.js";import"./Tooltip-DIbTf6Xc.js";import"./useToggle-B4o7u8Ia.js";import"./MetricsCardSkeleton-WJ9im-Hj.js";import"./Skeleton-CFd2Vw-J.js";import"./colorManipulator-CE5bNU3Z.js";const Or={title:"Design System/Composite Components/Metrics/MetricsPanel",tags:["autodocs"],component:e},t={render:()=>r.jsx(a,{children:r.jsx(e,{metricsCardProps:Array.from({length:3},(p,s)=>({title:"Lorem ipsem",subtitle:"dolor sit amet",value:s.toString()})),children:r.jsx("div",{style:{backgroundColor:"blue",height:550,width:"100%"}})})})},o={render:()=>r.jsx(a,{children:r.jsx(e,{metricsCardProps:[],children:r.jsx("div",{style:{backgroundColor:"blue",height:550,width:"100%"}})})})},i={render:()=>r.jsx(a,{children:r.jsx(e,{metricsCardProps:[],isLoading:!0,children:r.jsx("div",{style:{backgroundColor:"blue",height:550,width:"100%"}})})})},n={render:()=>{const p=new Date().getTime(),s=1e3*60*60*24,S=[...Array(10)].map((k,m)=>new Date(p-s*m).toISOString());return r.jsx(a,{children:r.jsx(e,{metricsCardProps:Array.from({length:3},(k,m)=>({title:"Lorem ipsem",subtitle:"dolor sit amet",value:m.toString()})),children:r.jsx(x,{datasets:[{label:"Demo",data:[0,1,2,3,4,5,6,7,8,9],backgroundColor:"rgba(255, 109, 66, 0.6)",hoverBackgroundColor:"rgba(255, 109, 66, 1)"}],bucketCount:10,buckets:S})})})}};var d,c,l;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
