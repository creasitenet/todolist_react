import type { Todo } from '../types/todo';
import type { ChangeEvent } from 'react';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
    const handleToggle = (_e: ChangeEvent<HTMLInputElement>) => {
        onToggle(todo.id);
    };

    return (
        <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm mb-2 hover:shadow-md transition-shadow border border-gray-100">
            <label htmlFor={`todo-${todo.id}`} className="flex items-center space-x-3 cursor-pointer flex-1">
                <input
                    id={`todo-${todo.id}`}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggle}
                    className="sr-only peer"
                />
                <div className={
                    `w-4 h-4 rounded border-2 transition-all duration-200
                    ${
                        todo.completed
                            ? 'bg-gray-800 border-gray-800 flex items-center justify-center'
                            : 'bg-white border-gray-300'
                    }`
                }>
                    {todo.completed && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                    )}
                </div>
                <span className={`text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                    {todo.text}
                </span>
            </label>
            <button
                onClick={() => onDelete(todo.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Delete todo"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
}; 