import React, { FC, useState } from 'react';
import { reverseArray } from '../utils/arrayUtils';
import './css/style.scss';
import { Comment } from './types';

type ReplyBlockType = {
    comment: Comment;
    handleSubmitReply: Function;
};

const ReplyBlock: FC<ReplyBlockType> = ({ comment, handleSubmitReply }) => {
    const [textAreaValue, setTextAreaValue] = useState<string>('');

    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setTextAreaValue(value);
    };
    const handleSubmit = () => {
        handleSubmitReply(comment.id, textAreaValue);
        setTextAreaValue('');
    };

    return (
        <div className="message__wrapper">
            <h3>Comment {comment.id}</h3>
            <p>{comment.comment}</p>
            <h3 className="reply__title">Reply</h3>
            {reverseArray(comment.replies).map((reply: string, replyIndex: number) => (
                <div className="reply__message" key={replyIndex}>
                    <p>{reply}</p>
                </div>
            ))}

            <textarea
                name={`reply`}
                placeholder="enter something to reply"
                onChange={handleOnChange}
                value={textAreaValue}
            />
            <button type="submit" onClick={handleSubmit}>
                submit
            </button>
        </div>
    );
};

export default ReplyBlock;
