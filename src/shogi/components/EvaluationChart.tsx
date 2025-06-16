import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/shadcn/chart";
import { Line, LineChart, XAxis, YAxis, ReferenceLine, ResponsiveContainer } from "recharts";
import { EvaluationData } from "@/shogi/hooks/useEvaluationChart";

type EvaluationChartProps = {
  data: EvaluationData[];
};

export const EvaluationChart = ({ data }: EvaluationChartProps) => {
  const chartConfig = {
    evaluation: {
      label: "評価値",
      color: "#2563eb", // blue-600
    },
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>評価値グラフ</CardTitle>
        <div className="text-sm text-muted-foreground">
          <span className="text-blue-600">■</span> プラス: 先手優勢　
          <span className="text-red-600">■</span> マイナス: 後手優勢　
          <span className="text-gray-500">■</span> 0: 互角
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis 
                dataKey="move" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                label={{ value: '手数', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                label={{ value: '評価値', angle: -90, position: 'insideLeft' }}
                domain={[-1000, 1000]}
              />
              <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => [
                      `${Number(value) > 0 ? '+' : ''}${value}`,
                      '評価値'
                    ]}
                    labelFormatter={(label) => `${label}手目`}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="evaluation"
                stroke="var(--color-evaluation)"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};