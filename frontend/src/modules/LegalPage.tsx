import React from 'react';
import { Card } from '../components/ui/Card';

export const LegalPage = ({ title, content }: { title: string, content: string }) => {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-display font-bold text-deepPalm">{title}</h1>
      <Card className="p-8 prose prose-slate">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Card>
    </div>
  );
};
