const primaryColor = '#76c7b0';
const secondaryColor = '#d8bfa9';

export const BAR_OPTION = {
    tooltip: {
        trigger: 'item',
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: false,
            backgroundStyle: {
                color: 'rgba(115, 115, 115, 0.1)',
            },
        },
    ],
};

export const PIE_OPTION = {
    tooltip: {
        trigger: 'item',
    },
    /*legend: {
        top: '5%',
        left: 'center',
    },*/
    series: [
        {
            type: 'pie',
            radius: ['25%', '70%'],
            avoidLabelOverlap: true,
            padAngle: 2,
            itemStyle: {
                borderRadius: 10,
            },
            label: {
                show: true,
                position: 'inside',
                overflow: 'truncate',
                alignTo: 'none',
                fontSize: 18,
                fontWeight: 'bold',
                formatter: (params: any) => {
                    // value가 0이면 label 숨김
                    return params.value === 0 ? '' : `${params.name}`;
                },
            },
            labelLine: {
                show: false,
            },
            emphasis: {
                itemStyle: {
                    opacity: 1,
                },
                label: {
                    show: true,
                    fontWeight: 'bold',
                },
            },
            encode: {
                value: 'value',
                itemName: 'name',
            },
            data: [{}],
        },
    ],
};

export const LINE_AREA_OPTION = {
    color: [primaryColor, secondaryColor],
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
    },
    yAxis: {
        type: 'value',
        max: 100,
    },
    series: [
        {
            data: [],
            type: 'line',
            areaStyle: {
                color: primaryColor,
                opacity: 0.4,
            },
        },
    ],
};

export const RADAR_OPTION = {
    color: [primaryColor, secondaryColor],
    radar: {
        indicator: [],
        axisName: {
            color: '#a0a1a1',
        },
        splitLine: {
            lineStyle: {
                color: ['rgba(118, 199, 176, 0.2)'],
            },
        },
        splitArea: {
            areaStyle: {
                color: ['rgba(250,250,250,0.3)', 'rgba(138, 206, 186, 0.1)'],
                shadowBlur: 0,
            },
        },
    },
    series: [
        {
            type: 'radar',
            symbol: 'none',

            areaStyle: { color: primaryColor, opacity: 0.4 },
            data: [{}],
        },
    ],
};

export const RANK_BAR_OPTION = {
    color: [primaryColor, secondaryColor],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
    },
    legend: {},
    xAxis: {
        type: 'value',
        max: 100,
    },
    yAxis: {
        type: 'category',
        data: ['비겁', '식상', '재성', '인성', '관성'],
        inverse: true,
    },
    series: [
        {
            type: 'bar',
            data: [0, 0, 0, 0, 0],
            backgroundStyle: {
                color: 'rgba(115, 115, 115, 0.1)',
            },
        },
    ],
};

export const STACK_BAR_OPTION = {
    color: [primaryColor, secondaryColor],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
    },
    legend: {
        show: false,
    },
    xAxis: {
        type: 'category',
        max: 100,
    },
    yAxis: {
        type: 'category',
        data: [''],
        axisLabel: false,
    },
    series: [
        {
            name: 'Direct',
            type: 'bar',
            stack: 'total',
            backgroundStyle: {
                color: 'rgba(115, 115, 115, 0.1)',
            },
            label: {
                show: true,
            },
            emphasis: {
                focus: 'series',
            },
            data: [0],
        },
    ],
};
