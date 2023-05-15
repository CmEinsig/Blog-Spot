const deleteComment = document.getElementById("delete-Comment-Button")

const deleteCommentButton = async () => {
    const commentId = deleteButton.getAttribute("data-commentid")
    console.log("comment id: " + commentId)

    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    })
    if (response.ok) {
        document.location.reload()
    } else {
        alert('Failed to delete comment');
    }
}

deleteCommentButton.addEventListener("click", deleteComment)