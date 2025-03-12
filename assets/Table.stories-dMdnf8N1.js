import{j as e}from"./jsx-runtime-4WDyTGeM.js";import{T}from"./ThemeProviderWrapper-Be5RUURM.js";import{T as b,a as m,b as p,c as i,d as l,e as C}from"./TableRow-BK_siOE1.js";import"./index-Dl6G-zuu.js";import"./index-eOQoo3sK.js";import"./styled-Dt2_JBRt.js";const D={title:"Design System/Components/Table",tags:["autodocs"],component:b};function r(a,d,c,h,g){return{name:a,calories:d,fat:c,carbs:h,protein:g}}const x=[r("Frozen yoghurt",159,6,24,4),r("Ice cream sandwich",237,9,37,4.3),r("Eclair",262,16,24,6),r("Cupcake",305,3.7,67,4.3),r("Gingerbread",356,16,49,3.9)],n={render:()=>e.jsx(T,{children:e.jsx(m,{children:e.jsxs(b,{sx:{minWidth:650},"aria-label":"simple table",children:[e.jsx(p,{children:e.jsxs(i,{children:[e.jsx(l,{children:"Dessert (100g serving)"}),e.jsx(l,{align:"right",children:"Calories"}),e.jsx(l,{align:"right",children:"Fat (g)"}),e.jsx(l,{align:"right",children:"Carbs (g)"}),e.jsx(l,{align:"right",children:"Protein (g)"})]})}),e.jsx(C,{children:x.map(a=>e.jsxs(i,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[e.jsx(l,{component:"th",scope:"row",children:a.name}),e.jsx(l,{align:"right",children:a.calories}),e.jsx(l,{align:"right",children:a.fat}),e.jsx(l,{align:"right",children:a.carbs}),e.jsx(l,{align:"right",children:a.protein})]},a.name))})]})})})};var s,t,o;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <ThemeProviderWrapper>
      <TableContainer>
        <Table sx={{
        minWidth: 650
      }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align='right'>Calories</TableCell>
              <TableCell align='right'>Fat&nbsp;(g)</TableCell>
              <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
              <TableCell align='right'>Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {defaultRows.map(row => <TableRow key={row.name} sx={{
            '&:last-child td, &:last-child th': {
              border: 0
            }
          }}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.calories}</TableCell>
                <TableCell align='right'>{row.fat}</TableCell>
                <TableCell align='right'>{row.carbs}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProviderWrapper>
}`,...(o=(t=n.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};const v=["Default"];export{n as Default,v as __namedExportsOrder,D as default};
