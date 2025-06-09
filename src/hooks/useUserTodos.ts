import { useState, useEffect } from 'react';
import type { Todo, UserData, ExportData } from '../types/todo';

const USER_ID_KEY = 'todo_user_id';
const USER_DATA_KEY = 'todo_user_data';
const APP_VERSION = '1.0.0';

const generateUserId = (): string => {
    return 'user_' + Math.random().toString(36).substr(2, 9);
};

const getUserId = (): string => {
    let userId = localStorage.getItem(USER_ID_KEY);
    if (!userId) {
        userId = generateUserId();
        localStorage.setItem(USER_ID_KEY, userId);
    }
    return userId;
};

export const useUserTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [userId] = useState(getUserId);

    // Charger les todos au démarrage
    useEffect(() => {
        const loadTodos = () => {
            const userData = localStorage.getItem(`${USER_DATA_KEY}_${userId}`);
            if (userData) {
                const parsedData: UserData = JSON.parse(userData);
                // Convertir les dates string en objets Date
                parsedData.todos = parsedData.todos.map(todo => ({
                    ...todo,
                    createdAt: new Date(todo.createdAt)
                }));
                setTodos(parsedData.todos);
            }
        };
        loadTodos();
    }, [userId]);

    useEffect(() => {
        const userData: UserData = {
            userId,
            todos,
            lastUpdated: new Date()
        };
        localStorage.setItem(`${USER_DATA_KEY}_${userId}`, JSON.stringify(userData));
    }, [todos, userId]);

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date()
        };
        setTodos(prev => [...prev, newTodo]);
    };

    const toggleTodo = (id: number) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const exportTodos = (): string => {
        const exportData: ExportData = {
            todos,
            exportDate: new Date(),
            version: APP_VERSION
        };
        return JSON.stringify(exportData, null, 2);
    };

    const importTodos = (jsonData: string): boolean => {
        try {
            const data: ExportData = JSON.parse(jsonData);
            if (data.version !== APP_VERSION) {
                console.warn('Version différente détectée, certaines fonctionnalités pourraient ne pas être compatibles');
            }
            // Convertir les dates string en objets Date
            const importedTodos = data.todos.map(todo => ({
                ...todo,
                createdAt: new Date(todo.createdAt)
            }));
            setTodos(importedTodos);
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'importation des todos:', error);
            return false;
        }
    };

    const clearTodos = () => {
        setTodos([]);
    };

    return {
        todos,
        userId,
        addTodo,
        toggleTodo,
        deleteTodo,
        exportTodos,
        importTodos,
        clearTodos
    };
}; 