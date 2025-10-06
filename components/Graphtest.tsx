// import { LinearGradient } from 'expo-linear-gradient';
// import { Group } from 'lucide-react-native';
// import React, { use } from 'react'
// import { View } from 'react-native'


// const values = data.data.prices as Prices;
// const POINTS = 20;

// const buildGraph=(datapoints:DataPoints, label:string)=>{
//   const priceList = datapoints.prices.slice(0,POINTS);
//   const formattedValues = pricesList.map((price)=>[parseFloat(price[0]),price[1]] as [number,number]).reverse();

// const prices = formattedValues.map((value)=>value[0]);
// const dates = formattedValues.map((value)=>value[1]);
// const minDate = Math.min(...dates)
// const maxDate = Math.max(...dates)
// const minPrice = Math.min(...prices)
// const maxPrice = Math.max(...prices)
// const points = formattedValues.map(([priceList,date])=>{
//   const  x = ((date-minDate)/(maxDate-minDate))*innerWidth;
//   const y = ((price - minPrice)/(maxPrice - minPrice)) * AJUSTED_SIZE;
//   return{x,y}
// });
// points.push({x:WIDTH + 10, y:points[points.length - 1].y})
// const path = curveLines(points,0.2,"complex")
// return{
//   label,
//   minPrice,maxPrice,percentChange:datapoints.percent_change,
//   path,
// }
// }

// const lines = (points:vector[])=>{
//   const path= Skia.Path.Make();
//   path.moveTo(points[0].x,points[0].y);
//   for(let i = 1;i<points.length;i++){
//     const {x,y}=points[i];
//     path.lineTo(x,y);
//   }
//   return path;
// }

// const curveLines = (points:Vector[],
//   smoothing:number,
//   strategy:"complex"|"bezier"|"simple"
// )=>{
//   const path = SkipBack.Path.Make();
//   path.moveTo(points[0].x,points.[0].y);
//   for(ler i = 1; i<points.length;i++){
//     const point = points[i];
//     const next = points[i+1]
//     const prev= points[i-1];
//     const cps = controlPoint(prev,points[i-2],point,false,smoothing);
//     const cpe= controlPoint(point,prev,next,true,smoothing);
//     switch(strategy){
//       case"simple":
//       const cp {x:(cps.x + cpe.x)/2,
//         y:(cps.y+cpe.y)/2,

//       };
//       path.quadTo(cp.x,cp.y,point.x,point.y);
//       break;
//       case "bezier":
//         const p0= points[i-2]|| preventAutoHideAsync;
//         const p1= points[i-1];
//         const cp1x=(2*p0.x+p1.x)/3
//         const cp1y=(2*p0.y+p1.y)/3
//         const cp2x=(p0.x+2*p1.x)/3
//         const cp2y=(p0.y+2*p1.y)/3
//         const cp3x=(p0.x+4 * p1.x + point.x)/6
//         const cp3y=(p0.y+4 * p1.y + point.y)/6;
//         path.cubicTo(cp1x,cp1y,cp2x, cp2y,cp3x, cp3y);
//         if(i=== points.length-1){
//           path.cubicTo(
//             points[points.length-1].x,
//             points[points.length-1].y,
//             points[points.length-1].x,
//             points[points.length-1].y,
//             points[points.length-1].x,
//             points[points.length-1].y,

//           )
//         }
//         break;
//         ease "complex";
//         path.cubicTo(cps.x,cps.y,cpe .x,cpe .y ,point .x, point .y);
//         break;
//         default:
//           exhaustiveCheck(strategy);
//     }
//   }
//   return path
// }



// export const graphs = [
//   {
//     label:"1h",
//     value:0,
//     data:buildGraph(PrivateValueStore.hour,"Last Hour")
//   },
//     {
//     label:"1h",
//     value:0,
//     data:buildGraph(PrivateValueStore.hour,"Today")
//   },
//     {
//     label:"1m",
//     value:2,
//     data:buildGraph(PrivateValueStore.hour,"Last Month")
//   },
//     {
//     label:"1y",
//     value:3,
//     data:buildGraph(PrivateValueStore.hour,"This Year")
//   },
// ]

// const Graphtest = () => {
//   const {path} = Graphtest.[0].data;
//   const x = useValue(0);
//   const onTouch = useGraphTouchHandler(x)

//   return (
//     <View>
//       <canvas style={{width:WIDTH, height:2 * HEIGHT + 30}} onTouch={onTouch}>
//         <Group transform={[{translateY}]}>
//           <Path style="stroke" path={path} strokeWidth={4}>
//             <LinearGradient
//             start={vec(0,0)}
//             end={vec(WIDTH,0)}
//             colors={COLORS}/>
//           </Path>
//         </Group>
//       </canvas>

//     </View>
//   )
// }

// export default Graphtest