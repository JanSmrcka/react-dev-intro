import { Spinner } from "../components/spinner";
import { ErrorMessage } from "../components/error";
import { useTodoQuery } from "../hooks/useTodoQuery";

const TodoDetailPage = () => {
    const { data: todo, isLoading, error } = useTodoQuery();

    if (isLoading) return <Spinner />;
    if (error || !todo) return <ErrorMessage message="Failed to fetch todo." />;

    return (
        <div className="container">
            <div>{todo.id}</div>
            <div>{todo.name}</div>
            <div>{todo.description}</div>
            <div>{todo.completed ? "Completed" : "Not completed"}</div>
        </div>
    );
};

export default TodoDetailPage;