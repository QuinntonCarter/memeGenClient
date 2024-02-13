import { gql } from "@apollo/client";

export const GET_MEMES = gql`
  query getMemes {
    memes {
      id
      _api_id
      imgSrc
      created
    }
  }
`;
