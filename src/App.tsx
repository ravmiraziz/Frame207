import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TaskForm } from "./components/TaskForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
        <TaskForm />
      </div>
    </QueryClientProvider>
  );
}
