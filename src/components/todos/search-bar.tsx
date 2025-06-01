import { type ChangeEvent } from 'react'

type SearchBarProps = {
  searchTerm: string
  onSearch: (searchTerm: string) => void
}

export const SearchBar = ({ searchTerm, onSearch }: SearchBarProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  const handleClear = () => {
    onSearch('')
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search tasks..."
        aria-label="Search tasks"
      />
      {searchTerm && (
        <button onClick={handleClear} className="clear-search" aria-label="Clear search">
          ×
        </button>
      )}
    </div>
  )
}
