import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Plus, Save, Layers, Circle, Square, RectangleHorizontal, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTerminology } from '../../hooks/useTerminology';
import { useBusinessStore } from '../../store/businessStore';

const DraggableTable = ({ table, isEditing, onClick, onUpdate }: { table: any; isEditing: boolean; onClick: () => void; onUpdate: (data: any) => void }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: table.id,
    disabled: !isEditing,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    left: `${table.x}px`,
    top: `${table.y}px`,
    width: `${table.width}px`,
    height: `${table.height}px`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isEditing ? { ...listeners, ...attributes } : {})}
      onClick={!isEditing ? onClick : undefined}
      className={`absolute border-4 flex flex-col items-center justify-center font-black transition-all ${
        table.shape === 'round' ? 'rounded-full' : table.shape === 'rectangle' ? 'rounded-xl' : 'rounded-3xl'
      } ${
        table.status === 'AVAILABLE' ? 'bg-white border-green-500 text-green-600 shadow-xl shadow-green-100/50' :
        table.status === 'OCCUPIED' ? 'bg-red-500 border-red-600 text-white shadow-xl shadow-red-200/50' :
        'bg-slate-100 border-slate-300 text-slate-400'
      } ${isEditing ? 'cursor-move ring-2 ring-primary ring-offset-4 scale-105' : 'cursor-pointer hover:scale-110 active:scale-95'}`}
    >
      <span className="text-3xl tracking-tighter">#{table.number}</span>
      {isEditing && (
        <div className="absolute -bottom-10 flex space-x-2 bg-white p-2 rounded-xl shadow-lg border border-slate-100 z-50">
            <button onClick={() => onUpdate({ shape: 'square', width: 120, height: 120 })} className="p-1 hover:text-primary"><Square size={16}/></button>
            <button onClick={() => onUpdate({ shape: 'round', width: 120, height: 120 })} className="p-1 hover:text-primary"><Circle size={16}/></button>
            <button onClick={() => onUpdate({ shape: 'rectangle', width: 180, height: 100 })} className="p-1 hover:text-primary"><RectangleHorizontal size={16}/></button>
        </div>
      )}
    </div>
  );
};

export const TableFloorPlan: React.FC = () => {
  const { mode } = useBusinessStore();
  const t = useTerminology(mode);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const { data: tables } = useQuery({
    queryKey: ['tables'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/tables/').then(res => res.data),
  });

  const updateTable = useMutation({
    mutationFn: ({ id, ...data }: any) => axios.patch(`http://localhost:8768/api/v1/tables/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tables'] }),
  });

  const handleDragEnd = (event: any) => {
    const { active, delta } = event;
    const table = tables.find((t: any) => t.id === active.id);
    if (table) {
      updateTable.mutate({
        id: table.id,
        x: table.x + delta.x,
        y: table.y + delta.y,
      });
    }
  };

  return (
    <div className="p-10 h-screen flex flex-col bg-slate-50 relative overflow-hidden">
      <header className="flex justify-between items-center mb-10 z-10">
        <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">{t('tables')}</h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Live Floor Status & Management</p>
        </div>
        <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-10 py-4 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all shadow-2xl flex items-center space-x-3 ${
                isEditing ? 'bg-slate-900 text-white shadow-slate-300' : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
            }`}
        >
            {isEditing ? <><Save size={18} /> <span>Lock Layout</span></> : <><Layers size={18} /> <span>Rearrange</span></>}
        </button>
      </header>

      <div className="flex-1 bg-white rounded-[4rem] relative overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50">
        <DndContext onDragEnd={handleDragEnd}>
          {tables?.map((table: any) => (
            <DraggableTable
              key={table.id}
              table={table}
              isEditing={isEditing}
              onUpdate={(data) => updateTable.mutate({ id: table.id, ...data })}
              onClick={() => navigate(`/pos?table=${table.id}&number=${table.number}`)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
};
