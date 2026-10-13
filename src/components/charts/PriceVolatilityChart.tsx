"use client";

import { useEffect, useRef, useState } from "react";
import type { EChartsType } from "echarts/core";

import { useChartTokens } from "@/lib/chart-tokens";
import type { ChartTokens } from "@/lib/chart-tokens";
import { withAlpha } from "@/lib/color";
import { SAMPLE_SERIES } from "@/lib/sample-series";
import { cn } from "@/lib/utils";

type ChartOption = Parameters<EChartsType["setOption"]>[0];

/**
 * Axis label density. The x axis is a category axis over 180 points, so ECharts'
 * "auto" either packs labels until they collide on a phone or spreads far too
 * many across a wide panel. The count is derived from the measured panel width
 * and capped, so a desktop panel keeps a calm six-label rhythm and a phone drops
 * to four instead of overlapping.
 */
const MAX_AXIS_LABELS = 6;
const AXIS_LABEL_WIDTH = 56; // "MM-DD" in 11px mono, plus breathing room
const NARROW_PANEL = 420;

/** Grid gutter for the y axes: narrower on a phone, where 52px is a third of the panel. */
function gridX(width: number): number {
  return width > 0 && width < NARROW_PANEL ? 34 : 52;
}

function axisLabelInterval(width: number): number {
  const usable = Math.max(120, width - gridX(width) * 2);
  const fits = Math.floor(usable / AXIS_LABEL_WIDTH);
  const wanted = Math.max(2, Math.min(MAX_AXIS_LABELS, fits));
  return Math.max(1, Math.round((SAMPLE_SERIES.length - 1) / wanted) - 1);
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function buildOption(tokens: ChartTokens, width: number): ChartOption {
  const dates = SAMPLE_SERIES.map((point) => point.date);
  const prices = SAMPLE_SERIES.map((point) => point.close);
  const volatility = SAMPLE_SERIES.map((point) => point.volatility);

  const axisLabel = {
    color: tokens.textDim,
    fontFamily: tokens.fontMono,
    fontSize: 11,
  };

  const axisGutter = gridX(width);

  return {
    animation: !prefersReducedMotion(),
    animationDuration: 400,
    grid: { left: axisGutter, right: axisGutter, top: 16, bottom: 28, containLabel: false },
    tooltip: {
      trigger: "axis",
      backgroundColor: tokens.bgElev,
      borderColor: tokens.line,
      borderWidth: 1,
      padding: [8, 12],
      extraCssText: `border-radius: ${tokens.radius}; box-shadow: none;`,
      textStyle: { color: tokens.text, fontFamily: tokens.fontMono, fontSize: 12 },
      axisPointer: { type: "line", lineStyle: { color: tokens.line } },
    },
    xAxis: {
      type: "category",
      data: dates,
      boundaryGap: false,
      axisLine: { lineStyle: { color: tokens.line } },
      axisTick: { show: false },
      axisLabel: {
        ...axisLabel,
        interval: axisLabelInterval(width),
        formatter: (value: string) => value.slice(5),
      },
    },
    yAxis: [
      {
        type: "value",
        scale: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel,
        splitLine: { lineStyle: { color: tokens.line, opacity: 0.6 } },
      },
      {
        type: "value",
        scale: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel,
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: "Sample price (rebased to 100)",
        type: "line",
        data: prices,
        showSymbol: false,
        sampling: "lttb",
        lineStyle: { width: 1.5, color: tokens.teal },
        itemStyle: { color: tokens.teal },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: withAlpha(tokens.teal, 0.28) },
              { offset: 1, color: withAlpha(tokens.teal, 0) },
            ],
          },
        },
      },
      {
        name: "Sample volatility (% ann.)",
        type: "line",
        yAxisIndex: 1,
        data: volatility,
        showSymbol: false,
        sampling: "lttb",
        lineStyle: { width: 1.5, color: tokens.periwinkle },
        itemStyle: { color: tokens.periwinkle },
      },
    ],
  };
}

export interface PriceVolatilityChartProps {
  className?: string;
}

/**
 * Sample price and volatility panel. ECharts is imported lazily inside the
 * effect, so the charting library is code-split out of the initial bundle and
 * only arrives when this panel mounts. Colours come from `useChartTokens`, so
 * the drawing is re-made from tokens on every theme switch.
 */
export function PriceVolatilityChart({ className }: PriceVolatilityChartProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<EChartsType | null>(null);
  /** Measured panel width; the axis label density and grid gutters follow it. */
  const [width, setWidth] = useState(0);
  const tokens = useChartTokens();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    let disposed = false;
    let instance: EChartsType | null = null;
    let resizeObserver: ResizeObserver | null = null;

    void (async () => {
      const [core, charts, components, renderers] = await Promise.all([
        import("echarts/core"),
        import("echarts/charts"),
        import("echarts/components"),
        import("echarts/renderers"),
      ]);

      if (disposed) {
        return;
      }

      core.use([charts.LineChart, components.GridComponent, components.TooltipComponent, renderers.CanvasRenderer]);

      instance = core.init(host, undefined, { renderer: "canvas" });
      resizeObserver = new ResizeObserver(() => {
        instance?.resize();
        setWidth(host.clientWidth);
      });
      resizeObserver.observe(host);
      setWidth(host.clientWidth);
      setChart(instance);
    })();

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      instance?.dispose();
      setChart(null);
    };
  }, []);

  useEffect(() => {
    if (!chart || !tokens || !width) {
      return;
    }
    // `true` replaces the option outright, so no colour from the previous theme
    // can survive the switch.
    chart.setOption(buildOption(tokens, width), true);
  }, [chart, tokens, width]);

  return (
    <div
      ref={hostRef}
      className={cn("size-full", className)}
      role="img"
      aria-label="Sample chart: a synthetic price series with its 20-day annualised volatility."
    />
  );
}