import React from 'react';
import { useHottestJobQuery, usePostsQuery } from "../graphql/queries";
import Link from "next/link";
import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import { ChevronDownIcon, ChevronUpIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useVoteMutation } from "../graphql/mutations";
import useDeletePostMutation from "../graphql/mutations/useDeletePostMutation";
import withApollo from "../withApollo";
import PageContainer from "../components/shared/PageContainer";
import JobFilter from "../components/shared/JobFilter";

function App() {

    const {
        data,
        fetchMore,
    } = usePostsQuery( {
        variables: {
            top: 33
        }
    } )

    const { data: jobs } = useHottestJobQuery()

    console.log( 'DATA', jobs )

    const [ vote ] = useVoteMutation()
    const [ deletePost ] = useDeletePostMutation()

    const handleVote = ( postId ) => ( value ) => vote( {
        variables: {
            postId,
            value
        }
    } )

    const handleLoadMoreBtnClick = () => fetchMore( {
        variables: {
            skip: data.posts.posts.length,
            top: 33,
        }
    } )

    const renderPosts = ( post ) => {
        const onVote = handleVote( post.id )
        const { id } = post
        return (
            <Box p={ 5 } shadow="md" key={ id } borderRadius={ 'md' }>
                <IconButton
                    disabled={ post.voteStatus === -1 }
                    onClick={ () => onVote( -1 ) }
                    colorScheme="blue"
                    aria-label="up"
                    icon={ <ChevronDownIcon w={ 6 } h={ 6 }/> }
                />
                <IconButton
                    disabled={ post.voteStatus === 1 }
                    onClick={ () => onVote( 1 ) }
                    colorScheme="blue"
                    aria-label="up"
                    icon={ <ChevronUpIcon w={ 6 } h={ 6 }/> }
                />
                <IconButton
                    onClick={ () => deletePost( { variables: { id } } ) }
                    colorScheme="blue"
                    aria-label="up"
                    icon={ <DeleteIcon w={ 6 } h={ 6 }/> }
                />
                <Link href={ '/post/update/[id]' } as={ `/post/update/${ id }` }>
                    <IconButton
                        colorScheme="blue"
                        aria-label="up"
                        icon={ <EditIcon w={ 6 } h={ 6 }/> }
                    />
                </Link>
                <Link href={ '/post/[id]' } as={ `/post/${ id }` }>
                    <Heading fontSize="xl">{ post.title }</Heading>
                </Link>
                { post.creator.username }
                { post.points }
                <Text mt={ 4 }>{ post.text }</Text>
            </Box>
        )
    }

    return (
        <PageContainer>
            <JobFilter/>
            <Box>
                <Stack spacing={ 6 }>
                    { data
                        ? data.posts.posts.map( renderPosts )
                        : null }
                </Stack>
                { data?.posts?.hasMore
                    ? <Button
                        colorScheme={ 'blue' }
                        onClick={ handleLoadMoreBtnClick }>
                        load more
                    </Button>
                    : null }
            </Box>
        </PageContainer>
    )
}


export default withApollo( { ssr: true } )( App );
