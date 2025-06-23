import React from "react"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"

describe("Blog component tests", () => {
  const blog = {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: {
      username: "test",
      name: "test",
    },
  }

  test("renders content without url and likes by default", () => {
    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector(".blog")
    expect(div).toHaveTextContent(
      "Go To Statement Considered Harmful Edsger W. Dijkstra",
    )
  })
})
