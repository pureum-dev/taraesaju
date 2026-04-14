'use client';

import React, {
    useEffect,
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
    useMemo,
} from 'react';

/** lib */
import _ from 'lodash';
import { EChartsOption } from 'echarts';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {
    LineChart,
    BarChart,
    PieChart,
    RadarChart,
    GaugeChart,
    // ScatterChart,
    // RadarChart,
    // MapChart,
    // TreeChart,
    // TreemapChart,
    // GraphChart,
    // FunnelChart,
    // ParallelChart,
    // SankeyChart,
    // BoxplotChart,
    // CandlestickChart,
    // EffectScatterChart,
    // LinesChart,
    // HeatmapChart,
    // PictorialBarChart,
    // ThemeRiverChart,
    // SunburstChart,
    // CustomChart,
} from 'echarts/charts';

import {
    GridComponent,
    TooltipComponent,
    TitleComponent,
    DatasetComponent,
    LegendComponent,
    // GridSimpleComponent,
    // PolarComponent,
    // RadarComponent,
    // GeoComponent,
    // SingleAxisComponent,
    // ParallelComponent,
    // CalendarComponent,
    // GraphicComponent,
    // ToolboxComponent,
    // AxisPointerComponent,
    // BrushComponent,
    // TimelineComponent,
    // MarkPointComponent,
    // MarkLineComponent,
    // MarkAreaComponent,
    // LegendScrollComponent,
    // LegendPlainComponent,
    // DataZoomComponent,
    // DataZoomInsideComponent,
    // DataZoomSliderComponent,
    // VisualMapComponent,
    // VisualMapContinuousComponent,
    // VisualMapPiecewiseComponent,
    // AriaComponent,
    // TransformComponent,
} from 'echarts/components';

import { CanvasRenderer } from 'echarts/renderers';

/** custom */
import {
    PIE_OPTION,
    LINE_AREA_OPTION,
    RADAR_OPTION,
    GAUGE_OPTION,
    RANK_BAR_OPTION,
    STACK_BAR_OPTION,
} from '@/util/chartOptionConst';

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    LegendComponent,
    LineChart,
    PieChart,
    BarChart,
    RadarChart,
    GaugeChart,
    CanvasRenderer,
]);
echarts.registerTheme('_theme', {});

export type EchartCompRef = ReactEChartsCore | null;

interface ChartOptionProps {
    chartType: 'pie' | 'bar' | 'line' | 'line_area' | 'radar' | 'gauge' | 'rank_bar' | 'stack_bar';
    option?: Record<string, any>;
    data?: Record<string, any>[]; // pie 차트용
}

const EchartComp = forwardRef<EchartCompRef, ChartOptionProps>(
    ({ chartType, option, data }, ref) => {
        const echartRef = useRef<ReactEChartsCore>(null);

        useImperativeHandle(ref, () => {
            if (!echartRef.current) {
                return {} as ReactEChartsCore; // 또는 에러 방지를 위한 빈 객체
            }
            return echartRef.current;
        });

        /*useEffect(() => {
            switch (chartType) {
                case 'pie':
                    const pieChartOption = _.merge(_.cloneDeep(PIE_OPTION), option);
                    setChartOption(pieChartOption);
                    if (data) {
                        pieChartOption.series[0].data = data;
                    }
                    break;

                case 'line_area':
                    const lineAreaChartOption = _.merge(_.cloneDeep(LINE_AREA_OPTION), option);
                    setChartOption(lineAreaChartOption);
                    break;

                case 'radar':
                    const radarChartOption = _.merge(_.cloneDeep(RADAR_OPTION), option);
                    setChartOption(radarChartOption);
                    break;

                case 'gauge':
                    const gaugeChartOption = _.merge(_.cloneDeep(GAUGE_OPTION), option);
                    setChartOption(gaugeChartOption);
                    if (data) {
                        gaugeChartOption.series[0].data = data;
                    }
                    break;

                case 'rank_bar':
                    const rankBarChartOption = _.merge(_.cloneDeep(RANK_BAR_OPTION), option);
                    setChartOption(rankBarChartOption);
                    break;

                case 'stack_bar':
                    const stackBarChartOption = _.merge(_.cloneDeep(STACK_BAR_OPTION), option);
                    setChartOption(stackBarChartOption);
                    break;
                default:
            }
        }, [chartType, option, data]);*/

        const chartOption = useMemo(() => {
            switch (chartType) {
                case 'pie':
                    const pieChartOption = _.merge(_.cloneDeep(PIE_OPTION), option);
                    if (data) {
                        pieChartOption.series[0].data = data;
                    }
                    return pieChartOption;

                case 'line_area':
                    const lineAreaChartOption = _.merge(_.cloneDeep(LINE_AREA_OPTION), option);
                    return lineAreaChartOption;

                case 'radar':
                    const radarChartOption = _.merge(_.cloneDeep(RADAR_OPTION), option);
                    return radarChartOption;

                case 'gauge':
                    const gaugeChartOption = _.merge(_.cloneDeep(GAUGE_OPTION), option);
                    if (data) {
                        gaugeChartOption.series[0].data = data;
                    }
                    return gaugeChartOption;

                case 'rank_bar':
                    const rankBarChartOption = _.merge(_.cloneDeep(RANK_BAR_OPTION), option);
                    return rankBarChartOption;

                case 'stack_bar':
                    const stackBarChartOption = _.merge(_.cloneDeep(STACK_BAR_OPTION), option);
                    return stackBarChartOption;
                default:
                    return {};
            }
        }, [chartType, option, data]);

        return (
            chartOption && (
                <ReactEChartsCore
                    ref={(instance) => {
                        echartRef.current = instance;
                    }}
                    style={{ width: '100%', height: '100%' }}
                    echarts={echarts}
                    option={chartOption}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={'_theme'}
                />
            )
        );
    },
);

EchartComp.displayName = 'EchartComp';
export default EchartComp;
