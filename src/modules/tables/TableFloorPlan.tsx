import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Plus, Save, Layers, Play, Clock, User, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DraggableTable = ({ table, isEditing, onClick }: { table: any; isEditing: boolean; onClick: () => void }) => {
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
        table.shape === 'round' ? 'rounded-full' : 'rounded-3xl'
      } ${
        table.status === 'AVAILABLE' ? 'bg-white border-green-500 text-green-600 shadow-xl shadow-green-100/50' :
        table.status === 'OCCUPIED' ? 'bg-red-500 border-red-600 text-white shadow-xl shadow-red-200/50' :
        'bg-slate-100 border-slate-300 text-slate-400'
      } ${isEditing ? 'cursor-move ring-2 ring-primary ring-offset-4 scale-105' : 'cursor-pointer hover:scale-110 active:scale-95'}`}
    >
      <span className="text-3xl tracking-tighter">#{table.number}</span>
      <span className="text-[10px] uppercase opacity-60 tracking-widest mt-1">{table.capacity} Seats</span>
      {!isEditing && table.status === 'OCCUPIED' && (
        <div className="absolute -top-2 -right-2 bg-slate-900 text-white text-[8px] px-2 py-1 rounded-full animate-pulse">ACTIVE</div>
      )}
    </div>
  );
};

export const TableFloorPlan: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTable, setSelectedTable] = useState<any>(null);

  const { data: tables } = useQuery({
    queryKey: ['tables'],
    queryFn: () => axios.get('http://localhost:8768/api/v1/tables/').then(res => res.data),
  });

  const updatePosition = useMutation({
    mutationFn: ({ id, x, y }: { id: string; x: number; y: number }) =>
      axios.patch(`http://localhost:8768/api/v1/tables/${id}/position?x=${x}&y=${y}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tables'] }),
  });

  const handleDragEnd = (event: any) => {
    const { active, delta } = event;
    const table = tables.find((t: any) => t.id === active.id);
    if (table) {
      updatePosition.mutate({
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
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Dining Area</h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Live Floor Status & Management</p>
        </div>
        <div className="flex space-x-4">
            <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-10 py-4 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all shadow-2xl flex items-center space-x-3 ${
                    isEditing ? 'bg-slate-900 text-white shadow-slate-300' : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                }`}
            >
                {isEditing ? <><Save size={18} /> <span>Lock Layout</span></> : <><Layers size={18} /> <span>Rearrange</span></>}
            </button>
        </div>
      </header>

      <div className="flex-1 bg-white rounded-[4rem] relative overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        <DndContext onDragEnd={handleDragEnd}>
          {tables?.map((table: any) => (
            <DraggableTable
              key={table.id}
              table={table}
              isEditing={isEditing}
              onClick={() => {
                if (table.status === 'AVAILABLE') {
                  navigate(`/pos?table=${table.id}&number=${table.number}`);
                } else {
                  setSelectedTable(table);
                }
              }}
            />
          ))}
        </DndContext>
      </div>

      <footer className="mt-10 flex items-center justify-between">
            <div className="flex space-x-10">
                <Legend color="bg-green-500" label="Available" />
                <Legend color="bg-red-500" label="In Service" />
                <Legend color="bg-yellow-400" label="Reserved" />
                <Legend color="bg-slate-300" label="Cleaning" />
            </div>
            <div className="bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span>Server Connected</span>
            </div>
      </footer>

      {selectedTable && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-300">
                <div className="p-10 text-center">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-100">
                        <Clock size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-2">Table #{selectedTable.number}</h2>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-8 italic">Currently in service</p>

                    <div className="space-y-3 mb-10">
                        <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <span className="font-black text-[10px] text-slate-400 uppercase tracking-widest">Time Occupied</span>
                            <span className="font-black text-slate-800">42 Minutes</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <span className="font-black text-[10px] text-slate-400 uppercase tracking-widest">Assigned Waiter</span>
                            <div className="flex items-center space-x-2">
                                <User size={14} className="text-primary" />
                                <span className="font-black text-slate-800">John Doe</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setSelectedTable(null)} className="py-5 font-black text-slate-400 uppercase tracking-widest text-xs hover:text-slate-600 transition-colors">Close</button>
                        <button
                            onClick={() => navigate(`/pos?table=${selectedTable.id}&number=${selectedTable.number}`)}
                            className="bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-orange-200 hover:bg-orange-700 transition-all flex items-center justify-center space-x-2"
                        >
                            <LogIn size={18} />
                            <span>View Order</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

const Legend = ({ color, label }: any) => (
    <div className="flex items-center space-x-3 group">
        <div className={`w-4 h-4 rounded-full ${color} shadow-sm group-hover:scale-125 transition-transform`}></div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-600 transition-colors">{label}</span>
    </div>
);
