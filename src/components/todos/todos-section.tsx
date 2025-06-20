import { TodoForm } from './todo-form-quick'
import { TodoFormDetailed } from './todo-form-detailed'
import { TodoItem } from './todo-item'
import { Spinner } from '../spinner'
import { ErrorMessage } from '../error-message'
import { useTodosQuery } from '../../hooks/useTodosQuery'
import { SearchBar } from './search-bar'
import { useSearchParams } from 'react-router'
import { useTransition } from 'react'
import { useEffect, useState } from 'react'
import React from 'react'

export const TodosSection = () => {
  const { data: todos, error, isLoading, refetch } = useTodosQuery()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || ''
  const [isPending, startTransition] = useTransition()
  const [showSpinner, setShowSpinner] = useState(false)
  const [simulateDelay, setSimulateDelay] = useState(false)
  const [delayedFilteredTodos, setDelayedFilteredTodos] = useState<typeof todos>([])
  const [isFiltering, setIsFiltering] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    if (isLoading || isPending) {
      timeout = setTimeout(() => setShowSpinner(true), 300)
    } else {
      setShowSpinner(false)
    }
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [isLoading, isPending])

  const handleSearch = (term: string) => {
    startTransition(() => {
      const newParams = new URLSearchParams(searchParams)
      if (term) {
        newParams.set('search', term)
      } else {
        newParams.delete('search')
      }
      setSearchParams(newParams)
    })
  }

  useEffect(() => {
    if (simulateDelay) {
      setIsFiltering(true)
      setDelayedFilteredTodos(undefined)
      const timeout = setTimeout(() => {
        setDelayedFilteredTodos(todos?.filter((todo) => todo.name.toLowerCase().includes(searchTerm.toLowerCase())))
        setIsFiltering(false)
      }, 2000)
      return () => {
        clearTimeout(timeout)
        setIsFiltering(false)
      }
    } else {
      setDelayedFilteredTodos(todos?.filter((todo) => todo.name.toLowerCase().includes(searchTerm.toLowerCase())))
      setIsFiltering(false)
    }
  }, [todos, searchTerm, simulateDelay])

  const filteredTodos = todos?.filter((todo) => todo.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <main>
      {error && <ErrorMessage message={error.message} onDissmis={refetch} />}
      <TodoForm />
      <TodoFormDetailed />
      <div style={{ marginBottom: 16 }}>
        <label>
          <input
            type="checkbox"
            checked={simulateDelay}
            onChange={(e) => setSimulateDelay(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          Simulate search delay (show useTransition)
        </label>
      </div>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <div className="todo-container">
        <ul>
          {(simulateDelay ? delayedFilteredTodos : filteredTodos)?.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />
          })}
        </ul>
        {(showSpinner || isFiltering) && <Spinner />}
      </div>
    </main>
  )
}
