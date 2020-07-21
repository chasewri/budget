import React from 'react'

function CategoryForm({ handleSubmit, setName, name}) {
    return (
        <>

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

  <button type="submit" className="btn btn-lg btn-light button">
    Create Cateogry
  </button>
</form>
            
        </>
    )
}

export default CategoryForm
