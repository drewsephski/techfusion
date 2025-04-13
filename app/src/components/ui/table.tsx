// src/components/ui/table.tsx
import * as React from 'react';
import { Card } from './card';
import { LoadingState } from '@/types/ui';
import { cn } from 'app/lib/utils';

interface TableProps {
  data: any[];
  columns: any[];
  loading?: boolean;
  error?: string;
  className?: string;
}

export function Table({ data, columns, loading, error, className }: TableProps) {
  return (
    <Card className={cn("overflow-x-auto", className)}>
      {loading ? (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">
          {error}
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-2">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-2">
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}