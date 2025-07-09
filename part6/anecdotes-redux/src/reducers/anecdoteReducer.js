import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"
import { useSelector } from "react-redux"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateVote(state, action) {
      const id = action.payload.id
      return state.map(a => a.id != id ? a : action.payload)
    }
  },
})

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const anecdote = anecdotes.find((a) => a.id == id)
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const updatedAnecdote = await anecdoteService.updateVote(id, newAnecdote)
    dispatch(updateVote(updatedAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const { appendAnecdote, setAnecdotes, updateVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
