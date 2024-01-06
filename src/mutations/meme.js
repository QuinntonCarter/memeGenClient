import { gql } from "@apollo/client";

// const DELETE_MEME = gql`
//   mutation deleteMeme($id: ID!) {
//     deleteMeme(id: $id) {
//     }
//   }
// `;

const ADD_MEME = gql`
  mutation addMeme($imgSrc: String!, $initialUrl: String!, $_api_id: String!) {
    addMeme(imgSrc: $imgSrc, initialUrl: $initialUrl, _api_id: $_api_id) {
      imgSrc
      initialUrl
      _api_id
      id
      created
    }
  }
`;

export { ADD_MEME };
