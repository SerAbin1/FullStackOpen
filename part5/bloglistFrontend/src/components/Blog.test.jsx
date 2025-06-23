import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

vi.mock("../services/blogs", () => ({
  default: {
    updateLike: vi.fn().mockResolvedValue({
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 6,
      user: "dummy-user-id",
    }),
    deleteBlog: vi.fn().mockResolvedValue(),
  },
}))

import blogService from "../services/blogs"

describe("Blog component tests", () => {
  const blog = {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: {
      id: "dummy-user-id",
      username: "test",
      name: "test",
    },
  }

  const testUser = {
    id: "dummy-user-id",
    username: "robertmartin1",
    name: "Robert Martin",
    password: "password123",
  }

  test("renders content without url and likes by default", () => {
    const { container } = render(
      <Blog blog={blog} user={testUser} setBlogs={() => {}} />,
    )

    const div = container.querySelector(".blog")
    expect(div).toHaveTextContent(
      "Go To Statement Considered Harmful Edsger W. Dijkstra",
    )
    expect(div).not.toHaveTextContent("likes")
    expect(div).not.toHaveTextContent(blog.url)
  })

  test("clicking the button displays url and likes", async () => {
    const { container } = render(
      <Blog blog={blog} user={testUser} setBlogs={() => {}} />,
    )

    const user = userEvent.setup()
    await user.click(screen.getByText("view"))

    const div = container.querySelector(".blog")
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent("likes 5")
  })

  test("Likes event handler called twice if pressed twice", async () => {
    const updateMock = blogService.updateLike
    const setBlogs = vi.fn()

    render(<Blog blog={blog} user={testUser} setBlogs={setBlogs} />)

    const user = userEvent.setup()
    await user.click(screen.getByText("view"))

    const likeButton = screen.getByText("like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateMock).toHaveBeenCalledTimes(2)
  })
})
