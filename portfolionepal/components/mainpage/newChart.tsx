import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LineGraph } from 'react-native-graph';
import type { GraphPoint } from 'react-native-graph';
import { useRouter } from 'expo-router';
// import api and getUnixTimeInterval as needed

export interface NepseIndexIf {
  id?: number;
  auditId?: number | null;
  exchangeIndexId?: number | null;
  generatedTime: string;
  sindex?: string;
  sclose?: number;
  high?: number;
  low?: number;
  previousClose?: number;
  schange: number;
  perChange: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  currentValue: number;
  lastUpdatedDate: string;
  day?: number;
  month?: number;
  year?: number;
  entry_date?: string;
  open?: number;
}

export interface NepseAdvanceDataIF {
  advance: number;
  declined: number;
  unchanged: number;
}

export interface ChartDataItem {
  id?: number;
  t: string | number;
  c: number;
  h?: number;
  l?: number;
  o?: number;
  v?: number;
  type?: number;
  pc?: number | null;
}

export interface NepseGraphProps {
  nepseIndex: NepseIndexIf;
  nepseAdvanceData: NepseAdvanceDataIF;
  api: any; // pass your api instance as prop
  getUnixTimeInterval: (interval: string) => string;
}

const COLORS = {
  background: '#111',
  card: '#222',
  text: '#fff',
  subtext: '#aaa',
  adv: '#10b981',
  decl: '#ef4444',
  unch: '#2C9CDB',
  up: '#16a34a',
  down: '#ef4444',
  indicator: '#00C49F',
};
const BORDER_RADIUS = 24;
const CARD_RADIUS = 12;
const PADDING = 16;
const GRAPH_HEIGHT = 180;
const INTERVALS = ['1D', '1W', '1M', '1Y'];

