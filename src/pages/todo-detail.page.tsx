import { useParams } from "react-router";
import { todoApi } from "../api/todoApi";
import { useEffect, useState } from "react";
import type { Todo } from "../types";
import { Spinner } from "../components/spinner";
import { ErrorMessage } from "../components/error";
//nacist a nejakym zposem ukazat ty detaily toho todo
const TodoDetailPage = () => {
    const params = useParams();
    const [todo, setTodo] = useState<Todo>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getTodo = async (id: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const todo = await todoApi.fetchTodo(id);
            setTodo(todo);
        } catch (error) {
            setError("Failed to fetch todo. Please try again later.");
            console.error("Error fetching todo:", error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getTodo(Number(params.id));
    }, [params.id]);

    if (isLoading) {
        return <Spinner />
    } else if (error) {
        <ErrorMessage message={error} />
    } else {
        return (
            <>
                {todo ? (
                    <>
                        <div className="container">
                            <div>{todo.id}</div>
                            <div>{todo.name}</div>
                            <div>{todo.description}</div>
                            <div>{todo.completed ? "Completed" : "Not completed"}</div>
                        </div>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </>
        )
    }
};

export default TodoDetailPage;