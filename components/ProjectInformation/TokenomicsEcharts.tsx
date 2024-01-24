import React, { createRef, useEffect, useMemo, useState } from "react"
import { useRef } from "react"
import { init, getInstanceByDom, ECharts } from "echarts";

const theme ={}
const settings={}
const TokenomicsEcharts: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chatStyle,setChatStyle] = useState({})
  // const chartRef = createRef<HTMLDivElement>()
  
  const loading = useMemo(()=>chartRef === null,[chartRef?.current])
  const datas = [
    ////////////////////////////////////////
    [
      { name: 'Marketing', value: 5.6 },
      { name: 'Airdrop', value: 1 },
      { name: 'Public Sale', value: 0.8 },
      { name: 'Private Sale', value: 0.5 },
      { name: 'Team', value: 0.5 },
      { name: 'Ecosystem', value: 3.8 },
      { name: 'Treasury', value: 3.8 }
    ]
  ]
  const option = useMemo(()=>{
    if (chartRef.current !== null) {
      const myChart = getInstanceByDom(chartRef.current);
      const myChartWidth = myChart?.getWidth() || 0
      return {
        series: datas.map(function (data, idx) {
          return {
            type: 'pie',
            width:1000,
            height:660,
            radius: [130, 280],
            left: 'center',
            itemStyle: {
            },
            label: {
              alignTo: 'edge',
              formatter: '{name|{b}}\n{time|{c} %}',
              minMargin: 25,
              edgeDistance: 0,
              lineHeight: 30,
              textStyle: {
                color: '#000',
                
                fontWeight: 'normal',
                fontSize: 20
              },
              rich: {
                time: {
                  fontSize: 15,
                  color: '#999'
                }
              }
            },
            // labelLine: {
            //   length: 55,
            //   length2: 50,
            //   maxSurfaceAngle: 180
            // },

            labelLayout: function (params:any) {
              const isLeft = params.labelRect.x < myChartWidth / 2;
              const points = params.labelLinePoints;
              // Update the end point.
              points[2][0] = isLeft
                ? params.labelRect.x
                : params.labelRect.x + params.labelRect.width;
              return {
                labelLinePoints: points
              };
            },
            data: data
          };
        })
      }
    }
    return null
    
  },[chartRef?.current])
  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current);
    }
    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener("resize", resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [chartRef?.current]);


  useEffect(() => {
    // Update chart
    if (chartRef.current !== null && option) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
    }
  }, [option, settings, theme,chartRef?.current]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function
  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
    setTimeout(() => {
      setChatStyle({ width: 1120, height: 693 })
    }, 200);
  }, [loading, chartRef?.current]);
  return <div ref={chartRef} style={chatStyle} />;

}
export default TokenomicsEcharts