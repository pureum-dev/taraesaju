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
import { EChartsType } from 'echarts';
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
    BAR_OPTION,
    PIE_OPTION,
    LINE_AREA_OPTION,
    RADAR_OPTION,
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

export type EchartCompRef = EChartsType | null;

interface ChartOptionProps {
    chartType: 'pie' | 'bar' | 'line' | 'line_area' | 'radar' | 'rank_bar' | 'stack_bar';
    option?: Record<string, any>;
    data?: Record<string, any>[]; // pie 차트용
}

const EchartComp = forwardRef<EchartCompRef, ChartOptionProps>(
    ({ chartType, option, data }, ref) => {
        const echartRef = useRef<EChartsType>(null);

        useImperativeHandle(ref, () => {
            if (!echartRef.current) {
                return {} as EChartsType; // 또는 에러 방지를 위한 빈 객체
            }
            return echartRef.current;
        });

        const chartOption = useMemo(() => {
            switch (chartType) {
                case 'bar':
                    const barChartOption = _.merge(_.cloneDeep(BAR_OPTION), option);
                    return barChartOption;

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
                        echartRef.current = instance?.getEchartsInstance() ?? null;
                    }}
                    style={{ display: 'flex', flex: 1, width: '100%', height: '100%' }}
                    autoResize={true}
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
