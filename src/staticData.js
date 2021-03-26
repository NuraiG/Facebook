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
    comments: [
      {
        commentId: 2,
        authorName: "Tom Herzler",
        authorPhoto:
          "https://dthezntil550i.cloudfront.net/1f/latest/1f1812170212508330007997070/494e2362-6d3c-40b3-8bf5-192fcea38a2f.png",
        likes: ["Tom", "George", "Alice"],
        // likes=[];
        content: "I like it",
        images: [],
        timestamp: 1616683161167,
      },
      {
        commentId: 3,
        author: "id",
        authorName: "John Doe",
        authorPhoto: "",
        likes: ["", "", "", ""],
        timestamp: 1616672141135,
        images: [],
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet condimentum sem. Donec blandit lobortis augue, et porta orci vehicula vel. Proin sodales commodo diam, eu hendrerit arcu vestibulum malesuada. Nulla porta odio sed velit iaculis rhoncus. Quisque id metus non felis consequat porttitor id et elit. Nam scelerisque mollis velit eget eleifend. Proin sit amet vulputate nibh.",
      },
      {
        commentId: 4,
        author: "id",
        authorName: "John Doe",
        authorPhoto: "",
        likes: ["", "", "", ""],
        timestamp: 1616672141135,
        images: [],
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet condimentum sem. Donec blandit lobortis augue, et porta orci vehicula vel. Proin sodales commodo diam, eu hendrerit arcu vestibulum malesuada. Nulla porta odio sed velit iaculis rhoncus. Quisque id metus non felis consequat porttitor id et elit. Nam scelerisque mollis velit eget eleifend. Proin sit amet vulputate nibh.",
      },
      {
        commentId: 5,
        author: "id",
        authorName: "John Doe",
        authorPhoto: "",
        likes: [""],
        timestamp: 1616672141135,
        images: [],
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales commodo diam, eu hendrerit arcu vestibulum malesuada. Nulla porta odio sed velit iaculis rhoncus. Quisque id metus non felis consequat porttitor id et elit. Nam scelerisque mollis velit eget eleifend.",
      },
    ],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sit amet condimentum sem. Donec blandit lobortis augue, et porta orci vehicula vel. Proin sodales commodo diam, eu hendrerit arcu vestibulum malesuada. Nulla porta odio sed velit iaculis rhoncus. Quisque id metus non felis consequat porttitor id et elit. Nam scelerisque mollis velit eget eleifend. Proin sit amet vulputate nibh.",
    images: [],
    timestamp: 1616682161167,
  },
];

let currentUser = {
  id: 1,
  profilePic: "",
  firstName: "John",
  lastName: "Doe",
};

export { posts, currentUser };
