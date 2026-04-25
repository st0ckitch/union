import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

export type SpecsObject = Record<string, string>;

interface Props {
  value: SpecsObject;
  onChange: (next: SpecsObject) => void;
}

const COMMON_KEYS = [
  'thickness', 'material', 'finish', 'hinges', 'lock', 'max_size', 'opening_angle',
  'gasket', 'sealer', 'frame', 'made_in', 'weight', 'soundproofing',
];

/**
 * Key/value editor for the products.specifications JSONB column.
 * Stores everything as strings — numbers and booleans get cast to text on save.
 */
export function SpecificationsEditor({ value, onChange }: Props) {
  const entries = Object.entries(value || {});
  const [newKey, setNewKey] = useState('');

  const addRow = (key?: string) => {
    const k = (key || newKey).trim();
    if (!k) return;
    if (value[k] !== undefined) return;
    onChange({ ...value, [k]: '' });
    setNewKey('');
  };

  const updateValue = (k: string, v: string) => {
    onChange({ ...value, [k]: v });
  };

  const renameKey = (oldKey: string, newKeyVal: string) => {
    if (!newKeyVal.trim() || newKeyVal === oldKey) return;
    const next: SpecsObject = {};
    for (const [k, v] of entries) {
      next[k === oldKey ? newKeyVal.trim() : k] = v;
    }
    onChange(next);
  };

  const removeRow = (k: string) => {
    const next = { ...value };
    delete next[k];
    onChange(next);
  };

  return (
    <div className="space-y-3 border rounded-lg p-4 bg-gray-50/50">
      <div className="flex items-center justify-between">
        <Label className="font-medium">Specifications</Label>
        <span className="text-xs text-gray-500">{entries.length} {entries.length === 1 ? 'field' : 'fields'}</span>
      </div>

      {entries.length > 0 && (
        <div className="space-y-2">
          {entries.map(([key, val]) => (
            <div key={key} className="grid grid-cols-[1fr,1fr,auto] gap-2 items-center">
              <Input
                defaultValue={key}
                onBlur={(e) => renameKey(key, e.target.value)}
                placeholder="key"
                className="font-mono text-xs"
              />
              <Input
                value={val ?? ''}
                onChange={(e) => updateValue(key, e.target.value)}
                placeholder="value"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-red-600 h-8 w-8"
                onClick={() => removeRow(key)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add row */}
      <div className="flex gap-2 pt-2 border-t">
        <Input
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="new key (e.g. thickness, material, finish)"
          className="font-mono text-xs"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addRow();
            }
          }}
        />
        <Button type="button" size="sm" variant="outline" onClick={() => addRow()}>
          <Plus className="h-3 w-3 mr-1" /> Add
        </Button>
      </div>

      {/* Quick-add common keys */}
      <div className="flex flex-wrap gap-1 pt-1">
        {COMMON_KEYS.filter((k) => value[k] === undefined).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => addRow(k)}
            className="text-[11px] font-mono px-2 py-0.5 rounded border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-colors"
          >
            + {k}
          </button>
        ))}
      </div>
    </div>
  );
}
