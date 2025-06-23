import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CreateBlog from "./CreateBlog"

describe("<CreateBlog />", () => {
  test("calls handleCreation with correct data when form is submitted", async () => {
    const handleCreation = vi.fn()
    const user = userEvent.setup()

    render(<CreateBlog handleCreation={handleCreation} />)

    const inputs = screen.getAllByRole("textbox")
    const [titleInput, authorInput, urlInput] = inputs
    const submitButton = screen.getByText("create")

    await user.type(titleInput, "My Test Blog")
    await user.type(authorInput, "Jane Doe")
    await user.type(urlInput, "http://example.com")
    await user.click(submitButton)

    expect(handleCreation).toHaveBeenCalledTimes(1)
    expect(handleCreation.mock.calls[0][0]).toEqual({
      title: "My Test Blog",
      author: "Jane Doe",
      url: "http://example.com",
    })
  })
})