const NepseGraph: React.FC<NepseGraphProps> = ({
  nepseIndex,
  nepseAdvanceData,
  api,
  getUnixTimeInterval,
}) => {
  const [selectInterval, setSelectInterval] = useState<
    '1D' | '1W' | '1M' | '1Y'
  >('1D');
  const [nepseData, setNepseData] = useState<ChartDataItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectPoint, setSelectPoint] = useState<GraphPoint | null>(null);
  const router = useRouter();

  // Fetch data on interval change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let res;
        if (selectInterval === '1D') {
          res = await api.get('sector/market_chart_data_minute_one_day/1');
          // console.log('Fetching 1D data', JSON.stringify(res.data, null, 2));
        } else {
          const time = getUnixTimeInterval(selectInterval);
          res = await api.get(`/company/chart_data/1/${time}`);
          // console.log('Fetching 1D data', JSON.stringify(res.data, null, 2));
        }
        setNepseData(res.data.data || []);
      } catch (error) {
        setNepseData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectInterval, api, getUnixTimeInterval]);

  // Memoize points
  const points: GraphPoint[] = useMemo(
    () =>
      Array.isArray(nepseData)
        ? nepseData
            .filter(
              (item) => typeof item.t === 'string' || typeof item.t === 'number'
            )
            .map((item) => ({
              date: new Date(Number(item.t) * 1000),
              value: item.c,
            }))
        : [],
    [nepseData]
  );

  // Set initial selectPoint to last point when points change
  useEffect(() => {
    if (points.length > 0) {
      setSelectPoint(points[points.length - 1]);
    } else {
      setSelectPoint(null);
    }
  }, [points]);

  // Reset to last point when user stops interacting
  const handlePointSelected = (point: GraphPoint | null) => {
    setSelectPoint(point);
  };

  const handlePointDeselected = () => {
    // Reset to last point when user stops interacting
    if (points.length > 0) {
      setSelectPoint(points[points.length - 1]);
    }
  };

  // console.log('nepseIndex data', JSON.stringify(nepseIndex, null, 2));

  const currentValue = selectPoint?.value ?? nepseIndex?.currentValue ?? '--';

  // Calculate dynamic schange and perChange based on selected point
  let schange = nepseIndex?.schange ?? 0;
  let perChange = nepseIndex?.perChange ?? 0;

  if (selectPoint && points.length > 0) {
    // Find the index of the selected point
    const selectedIndex = points.findIndex(
      (point) =>
        point.date.getTime() === selectPoint.date.getTime() &&
        point.value === selectPoint.value
    );

    if (selectedIndex > 0) {
      // Calculate change from previous point
      const previousPoint = points[selectedIndex - 1];
      schange = selectPoint.value - previousPoint.value;
      perChange =
        previousPoint.value !== 0 ? (schange / previousPoint.value) * 100 : 0;
    } else if (selectedIndex === 0 && nepseIndex?.previousClose) {
      // For first point, calculate from previous close
      schange = selectPoint.value - nepseIndex.previousClose;
      perChange =
        nepseIndex.previousClose !== 0
          ? (schange / nepseIndex.previousClose) * 100
          : 0;
    }
  }

  // Format to 2 decimal places
  const formattedSchange = schange.toFixed(2);
  const formattedPerChange = perChange.toFixed(2);

  const adv = nepseAdvanceData?.advance ?? 0;
  const decl = nepseAdvanceData?.declined ?? 0;
  const unch = nepseAdvanceData?.unchanged ?? 0;

  // Use selected point's date or fallback to generatedTime
  const displayDate =
    selectPoint?.date ??
    (nepseIndex?.generatedTime ? new Date(nepseIndex.generatedTime) : null);
  const formattedDate = displayDate
    ? displayDate.toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    : '';

  return (
    <View
      style={styles.container}
      className="rounded-b-2xl"
      accessibilityLabel="NepseGraphContainer"
    >
      {/* Top Part: Index Info */}
      <Text style={styles.title} accessibilityRole="header">
        NEPSE Index
      </Text>
      <View style={styles.indexRow}>
        <Text style={styles.indexValue}>{currentValue}</Text>
        <View
          style={[
            styles.changeBadge,
            { backgroundColor: schange >= 0 ? COLORS.up : COLORS.down },
          ]}
        >
          <Text style={styles.changeText}>
            {schange >= 0 ? '▲' : '▼'} {formattedSchange} ({formattedPerChange}
            %)
          </Text>
        </View>
      </View>
      <Text style={styles.subtext}>As of {formattedDate}</Text>

      {/* Graph Part */}
      <View style={styles.graphContainer}>
        {isLoading ? (
            <Text>loading</Text>
        ) : points.length > 0 ? (
          <LineGraph
            points={points}
            color={COLORS.text}
            animated
            style={StyleSheet.absoluteFill}
            onPointSelected={handlePointSelected}
            onGestureEnd={handlePointDeselected}
            enablePanGesture
            enableIndicator
            panGestureDelay={0}
            indicatorPulsating
            enableFadeInMask
          />
        ) : (
          <Text style={styles.noDataText}>No data available</Text>
        )}
      </View>

      {/* Interval Selector */}
      <View style={styles.intervalRow}>
        {INTERVALS.map((interval) => (
          <TouchableOpacity
            key={interval}
            onPress={() => setSelectInterval(interval as any)}
            style={[
              styles.intervalButton,
              selectInterval === interval && styles.intervalButtonActive,
            ]}
          >
            <Text
              style={[
                styles.intervalText,
                selectInterval === interval && styles.intervalTextActive,
              ]}
            >
              {interval}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Part: Advance/Decline/Unchanged */}
      {/* <View style={styles.statsRow}>
        <TouchableOpacity
          style={styles.statItem}
          onPress={() =>
            router.push({
              pathname: '/liveData/live-data',
              params: { number: 0 },
            })
          }
        >
          <View style={[styles.dot, { backgroundColor: COLORS.adv }]} />
          <Text style={styles.statText}>ADV:{adv}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.statItem}
          onPress={() =>
            router.push({
              pathname: '/liveData/live-data',
              params: { number: 1 },
            })
          }
        >
          <View style={[styles.dot, { backgroundColor: COLORS.decl }]} />
          <Text style={styles.statText}>DECL:{decl}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.statItem}
          onPress={() =>
            router.push({
              pathname: '/liveData/live-data',
              params: { number: 2 },
            })
          }
        >
          <View style={[styles.dot, { backgroundColor: COLORS.unch }]} />
          <Text style={styles.statText}>UNCH:{unch}</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: PADDING,
  },
  title: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  indexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  indexValue: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: 'bold',
  },
  changeBadge: {
    borderRadius: 12,
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  changeText: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  subtext: {
    color: COLORS.subtext,
    fontSize: 12,
  },
  intervalRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  intervalButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99999,
    marginHorizontal: 4,
  },
  intervalButtonActive: {
    backgroundColor: '#334d59',
  },
  intervalText: {
    color: COLORS.subtext,
    fontWeight: 'bold',
  },
  intervalTextActive: {
    color: COLORS.text,
  },
  graphContainer: {
    height: GRAPH_HEIGHT,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  noDataText: {
    color: COLORS.subtext,
    fontSize: 14,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.card,
    borderRadius: CARD_RADIUS,
    padding: 8,
    marginBottom: -36,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
  },
  statText: {
    color: COLORS.text,
  },
});

export default NepseGraph;
