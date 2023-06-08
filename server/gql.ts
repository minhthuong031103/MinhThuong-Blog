export function discussionGql(categoryId: string | undefined) {
  return `{
    repository(name: "minhthuong-blog", owner: "minhthuong031103") {
      discussions(first: 100, categoryId: "${categoryId}") {
        nodes {
          title
          url
      number
          bodyHTML
          bodyText
          createdAt
          lastEditedAt
          author {
            login
            url
            avatarUrl
          }
  labels(first:100){
  nodes {
  name
  }
  }
        }
      }
    }
  }`;
}
