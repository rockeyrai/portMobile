import React, { useEffect } from "react";
import { View, StyleSheet, GestureResponderEvent } from "react-native";
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import {
  Canvas,
  Path,
  Skia,
  useValue,
  runTiming,
  useComputedValue,
  useTouchHandler,
  Group,
  Paint,
} from "@shopify/react-native-skia";

// DonutChart props
type Segment = { value: number; color: string };

type DonutChartProps = {
  data: Segment[];
  size?: number; // diameter
  thickness?: number; // ring thickness
  spacing?: number; // gap (degrees) between segments
  animate?: boolean;
  onPressSegment?: (index: number) => void;
};

// Helper: convert degrees to radians
const deg2rad = (d: number) => (d * Math.PI) / 180;

// Build an SVG path string for a donut segment (ring slice) using arc commands
function ringSegmentPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startAngleDeg: number,
  sweepAngleDeg: number
) {
  // clamp sweep
  const large = sweepAngleDeg > 180 ? 1 : 0;
  const startRad = deg2rad(startAngleDeg);
  const endRad = deg2rad(startAngleDeg + sweepAngleDeg);

  const x1 = cx + rOuter * Math.cos(startRad);
  const y1 = cy + rOuter * Math.sin(startRad);
  const x2 = cx + rOuter * Math.cos(endRad);
  const y2 = cy + rOuter * Math.sin(endRad);

  const x3 = cx + rInner * Math.cos(endRad);
  const y3 = cy + rInner * Math.sin(endRad);
  const x4 = cx + rInner * Math.cos(startRad);
  const y4 = cy + rInner * Math.sin(startRad);

  // Outer arc from x1,y1 to x2,y2, then inner arc from x3,y3 back to x4,y4
  // Sweep flag = 1 for clockwise outer arc, 0 for inner arc (reverse)
  return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${large} 0 ${x4} ${y4} Z`;
}

export default function DonutChart({
  data,
  size = 220,
  thickness = 28,
  spacing = 2,
  animate = true,
  onPressSegment,
}: DonutChartProps) {
  // Basic geometry
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = (size - 2) / 2; // small inset
  const rInner = rOuter - thickness;

  // compute total and angles
  const total = data.reduce((s, d) => s + (d.value > 0 ? d.value : 0), 0) || 1;
  const rawAngles = data.map((d) => (d.value / total) * 360);

  // Animated progress (Skia) from 0..1
  const progress = useValue(0);

  useEffect(() => {
    if (animate) {
      // animate from 0 to 1 in 800ms
      runTiming(progress, 1, { duration: 800 });
    } else {
      progress.current = 1;
    }
  }, [animate, progress]);

  // Reanimated rotation for simple interaction
  const rot = useSharedValue(0);
  const astyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rot.value}deg` }],
  }));

  // Compute paths as Skia Path objects, but make them reactive to progress
  const paths = useComputedValue(() => {
    const ps: { path: any; color: string; index: number }[] = [];
    let cursor = -90; // start at top -90deg
    for (let i = 0; i < data.length; i++) {
      const sweep = Math.max(0, rawAngles[i] - spacing);
      // multiply by progress to animate revealing
      const visibleSweep = sweep * progress.current;
      if (visibleSweep <= 0) {
        cursor += rawAngles[i];
        continue;
      }
      const svg = ringSegmentPath(cx, cy, rOuter, rInner, cursor + spacing / 2, visibleSweep);
      const path = Skia.Path.MakeFromSVGString(svg) as any;
      ps.push({ path, color: data[i].color, index: i });
      cursor += rawAngles[i];
    }
    return ps;
  }, [progress]);

  // touch handler: map touch to segment index
  const touch = useTouchHandler({
    onStart: (pt) => {
      // compute angle from center and distance
      const dx = pt.x - cx;
      const dy = pt.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < rInner || dist > rOuter) return; // outside the ring

      // angle in degrees from -90 start
      let ang = (Math.atan2(dy, dx) * 180) / Math.PI; // -180..180 with 0 at +x
      ang = ang < -90 ? ang + 360 : ang; // normalize
      const degFromTop = ang + 90; // 0..360 from top

      // find which segment this falls in
      let accum = 0;
      for (let i = 0; i < rawAngles.length; i++) {
        const segStart = accum;
        const segEnd = accum + rawAngles[i];
        if (degFromTop >= segStart && degFromTop <= segEnd) {
          onPressSegment?.(i);
          rot.value = withTiming(rot.value + 20, { duration: 300 }); // small spin feedback
          return;
        }
        accum = segEnd;
      }
    },
  });

  return (
    <Reanimated.View style={[styles.wrapper, { width: size, height: size }, astyle]}>
      <View style={{ flex: 1 }}>
        <Canvas style={{ width: size, height: size }} onTouch={touch}>
          <Group>
            {paths.current.map((p) => (
              // Each Path is drawn with a Fill Paint
              <Path key={p.index} path={p.path} style="fill">
                <Paint color={p.color} />
              </Path>
            ))}
          </Group>
        </Canvas>
      </View>
    </Reanimated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});

/*
Usage example:

<DonutChart
  data={[{value:40,color:'#ff7675'},{value:30,color:'#74b9ff'},{value:30,color:'#55efc4'}]}
  size={200}
  thickness={28}
  spacing={2}
  onPressSegment={(i)=>console.log('pressed',i)}
/>

Notes:
- This component uses Skia's Path.MakeFromSVGString to build segment shapes and runTiming for the reveal animation.
- Reanimated is used only for a small press rotation feedback; the drawing animation is handled by Skia.
- Make sure to install and configure these native libs in your project: react-native-reanimated and @shopify/react-native-skia.
*/
