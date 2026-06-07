import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const DraggableTable = ({ table }: { table: any }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: table.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    left: `${table.x}px`,
    top: `${table.y}px`,
    width: `${table.width}px`,
    height: `${table.height}px`,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-500';
      case 'OCCUPIED': return 'bg-red-500';
      case 'RESERVED': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`absolute border-2 rounded-lg flex items-center justify-center text-white font-bold cursor-move ${getStatusColor(table.status)}`}
    >
      {table.number}
    </div>
  );
};

export const TableFloorPlan: React.FC = () => {
  const queryClient = useQueryClient();
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
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Table Management</h1>
        <button className="bg-primary text-white px-4 py-2 rounded">Add Table</button>
      </div>
      <div className="flex-1 bg-gray-100 rounded-xl relative overflow-hidden border-2 border-dashed border-gray-300">
        <DndContext onDragEnd={handleDragEnd}>
          {tables?.map((table: any) => (
            <DraggableTable key={table.id} table={table} />
          ))}
        </DndContext>
      </div>
    </div>
  );
};
