import { gql } from "@apollo/client";

// const DELETE_MESSAGE = gql`
//   mutation deleteMessage($id: ID!) {
//     deleteMessage(id: $id) {
//       id
//       name
//       email
//       phone
//     }
//   }
// `;

const ADD_MEME = gql`
  mutation addMeme(
    $imgSrc: String!
    $intialUrl: String!
    $_api_id: String!
    $alias: String!
  ) {
    addMeme(
      imgSrc: $imgSrc
      intialUrl: $intialUrl
      _api_id: $_api_id
      alias: $alias
    ) {
      imgSrc
      intialUrl
      _api_id
      alias
    }
  }
`;

export { ADD_MEME };
