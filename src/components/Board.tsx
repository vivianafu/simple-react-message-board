import React, { useState } from 'react';
import { reverseArray } from '../utils/arrayUtils';
import { isExist } from '../utils/objectUtils';
import { DataSourceConfig } from './Config';
import './css/style.scss';
import { getDataSource, setDataSource } from './DataService';
import ReplyBlock from './ReplyBlock';
import { Comments } from './types';

const initMessagesArray: Comments = [];

const Board = () => {
    const [textAreaValue, setTextAreaValue] = useState<string>('');

    const [comments, setComments] = useState<Comments>(() => {
        const storedComments = getDataSource(DataSourceConfig.COMMENTS);

        return storedComments !== null && isExist(storedComments) ? JSON.parse(storedComments) : initMessagesArray;
    });

    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value: inputValue } = event.target;
        setTextAreaValue(inputValue);
    };

    const handleSubmitComment = () => {
        const updatedComments = [
            ...comments,
            { comment: textAreaValue, replies: [], id: (comments.length + 1).toString() }
        ];
        setComments(updatedComments);
        setDataSource(DataSourceConfig.COMMENTS, updatedComments);

        setTextAreaValue('');
    };

    const handleSubmitReply = (commentId: string, reply: string) => {
        const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) comment.replies.push(reply);

            return comment;
        });
        setComments(updatedComments);
        setDataSource(DataSourceConfig.COMMENTS, updatedComments);
    };

    return (
        <div className="board__wrapper">
            <div className="message__wrapper">
                <textarea
                    name="comment"
                    placeholder="leave a comment"
                    onChange={handleOnChange}
                    value={textAreaValue}
                />
                <button type="submit" onClick={handleSubmitComment}>
                    submit
                </button>
            </div>

            {reverseArray(comments).map((comment) => (
                <ReplyBlock comment={comment} handleSubmitReply={handleSubmitReply} key={comment.id} />
            ))}
        </div>
    );
};

export default Board;
