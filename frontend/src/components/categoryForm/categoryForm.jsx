import React from 'react'

function CategoryForm({title, handleSubmit, setName, name}) {
    return (
        <>



<h2>{title}</h2>

<form onSubmit={handleSubmit}>
  <h3>Create a category</h3>
  <div className="form-group">
    <label htmlFor="name">Category Name</label>
    <input
      type="text"
      className="form-control"
      placeholder="Enter category name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>

  <button type="submit" className="btn btn-lg btn-light">
    Create Cateogry
  </button>
</form>
            
        </>
    )
}

export default CategoryForm
