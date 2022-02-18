import { ReactNode } from 'react';
//import { resolveValue } from 'react-hot-toast';

import './style.scss'

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
  key: string;
}
export function Questions({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children
}: QuestionProps) {

  return (

    <>
      <div className={`question ${isAnswered ? 'answered' : ''} ${isHighlighted && !isAnswered ? 'highlighted' : ''}`}>
        <p>{content}</p>
        <footer>
          <div className="user-info">
            <img src={author.avatar} alt={author.name} />
            <span>{author.name}</span>
          </div>
          <div>
            {children}
          </div>
        </footer>
      </div>
    </>
  )
}