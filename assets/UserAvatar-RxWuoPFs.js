import{j as u}from"./jsx-runtime-4WDyTGeM.js";import{r as l}from"./index-Dl6G-zuu.js";import{c}from"./index-eOQoo3sK.js";import{A as f}from"./Avatar-CcRSBCiw.js";import{i as h}from"./lang-BqISUGWn.js";const d=["blue","green","yellow","orange","red","purple","pink","teal","brown"],y=e=>{h(e)&&(e="null");let a=0,t;for(t=0;t<e.length;t+=1)a=(Number.isNaN(e.charCodeAt(t))?0:e.charCodeAt(t))+((a<<5)-a);const s=Math.abs(a)%d.length;return d[s]},g="UserAvatar__palette__",i=l.memo(({user:e,className:a,...t})=>{const s=l.useMemo(()=>{var o,m;return(((o=e.firstName)==null?void 0:o[0])||((m=e.lastName)==null?void 0:m[0])||e.email[0]).toUpperCase()},[e.email,e.firstName,e.lastName]),r=l.useMemo(()=>[e.firstName,e.lastName].filter(Boolean).join(" "),[e==null?void 0:e.firstName,e==null?void 0:e.lastName]),p=l.useMemo(()=>{const n=y(r||e.email);return`${g}${n}`},[r,e.email]);return u.jsx(f,{src:e.profile_image,slotProps:{img:{referrerPolicy:"no-referrer"}},alt:r,className:c("UserAvatar",a,p),...t,children:s})});i.displayName="UserAvatar";try{i.displayName="UserAvatar",i.__docgenInfo={description:"",displayName:"UserAvatar",props:{user:{defaultValue:null,description:"",name:"user",required:!0,type:{name:'Pick<User, "email" | "firstName" | "lastName" | "profile_image">'}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"(Partial<AvatarClasses> & Partial<ClassNameMap<never>>)"}},children:{defaultValue:null,description:"Used to render icon or text elements inside the Avatar if `src` is not set.\nThis can be an element, or just a string.",name:"children",required:!1,type:{name:"ReactNode"}},sx:{defaultValue:null,description:"The system prop that allows defining system overrides as well as additional CSS styles.",name:"sx",required:!1,type:{name:"SxProps<Theme>"}},variant:{defaultValue:{value:"'circular'"},description:"The shape of the avatar.",name:"variant",required:!1,type:{name:"enum",value:[{value:'"square"'},{value:'"circular"'},{value:'"rounded"'}]}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any, keyof IntrinsicElements>"}},slotProps:{defaultValue:{value:"{}"},description:"The props used for each slot inside.",name:"slotProps",required:!1,type:{name:"{ img?: SlotProps<ElementType<ImgHTMLAttributes<HTMLImageElement>, keyof IntrinsicElements>, {}, AvatarOwnProps>; }"}},slots:{defaultValue:{value:"{}"},description:"The components used for each slot inside.",name:"slots",required:!1,type:{name:"AvatarSlots"}},alt:{defaultValue:null,description:"Used in combination with `src` or `srcSet` to\nprovide an alt attribute for the rendered `img` element.",name:"alt",required:!1,type:{name:"string"}},imgProps:{defaultValue:null,description:"[Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes) applied to the `img` element if the component is used to display an image.\nIt can be used to listen for the loading error event.\n@deprecated Use `slotProps.img` instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).",name:"imgProps",required:!1,type:{name:"(ImgHTMLAttributes<HTMLImageElement> & { sx?: SxProps<Theme>; })"}},sizes:{defaultValue:null,description:"The `sizes` attribute for the `img` element.",name:"sizes",required:!1,type:{name:"string"}},srcSet:{defaultValue:null,description:"The `srcSet` attribute for the `img` element.\nUse this attribute for responsive image display.",name:"srcSet",required:!1,type:{name:"string"}}}}}catch{}export{i as U};
