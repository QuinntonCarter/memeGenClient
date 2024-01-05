import { gql } from "@apollo/client";

export const GET_MEMES = gql`
  query getMemes {
    memes {
      id
      _api_id
      imgSrc
    }
  }
`;

// const GET_PROJECT = gql`
//   query getProject($id: ID!) {
//     project(id: $id) {
//       id
//       name
//       description
//       status
//       client {
//         id
//         name
//         email
//         phone
//       }
//     }
//   }
// `;
