export interface User {
  id: string;
  name: string;
  image: string | null;
}

export interface Group {
  id: string;
  name: string;
  image: string;
}

export interface Post {
  id: string;
  title: string;
  created_at: string;
  upvotes: number;
  nr_of_comments: number;
  description: string | null;
  image: string | null;
  group: Group;
  user: User;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  parent_id: string | null;
  comment: string;
  created_at: string;
  upvotes: number;
  user: User;
  replies: Comment[];
}