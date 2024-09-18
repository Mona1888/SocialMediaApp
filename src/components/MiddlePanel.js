import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography, TextField, Button, CircularProgress, List, ListItem, ListItemText, Divider } from '@mui/material';
import { fetchPosts, addComment, editPost, setSearchQuery, setSortBy } from '../postsSlice';

const MiddlePanel = () => {
  const dispatch = useDispatch();
  const { posts, status, searchQuery, sortBy } = useSelector(state => state.posts);
  const [editPostId, setEditPostId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [comment, setComment] = useState('');
  const [page, setPage] = useState(1);
  
 
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);


  
  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target.documentElement;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);


  const filteredPosts = posts.filter(post => post.body.toLowerCase().includes(searchQuery.toLowerCase()));

  
  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  
  const handleEdit = (postId, content) => {
    setEditPostId(postId);
    setEditContent(content);
  };

  const saveEdit = (postId) => {
    dispatch(editPost({ postId, content: editContent }));
    setEditPostId(null);
    setEditContent('');
  };


  const handleAddComment = (postId) => {
    dispatch(addComment({ postId, comment }));
    setComment('');
  };

  if (status === 'loading') {
    return <CircularProgress />;
  }

  return (
    <div>
    
      <TextField
        label="Search Posts"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        fullWidth
        sx={{ mb: 2 }}
      />
      
      
      <Button onClick={() => dispatch(setSortBy('date'))}>Sort by Latest</Button>
      
      
      {sortedPosts.slice(0, page * 10).map((post) => (
        <Card key={post.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            {editPostId === post.id ? (
              <TextField
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                fullWidth
              />
            ) : (
              <Typography variant="body2">{post.body}</Typography>
            )}
            {editPostId === post.id ? (
              <Button onClick={() => saveEdit(post.id)}>Save</Button>
            ) : (
              <Button onClick={() => handleEdit(post.id, post.body)}>Edit</Button>
            )}
            
            <Divider sx={{ my: 2 }} />
            
           
            <Typography variant="h6">Comments</Typography>
            <List>
              {(post.comments || []).map((comment, index) => (
                <ListItem key={index}>
                  <ListItemText primary={comment} />
                </ListItem>
              ))}
            </List>
            
           
            <TextField
              label="Add Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button onClick={() => handleAddComment(post.id)}>Add Comment</Button>
          </CardContent>
        </Card>
      ))}
      
     
      {status === 'loading' && <CircularProgress />}
    </div>
  );
};

export default MiddlePanel;

