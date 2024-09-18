
import axios from 'axios';

export const fetchUserAndPosts = async () => {
  try {
    
    const userResponse = await axios.get('https://reqres.in/api/users?page=1');
    const userData = userResponse.data.data; 

   
    const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts?userId=1');
    const postsData = postsResponse.data;

    return { users: userData, posts: postsData }; 
  } catch (error) {
    console.error('Error fetching user and posts:', error);
    return { users: [], posts: [] }; 
  }
};
