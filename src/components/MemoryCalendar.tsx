
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Sample data - in a real app this would come from a database
const initialMemories = [
  {
    id: 1,
    title: 'ファーストシューズ',
    date: '2023-04-15',
    description: '初めて買った靴。お気に入りのブルー。',
    type: 'first'
  },
  {
    id: 2,
    title: '入園式の靴',
    date: '2024-04-01',
    description: '幼稚園の入園式で履いた靴。',
    type: 'event'
  },
];

interface ShoeMemory {
  id: number;
  title: string;
  date: string;
  description: string;
  type: 'first' | 'event' | 'other';
}

interface MemoryCardProps {
  memory: ShoeMemory;
  onDelete: (id: number) => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onDelete }) => {
  return (
    <Card className="mb-4 overflow-hidden">
      <div className={cn(
        "h-2",
        memory.type === 'first' ? "bg-ktoon-primary" : 
        memory.type === 'event' ? "bg-ktoon-accent" : "bg-ktoon-secondary"
      )} />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{memory.title}</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={() => onDelete(memory.id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
        <CardDescription>
          {format(new Date(memory.date), 'yyyy年MM月dd日')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{memory.description}</p>
      </CardContent>
    </Card>
  );
};

interface NewMemoryFormProps {
  onSave: (memory: Omit<ShoeMemory, 'id'>) => void;
  onCancel: () => void;
}

const NewMemoryForm: React.FC<NewMemoryFormProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'first' | 'event' | 'other'>('first');

  const handleSave = () => {
    if (!title || !date) return;
    
    onSave({
      title,
      date: format(date, 'yyyy-MM-dd'),
      description,
      type
    });
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50 mb-4">
      <div className="space-y-2">
        <Label htmlFor="title">タイトル</Label>
        <Input 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          placeholder="ファーストシューズ"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="type">記念の種類</Label>
        <div className="grid grid-cols-3 gap-2">
          <Button 
            type="button" 
            variant={type === 'first' ? 'default' : 'outline'} 
            className={type === 'first' ? 'bg-ktoon-primary' : ''}
            onClick={() => setType('first')}
          >
            初めての靴
          </Button>
          <Button 
            type="button" 
            variant={type === 'event' ? 'default' : 'outline'} 
            className={type === 'event' ? 'bg-ktoon-accent' : ''}
            onClick={() => setType('event')}
          >
            イベント
          </Button>
          <Button 
            type="button" 
            variant={type === 'other' ? 'default' : 'outline'} 
            className={type === 'other' ? 'bg-ktoon-secondary' : ''}
            onClick={() => setType('other')}
          >
            その他
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>日付</Label>
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
      
      <div className="space-y-2">
        <Label htmlFor="description">思い出メモ</Label>
        <Input 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          placeholder="記念すべき靴の思い出..."
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>キャンセル</Button>
        <Button onClick={handleSave}>保存</Button>
      </div>
    </div>
  );
};

const MemoryCalendar: React.FC = () => {
  const [memories, setMemories] = useState<ShoeMemory[]>(initialMemories);
  const [isAddingMemory, setIsAddingMemory] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleAddMemory = (memory: Omit<ShoeMemory, 'id'>) => {
    const newMemory = {
      ...memory,
      id: Date.now() // Simple way to generate unique IDs
    };
    
    setMemories([...memories, newMemory]);
    setIsAddingMemory(false);
  };

  const handleDeleteMemory = (id: number) => {
    setMemories(memories.filter(memory => memory.id !== id));
  };

  // Function to highlight dates with memories
  const getDayClassNames = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const memoryTypes = memories
      .filter(memory => memory.date === dateStr)
      .map(memory => memory.type);
    
    if (memoryTypes.includes('first')) return "bg-ktoon-primary text-white";
    if (memoryTypes.includes('event')) return "bg-ktoon-accent text-white";
    if (memoryTypes.includes('other')) return "bg-ktoon-secondary text-white";
    
    return "";
  };
  
  // Filter memories for the selected date
  const selectedDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const memoriesForSelectedDate = memories.filter(memory => memory.date === selectedDateStr);

  return (
    <div className="p-4 max-w-md mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>記念靴カレンダー</CardTitle>
              <CardDescription>大切な記念日を保存しておきましょう</CardDescription>
            </div>
            <Button size="sm" onClick={() => setIsAddingMemory(!isAddingMemory)}>
              <Plus size={16} className="mr-1" />
              追加
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isAddingMemory && (
            <NewMemoryForm 
              onSave={handleAddMemory}
              onCancel={() => setIsAddingMemory(false)}
            />
          )}

          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="w-full p-0"
            modifiersClassNames={{
              selected: "bg-ktoon-primary text-primary-foreground"
            }}
            modifiers={{
              customModifier: (date) => {
                const dateStr = format(date, 'yyyy-MM-dd');
                return memories.some(memory => memory.date === dateStr);
              }
            }}
            modifiersStyles={{
              customModifier: (date) => {
                const className = getDayClassNames(date);
                if (className) {
                  return { 
                    fontWeight: 'bold',
                    backgroundColor: className.includes('bg-ktoon-primary') ? '#4F46E5' :
                                     className.includes('bg-ktoon-accent') ? '#F43F5E' : '#A5B4FC'
                  };
                }
                return {};
              }
            }}
          />
        </CardContent>
      </Card>

      {selectedDate && (
        <div>
          <h3 className="font-medium text-lg mb-4">
            {format(selectedDate, 'yyyy年MM月dd日')}の記念
          </h3>
          
          {memoriesForSelectedDate.length === 0 ? (
            <p className="text-center py-4 text-gray-500">この日の記録はありません</p>
          ) : (
            memoriesForSelectedDate.map(memory => (
              <MemoryCard 
                key={memory.id} 
                memory={memory} 
                onDelete={handleDeleteMemory} 
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MemoryCalendar;
