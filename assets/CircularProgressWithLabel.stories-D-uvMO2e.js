import{j as r}from"./jsx-runtime-4WDyTGeM.js";import{R as i}from"./index-Dl6G-zuu.js";import{T as g}from"./ThemeProviderWrapper-uQhE3vfQ.js";import{C as y}from"./CircularProgress-BnUg8rss.js";import{B as l}from"./Box-CHC9cW7X.js";import{T as x}from"./Typography-n3eyoqZV.js";import"./index-eOQoo3sK.js";import"./styled-DaAyEikA.js";const a=({value:e=0,...n})=>r.jsxs(l,{sx:{position:"relative",display:"inline-flex"},children:[r.jsx(y,{variant:"determinate",value:e,...n}),r.jsx(l,{sx:{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},children:r.jsx(x,{variant:"caption",component:"div",color:"text.secondary",children:`${Math.round(e)}%`})})]});try{a.displayName="CircularProgressWithLabel",a.__docgenInfo={description:"",displayName:"CircularProgressWithLabel",props:{value:{defaultValue:{value:"0"},description:`The value of the progress indicator for the determinate variant.
Value between 0 and 100.`,name:"value",required:!1,type:{name:"number"}},color:{defaultValue:{value:"'primary'"},description:`The color of the component.
It supports both default and custom theme colors, which can be added as shown in the
[palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).`,name:"color",required:!1,type:{name:"enum",value:[{value:'"error"'},{value:'"primary"'},{value:'"secondary"'},{value:'"info"'},{value:'"success"'},{value:'"warning"'},{value:'"inherit"'}]}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"Ref<unknown>"}},size:{defaultValue:{value:"40"},description:`The size of the component.
If using a number, the pixel unit is assumed.
If using a string, you need to provide the CSS unit, for example '3rem'.`,name:"size",required:!1,type:{name:"string | number"}},sx:{defaultValue:null,description:"The system prop that allows defining system overrides as well as additional CSS styles.",name:"sx",required:!1,type:{name:"SxProps<Theme>"}},classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"Partial<CircularProgressClasses>"}},disableShrink:{defaultValue:{value:"false"},description:"If `true`, the shrink animation is disabled.\nThis only works if variant is `indeterminate`.",name:"disableShrink",required:!1,type:{name:"boolean"}},thickness:{defaultValue:{value:"3.6"},description:"The thickness of the circle.",name:"thickness",required:!1,type:{name:"number"}}}}}catch{}const V={title:"Design System/Components/CircularProgressWithLabel",tags:["autodocs"],decorators:[e=>r.jsx(g,{children:r.jsx(e,{})})],component:a},s={args:{}},t={render:e=>{const[n,h]=i.useState(0);return i.useEffect(()=>{const v=setInterval(()=>{h(o=>o>=100?0:o+10)},800);return()=>{clearInterval(v)}},[]),r.jsx(a,{...e,value:n})}};var u,c,p;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {}
}`,...(p=(c=s.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var m,d,f;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: props => {
    const [progress, setProgress] = React.useState(0);
    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress(prevProgress => prevProgress >= 100 ? 0 : prevProgress + 10);
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }, []);
    return <CircularProgressWithLabel {...props} value={progress} />;
  }
}`,...(f=(d=t.parameters)==null?void 0:d.docs)==null?void 0:f.source}}};const k=["Default","ActiveExample"];export{t as ActiveExample,s as Default,k as __namedExportsOrder,V as default};
