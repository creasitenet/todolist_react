import { TodoList } from './components/TodoList';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto py-8">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
