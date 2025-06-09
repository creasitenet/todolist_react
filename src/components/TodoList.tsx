import { useState, useRef } from 'react';
import type { TodoFilter } from '../types/todo';
import { AddTodo } from './AddTodo';
import { TodoItem } from './TodoItem';
import { useUserTodos } from '../hooks/useUserTodos';

export const TodoList = () => {
    const [filter, setFilter] = useState<TodoFilter>('all');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
        todos,
        userId,
        addTodo,
        toggleTodo,
        deleteTodo,
        exportTodos,
        importTodos,
        clearTodos
    } = useUserTodos();

    const handleExport = () => {
        const data = exportTodos();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `todos_${userId}_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                if (importTodos(content)) {
                    alert('Importation réussie !');
                } else {
                    alert('Erreur lors de l\'importation. Vérifiez le format du fichier.');
                }
            };
            reader.readAsText(file);
        }
    };

    const filteredTodos = todos.filter(todo => {
        switch (filter) {
            case 'active':
                return !todo.completed;
            case 'completed':
                return todo.completed;
            default:
                return true;
        }
    });

    const remainingTodos = todos.filter(todo => !todo.completed).length;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-extralight text-gray-800 drop-shadow-lg">
                    Ma Liste de Tâches
                </h1>
                <div className="flex gap-1.5">
                    <button
                        onClick={handleExport}
                        className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors border border-gray-200"
                        title="Exporter mes tâches"
                    >
                        Exporter
                    </button>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors border border-gray-200"
                        title="Importer des tâches"
                    >
                        Importer
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImport}
                        accept=".json"
                        className="hidden"
                    />
                    <button
                        onClick={() => {
                            if (window.confirm('Êtes-vous sûr de vouloir effacer toutes vos tâches ?')) {
                                clearTodos();
                            }
                        }}
                        className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors border border-gray-200"
                        title="Effacer toutes les tâches"
                    >
                        Effacer
                    </button>
                </div>
            </div>
            
            <AddTodo onAdd={addTodo} />

            <div className="mb-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                    {remainingTodos} tâche{remainingTodos !== 1 ? 's' : ''} restante{remainingTodos !== 1 ? 's' : ''}
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-2.5 py-1 text-sm rounded-md transition-colors ${
                            filter === 'all'
                                ? 'bg-gray-800 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                        }`}
                    >
                        Tous
                    </button>
                    <button
                        onClick={() => setFilter('active')}
                        className={`px-2.5 py-1 text-sm rounded-md transition-colors ${
                            filter === 'active'
                                ? 'bg-gray-800 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                        }`}
                    >
                        Actifs
                    </button>
                    <button
                        onClick={() => setFilter('completed')}
                        className={`px-2.5 py-1 text-sm rounded-md transition-colors ${
                            filter === 'completed'
                                ? 'bg-gray-800 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                        }`}
                    >
                        Complétés
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                {filteredTodos.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">
                        {filter === 'all'
                            ? 'Aucune tâche pour le moment'
                            : filter === 'active'
                            ? 'Aucune tâche active'
                            : 'Aucune tâche complétée'}
                    </p>
                ) : (
                    filteredTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                        />
                    ))
                )}
            </div>
        </div>
    );
}; 