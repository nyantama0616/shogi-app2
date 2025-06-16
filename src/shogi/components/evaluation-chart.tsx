import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/shadcn/chart";
import { Line, LineChart, XAxis, YAxis, ReferenceLine, ResponsiveContainer } from "recharts";
import { EvaluationData } from "@/shogi/hooks/useEvaluationChart";

type EvaluationChartProps = {
  data: EvaluationData[];
  currentMove: number;
};

export const EvaluationChart = ({ data, currentMove }: EvaluationChartProps) => {
  const chartConfig = {
    evaluation: {
      label: "評価値",
      color: "#2563eb", // blue-600
    },
  };

  // 現在の手の評価値を取得
  const currentEvaluation = currentMove === 0 
    ? 0 // 0手目（初期局面）は評価値0
    : data[currentMove]?.evaluation ?? 0; // nullの場合は0として扱う

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>評価値グラフ</span>
          <div className="text-sm font-normal border border-gray-300 rounded px-3 py-1 flex items-center gap-2">
            <span className="w-16 border-r border-gray-300 pr-2 text-right">{currentMove}手目</span>
            <span className={`font-medium w-14 text-right ${
              currentEvaluation > 0 
                ? 'text-blue-600' 
                : currentEvaluation < 0 
                  ? 'text-red-600' 
                  : 'text-gray-600'
            }`}>
              {currentEvaluation > 0 ? '+' : ''}{currentEvaluation}
            </span>
          </div>
        </CardTitle>
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
              {/* 現在の手の位置を示す縦線 */}
              <ReferenceLine 
                x={currentMove} 
                stroke="#ef4444" 
                strokeWidth={2}
                strokeDasharray="2 2"
              />
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
                dot={(props) => {
                  const isCurrentMove = props.payload?.move === currentMove;
                  return (
                    <circle
                      key={`dot-${props.payload?.move || props.index}`}
                      cx={props.cx}
                      cy={props.cy}
                      r={isCurrentMove ? 5 : 3}
                      fill={isCurrentMove ? "#ef4444" : "var(--color-evaluation)"}
                      stroke={isCurrentMove ? "#dc2626" : "var(--color-evaluation)"}
                      strokeWidth={isCurrentMove ? 2 : 1}
                    />
                  );
                }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
