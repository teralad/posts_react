export const API =  {
    getPosts: async () => {
        return await fetch('https://jsonplaceholder.typicode.com/posts')
    },
    deletePost: async (msg, id) => {
        return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'delete',
            body: JSON.stringify(msg),
            headers: {'Content-type': 'application/json'}
        })
    },
    updatePost: async (postId, updatePost) => {
        return await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, 
        {
            method: 'PATCH',
            body: JSON.stringify(updatePost),
            headers: {'Content-type': 'application/json'}

        })
    }   
}