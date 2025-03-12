import{j as e}from"./jsx-runtime-4WDyTGeM.js";import{r as l}from"./index-Dl6G-zuu.js";import{T as h}from"./ThemeProviderWrapper-Be5RUURM.js";import{R as a}from"./Radio-DgGJ2xve.js";import{L as k,a as u}from"./ListItem-DL2UJvRw.js";import{L as x}from"./ListItemIcon-Bzpm1BdP.js";import"./index-eOQoo3sK.js";import"./styled-Dt2_JBRt.js";import"./SwitchBase-BNegPo3E.js";import"./useFormControl-f2Zb6bR-.js";import"./ButtonBase-Cp5BTdG6.js";import"./useTimeout-B4b6mSVs.js";import"./TransitionGroupContext-xAci1nHd.js";import"./useForkRef-BDoLG09A.js";import"./useIsFocusVisible-NzCoqL_q.js";import"./useControlled-1Y2rT-1r.js";import"./createSvgIcon-D7FplSTg.js";import"./SvgIcon-DROc5w4B.js";import"./createChainedFunction-BO_9K8Jh.js";import"./List-C41wlV70.js";import"./ListContext-BMbj8Y86.js";import"./ListItem-6Y_zk0LJ.js";import"./isMuiElement-DAcuSkv2.js";import"./isHostComponent-DVu5iVWx.js";import"./ListItemSecondaryAction-eJlCA5Er.js";const f=["small","medium"],H={title:"Design System/Components/Radio",tags:["autodocs"],component:a,decorators:[t=>e.jsx(h,{children:e.jsx("div",{style:{backgroundColor:"white"},children:e.jsx(t,{})})})]},o={render:({onClick:t,...c})=>{const[s,p]=l.useState(!1),d=r=>{p(!s),t==null||t(r)};return e.jsx(k,{children:f.map(r=>e.jsx(u,{children:e.jsx(x,{children:e.jsx(a,{...c,name:"size",size:r,onClick:d,checked:s},r)})},r))})}};var i,m,n;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: ({
    onClick,
    ...args
  }) => {
    const [checked, setChecked] = useState(false);
    const handleClick: RadioProps['onClick'] = event => {
      setChecked(!checked);
      onClick?.(event);
    };
    return <List>
        {SIZES.map(size => <ListItem key={size}>
            <ListItemIcon>
              <Radio key={size} {...args} name='size' size={size} onClick={handleClick} checked={checked} />
            </ListItemIcon>
          </ListItem>)}
      </List>;
  }
}`,...(n=(m=o.parameters)==null?void 0:m.docs)==null?void 0:n.source}}};const J=["Default"];export{o as Default,J as __namedExportsOrder,H as default};
