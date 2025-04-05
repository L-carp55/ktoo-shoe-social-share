
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Sample data - in a real app this would come from a database
const initialData = [
  { date: '2024-01-01', size: 13 },
  { date: '2024-02-01', size: 13.5 },
  { date: '2024-03-01', size: 14 },
  { date: '2024-04-01', size: 14.5 },
];

interface SizeRecordProps {
  date: string;
  size: number;
  onDelete: () => void;
}

const SizeRecord: React.FC<SizeRecordProps> = ({ date, size, onDelete }) => {
  const displayDate = new Date(date);
  
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-200">
      <div className="flex-1">
        <p className="font-medium">{format(displayDate, 'yyyy年MM月dd日')}</p>
        <p className="text-sm text-gray-500">{size} cm</p>
      </div>
      <Button variant="outline" size="sm" onClick={onDelete}>削除</Button>
    </div>
  );
};

const GrowthTracker: React.FC = () => {
  const [records, setRecords] = useState(initialData);
  const [newSize, setNewSize] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isAddingRecord, setIsAddingRecord] = useState(false);

  const handleAddRecord = () => {
    if (!newSize || !date) return;
    
    const newRecord = {
      date: format(date, 'yyyy-MM-dd'),
      size: parseFloat(newSize)
    };
    
    setRecords([...records, newRecord]);
    setNewSize('');
    setDate(new Date());
    setIsAddingRecord(false);
  };

  const handleDeleteRecord = (index: number) => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
  };

  // Format data for the chart
  const chartData = records
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(record => ({
      date: format(new Date(record.date), 'MM/dd'),
      size: record.size
    }));

  const config = {
    size: {
      label: "足のサイズ",
      theme: { 
        light: "#4F46E5", 
        dark: "#A5B4FC" 
      }
    },
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>成長グラフ</CardTitle>
          <CardDescription>お子様の足の成長を記録・確認できます</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ChartContainer config={config}>
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                <Line type="monotone" dataKey="size" stroke="#4F46E5" name="size" strokeWidth={2} dot={{ r: 4 }} />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          className="bg-white border shadow-lg p-2 rounded"
                          payload={payload}
                        />
                      );
                    }
                    return null;
                  }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>足サイズ記録</CardTitle>
            <CardDescription>過去の測定履歴</CardDescription>
          </div>
          <Button size="sm" onClick={() => setIsAddingRecord(!isAddingRecord)}>
            <Plus size={16} className="mr-1" />
            記録を追加
          </Button>
        </CardHeader>
        <CardContent>
          {isAddingRecord && (
            <div className="mb-4 p-4 border rounded-lg bg-gray-50">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="size">足のサイズ (cm)</Label>
                  <Input 
                    id="size" 
                    type="number" 
                    step="0.1" 
                    value={newSize} 
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="14.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label>測定日</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'yyyy年MM月dd日') : "日付を選択"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddingRecord(false)}>キャンセル</Button>
                  <Button onClick={handleAddRecord}>保存</Button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-1">
            {records.length === 0 ? (
              <p className="text-center py-4 text-gray-500">記録がありません</p>
            ) : (
              records
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((record, index) => (
                  <SizeRecord
                    key={index}
                    date={record.date}
                    size={record.size}
                    onDelete={() => handleDeleteRecord(index)}
                  />
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthTracker;
