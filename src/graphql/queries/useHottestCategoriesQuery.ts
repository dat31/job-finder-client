import { gql, useQuery } from "@apollo/client";
import { HottestCategory } from "../../types";

const HOTTEST_CATEGORIES_GQL = gql`
    query {
        hottestCategories {
            title
            numberOfJobs
        }
    }
`

type Response = {
    hottestCategories: HottestCategory[]
}

const useHottestCategoriesQuery = () => useQuery<Response>( HOTTEST_CATEGORIES_GQL )
export default useHottestCategoriesQuery
