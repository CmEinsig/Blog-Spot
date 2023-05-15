const newPost = async (event) => {
    event.preventDefault()

    const title = document.getElementById("title-input").value.trim()
    const content = document.getElementById("content-input").value.trim()

    if (title && content) {
        const response = await fetch("/api/blog", {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" }
        })

        if (response.ok) {
            document.location.replace("/dashboard")
        } else {
            alert("Failed to create new blog post")
        }
    }
}

document.getElementById("create-button").addEventListener("click", newPost)