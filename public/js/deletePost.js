const deleteButton = document.getElementById("delete-button")

const deletePostHandler = async () => {
    const postId = post.getAttribute("data-postid")

    const response = await fetch(`/api/blog/${parseInt(postId)}`, {
        method: "DELETE",
    })
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post');
    }
}

deleteButton.addEventListener("click", deletePostHandler)