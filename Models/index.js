const User = require("./User")
const Post = require("./Post")
const Comment = require("./Comment")

//user has many posts, comments
User.hasMany(Post, {
    foreignKey: "user_id"
})

User.hasMany(Comment, {
    foreignKey: "user_id"
})

//user has one post, comments 
Post.belongsTo(User)

Comment.belongsTo(User)

//post has many comments and one comment 
Post.hasMany(Comment, {
    foreignKey: "post_id"
})

Comment.belongsTo(Post)

module.exports = {
    User,
    Post, 
    Comment
}