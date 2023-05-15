const beginUpdateButton = document.getElementById("begin-update-button")
const updateButton = document.getElementById("update-button")
const post = document.getElementById("post")

beginUpdateButton.addEventListener("click", () => {
    const updateForm = document.getElementById("updateForm")

    updateForm.setAttribute("style", "display:block")
    post.setAttribute("style", "display:none")
    beginUpdateButton.setAttribute("style", "display:none")
    updateButton.setAttribute("style", "display:block")
})

const updatePostHandler = async (event) => {
    event.preventDefault()

    const title = document.getElementById("title-input").value.trim()
    const content = document.getElementById("content-input").value.trim()
    const postId = post.getAttribute("data-postid")

    if (title && content) {
        const response = await fetch(`/api/blog/${parseInt(postId)}`, {
            method: "PUT",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" }
        })

        if (response.ok) {
            document.location.reload()
        } else {
            alert("Failed to update blog post")
        }
    }
}

updateButton.addEventListener("click", updatePostHandler)