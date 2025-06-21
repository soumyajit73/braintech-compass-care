
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navbar from '@/components/Navbar';
import { Users, Plus, ArrowUp, User } from 'lucide-react';

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'My Journey with Early Detection',
      content: 'I wanted to share my experience with getting an early diagnosis. The process was scary at first, but the support from this community and the medical team made all the difference...',
      author: 'Anonymous User #247',
      date: '2 days ago',
      category: 'Support',
      upvotes: 24,
      comments: 8,
      hasUpvoted: false
    },
    {
      id: 2,
      title: 'Coping Strategies That Actually Help',
      content: 'After months of trying different approaches, I found some strategies that really work for managing daily challenges. Here are my top 5 tips...',
      author: 'Anonymous User #189',
      date: '3 days ago',
      category: 'Tips',
      upvotes: 31,
      comments: 12,
      hasUpvoted: true
    },
    {
      id: 3,
      title: 'Questions About Treatment Options',
      content: 'I recently received my diagnosis and feeling overwhelmed by all the treatment options. Has anyone here tried the new combination therapy?',
      author: 'Anonymous User #156',
      date: '5 days ago',
      category: 'Questions',
      upvotes: 18,
      comments: 15,
      hasUpvoted: false
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'Support'
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['Support', 'Tips', 'Questions', 'Success Stories', 'General'];

  const handleUpvote = (postId: number) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              upvotes: post.hasUpvoted ? post.upvotes - 1 : post.upvotes + 1,
              hasUpvoted: !post.hasUpvoted 
            }
          : post
      )
    );
  };

  const handleSubmitPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: `Anonymous User #${Math.floor(Math.random() * 1000)}`,
      date: 'Just now',
      category: newPost.category,
      upvotes: 0,
      comments: 0,
      hasUpvoted: false
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: 'Support' });
    setIsModalOpen(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'support': return 'bg-primary-100 text-primary-800';
      case 'tips': return 'bg-secondary-100 text-secondary-800';
      case 'questions': return 'bg-yellow-100 text-yellow-800';
      case 'success stories': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Users className="w-8 h-8 mr-3 text-primary-600" />
                Anonymous Community
              </h1>
              <p className="text-gray-600">A safe space to share experiences, ask questions, and support each other.</p>
            </div>
            
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary-500 hover:bg-primary-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Share Your Story
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary-600" />
                    Share Your Story
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <Input
                      placeholder="Give your post a descriptive title"
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Story
                    </label>
                    <Textarea
                      placeholder="Share your experience, ask questions, or offer support to others..."
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      className="min-h-32 rounded-lg"
                    />
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Remember:</strong> All posts are anonymous to protect your privacy. 
                      Please avoid sharing specific medical details or personal information.
                    </p>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="bg-primary-500 hover:bg-primary-600"
                      onClick={handleSubmitPost}
                      disabled={!newPost.title.trim() || !newPost.content.trim()}
                    >
                      Share Story
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary-50 px-4 py-2">
              All Posts
            </Badge>
            {categories.map(category => (
              <Badge 
                key={category}
                variant="outline" 
                className="cursor-pointer hover:bg-primary-50 px-4 py-2"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Community Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="medical-shadow border-0 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{post.author}</p>
                        <p className="text-sm text-gray-600">{post.date}</p>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                    <Badge className={getCategoryColor(post.category)}>
                      {post.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {post.content}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <button 
                      className={`flex items-center space-x-2 transition-colors ${
                        post.hasUpvoted 
                          ? 'text-primary-600' 
                          : 'text-gray-600 hover:text-primary-600'
                      }`}
                      onClick={() => handleUpvote(post.id)}
                    >
                      <ArrowUp className={`w-5 h-5 ${post.hasUpvoted ? 'fill-current' : ''}`} />
                      <span className="font-medium">{post.upvotes}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-secondary-600 transition-colors">
                      <Users className="w-5 h-5" />
                      <span>{post.comments} comments</span>
                    </button>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-primary-50 hover:border-primary-200"
                  >
                    Thank You
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Guidelines */}
        <Card className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 border-0">
          <CardHeader>
            <CardTitle className="text-xl">Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">✅ Do</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Share your experiences and insights</li>
                  <li>• Offer emotional support to others</li>
                  <li>• Ask questions respectfully</li>
                  <li>• Use encouraging and positive language</li>
                  <li>• Respect others' privacy and choices</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">❌ Don't</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Share specific medical advice</li>
                  <li>• Post personal identifying information</li>
                  <li>• Use inappropriate or offensive language</li>
                  <li>• Promote specific treatments or products</li>
                  <li>• Share others' private information</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Community;
