import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotificationWithTimeout } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) =>
    anecdote.content.includes(filter),
  )
  const dispatch = useDispatch()

  const handleVote = (id, content) => {
    dispatch(vote(id))
    dispatch(setNotificationWithTimeout(`you voted ${content}`))
  }

  return filteredAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
          vote
        </button>
      </div>
    </div>
  ))
}

export default AnecdoteList
