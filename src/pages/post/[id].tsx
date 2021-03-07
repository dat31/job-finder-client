import { useRouter } from "next/router";
import useLoadPostDetail from "../../hooks/useLoadPostDetail";

function Post() {
    const router = useRouter()
    const { id: postId } = router.query
    const { data } = useLoadPostDetail( postId )
    console.log( 'POST DETAIL', data )
    return 'post'
}

export default Post
