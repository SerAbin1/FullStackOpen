const addAnecdote = (event) => {
  event.preventDefault()
  const content = event.target.anecdote.value
  event.target.anecdote.value = ""
  dispatch(createAnecdote(content))
}

const AnecdoteForm = () => (
  <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <button>create</button>
    </form>
  </div>
)

export default AnecdoteForm
