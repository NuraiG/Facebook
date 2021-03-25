// for testing only
let posts = [
  {
    postId: 1,
    author: "id",
    authorName: "John Doe",
    authorPhoto: "",
    postTarget: "id2", // where the post was made
    postTargetDesc: "wall", // wall/page/group
    likes: ["id", "id2"],
    comments: [
      {
        commentId: 1,
        author: "id",
        authorName: "John Doe",
        authorPhoto: "",
        likes: [],
        content: "Wow, a comment",
        timestamp: 1616672141135,
        images: [],
      },
    ],
    content: "Wow",
    images: [],
    timestamp: 1616672141132,
  },
  {
    postId: 2,
    author: "id",
    authorName: "John Doe",
    authorPhoto: "",
    postTarget: "id", // where the post was made
    postTargetDesc: "wall", // wall/page/group
    likes: ["id", "id2"],
    comments: [],
    content: "Wow",
    images: [],
    timestamp: 1616672141132,
  },
];

let currentUser = {
    id: 1,
    profilePic: "",
    firstName: "John",
    lastName: "Doe",
  };

export { posts, currentUser }