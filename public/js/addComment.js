const addCommentButton = document.getElementById("add-comment-button")

addCommentButton.addEventListener("click", () => {
    const commentBlock = document.getElementById("commentBlock")

    commentBlock.setAttribute("style", "display:block")
})

const newCommentHandler = async (event) => {
    event.preventDefault()

    const content = document.getElementById("comment-input").value.trim()
    const id = window.location.toString().split("/")[window.location.toString().split("/").length-1]

    if (content) {
        const response = await fetch(`/api/comments/${id}`, {
            method: "POST",
            body: JSON.stringify({ content }),
            headers: { "Content-Type": "application/json" }
        })

        if (response.ok) {
            document.location.reload()
            console.log(response)
        } else {
            alert("Failed to create new comment")
        }
    }
}

document.getElementById("create-button").addEventListener("click", newCommentHandler)