import{j as e}from"./jsx-runtime-4WDyTGeM.js";import{T as s}from"./ThemeProviderWrapper-Be5RUURM.js";import{R as m}from"./RouteWrapper-CKCgQWge.js";import{C as I}from"./CardList-CPK--B32.js";import{r as b}from"./index-Dl6G-zuu.js";import{g as f}from"./projectRoutePaths-D5haaVXm.js";import{a as y,E as S}from"./EntityCardSkeleton-DyZ1ChOf.js";import{a1 as v}from"./WarningIcon-6HpPPylF.js";import"./EditIcon-bNkpr5Ld.js";import"./LinkIcon-CKhuJxKk.js";import"./SvgIcon-76a5Fjoi.js";import{e as W}from"./index-DhieATjG.js";import{S as k}from"./Skeleton-DNnTaYZ5.js";import"./index-CmOK7BR8.js";import"./index-eOQoo3sK.js";import"./Card-qdp0ebYD.js";import"./styled-Dt2_JBRt.js";import"./Paper-Dxqu9lYo.js";import"./Typography-8CCtzQ9L.js";import"./SvgIcon-DROc5w4B.js";import"./colorManipulator-CE5bNU3Z.js";const N=""+new URL("ProjectBanner-B_IqUyNI.svg",import.meta.url).href,r=({name:a,projectId:c,exhibitCount:d})=>{const p=W(),_=b.useCallback(()=>{p(f({projectId:c.toString()}))},[p,c]);return e.jsx(y,{className:"ProjectCard",CardHeaderIcon:e.jsx(v,{}),bannerImageProps:{alt:"Project",src:N},label:a,onClick:_,children:e.jsx("span",{children:d===1?"1 Exhibit":`${d} Exhibits`})})};try{r.displayName="ProjectCard",r.__docgenInfo={description:"",displayName:"ProjectCard",props:{projectId:{defaultValue:null,description:"",name:"projectId",required:!0,type:{name:"number"}},exhibitCount:{defaultValue:null,description:"",name:"exhibitCount",required:!0,type:{name:"number"}},name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}}}}}catch{}const n=()=>e.jsx(S,{className:"ProjectCardSkeleton",children:e.jsx(k,{className:"ProjectCardSkeleton__exhibitCount"})});try{n.displayName="ProjectCardSkeleton",n.__docgenInfo={description:"",displayName:"ProjectCardSkeleton",props:{}}}catch{}const Y={title:"Design System/Composite Components/ProjectCard",tags:["autodocs"],component:r},t={render:()=>e.jsx(s,{children:e.jsx(m,{children:e.jsx(r,{projectId:1,exhibitCount:5,name:"Lorem ipsum dolor sit"})})})},o={render:()=>e.jsx(s,{children:e.jsx(m,{children:e.jsx(r,{projectId:1,exhibitCount:3,name:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium"})})})},i={render:()=>e.jsx(s,{children:e.jsx(m,{children:e.jsxs(I,{className:"CardList CardList__workspaceProjects",children:[e.jsx(r,{projectId:1,exhibitCount:0,name:"Lorem ipsum dolor sit"}),e.jsx(r,{projectId:2,exhibitCount:1,name:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium"}),e.jsx(r,{projectId:3,exhibitCount:3,name:"Lorem ipsum dolor sit amet"}),e.jsx(r,{projectId:4,exhibitCount:3,name:"Lorem, ipsum dolor."}),e.jsx(r,{projectId:5,exhibitCount:4,name:"Lorem ipsum dolor sit amet consectetur adipisicing elit"}),e.jsx(n,{})]})})})};var u,l,j;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <RouteWrapper>
        <ProjectCard projectId={1} exhibitCount={5} name='Lorem ipsum dolor sit' />
      </RouteWrapper>
    </ThemeProviderWrapper>
}`,...(j=(l=t.parameters)==null?void 0:l.docs)==null?void 0:j.source}}};var C,x,h;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <RouteWrapper>
        <ProjectCard projectId={1} exhibitCount={3} name='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium' />
      </RouteWrapper>
    </ThemeProviderWrapper>
}`,...(h=(x=o.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var P,g,L;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <RouteWrapper>
        <CardList className='CardList CardList__workspaceProjects'>
          <ProjectCard projectId={1} exhibitCount={0} name='Lorem ipsum dolor sit' />
          <ProjectCard projectId={2} exhibitCount={1} name='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem rerum eum numquam accusantium dolorem error inventore ducimus non cum praesentium' />
          <ProjectCard projectId={3} exhibitCount={3} name='Lorem ipsum dolor sit amet' />
          <ProjectCard projectId={4} exhibitCount={3} name='Lorem, ipsum dolor.' />
          <ProjectCard projectId={5} exhibitCount={4} name='Lorem ipsum dolor sit amet consectetur adipisicing elit' />
          <ProjectCardSkeleton />
        </CardList>
      </RouteWrapper>
    </ThemeProviderWrapper>
}`,...(L=(g=i.parameters)==null?void 0:g.docs)==null?void 0:L.source}}};const Z=["Default","LongTitle","CardListExample"];export{i as CardListExample,t as Default,o as LongTitle,Z as __namedExportsOrder,Y as default};
