function FilterPills({ options, active, onChange }) {
  return (
    <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`filter-pill ${active === opt ? 'active' : ''}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

export default FilterPills