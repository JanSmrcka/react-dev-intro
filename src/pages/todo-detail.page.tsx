import { useParams } from "react-router";
import { todoApi } from "../api/todoApi";
import { Spinner } from "../components/spinner";
import { ErrorMessage } from "../components/error";
import { useQuery } from "@tanstack/react-query";

const TodoDetailPage = () => {
    const params = useParams();

    const { data: todo, isLoading, error } = useQuery({
        queryKey: ["todo", params.id],
        queryFn: () => todoApi.fetchTodo(Number(params.id)),
        enabled: !!params.id,
    });

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