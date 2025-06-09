import { useState } from 'react';
import type { FormEvent } from 'react';

interface AddTodoProps {
    onAdd: (text: string) => void;
}

export const AddTodo = ({ onAdd }: AddTodoProps) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim());
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Ajouter une nouvelle tâche..."
                    className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 bg-white"
                />
                <button
                    type="submit"
                    disabled={!text.trim()}
                    className="px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Ajouter
                </button>
            </div>
        </form>
    );
}; 