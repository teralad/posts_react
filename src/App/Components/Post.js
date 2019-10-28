import React, { useState } from 'react'
import Spinner from './Spinner'
import {API} from '../Apis'

const Post  = (props) => {
    
    const [title, setTitle] = useState(props.msg.title)
    const [body, setBody] = useState(props.msg.body)
    const [isEdit, setIsEdit] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)

    const update = () => {
        if(title.length > 0 && body.length > 0) {            
            setIsShow(true)

            API.updatePost(props.msg.id, {
                userId: props.msg.userId,
                body,
                title
            }).then(res => res.json())
            .then(post => {
                setTitle(post.title)
                setBody(post.body)
                setIsEdit(false)
                setIsShow(false)
                }).catch(err => console.log(err))
        }
    }
    
    const deletePost = () => {
        let msg = Object.assign({},props.msg)
        delete msg.id
        setIsShow(true)
        API.deletePost(msg, props.msg.id).then(res => {props.updatePosts(); setIsDeleted(true);  setIsShow(false)}).catch(err => console.log(err))
    }

        return (
            !isDeleted && <div className="post">
                <Spinner show={isShow}/>
                <div className="info">
                    <div className="user"><span></span></div>
                    <div className="title">{
                        (isEdit ? 
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> 
                            : "User " + props.msg.userId  + " - " +title)}
                        </div>
                </div>
                <div className="msg-body">
                    <div className="content">
                        {(isEdit ? <textarea value={body} onChange={(e) => setBody(e.target.value)} /> : body)}
                    </div>
                </div>
                <div className="action-buttons">
                    {isEdit ? <><button className="btn btn-primary" onClick={() => update()}>Update</button>
                    <button className="btn btn-danger" onClick={() => setIsEdit(false)}>Cancel</button> </>
                    : <><button className="btn btn-primary" onClick={() => setIsEdit(true)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => deletePost()}>Delete</button></>}
                </div>
            </div>
        )
    
}
export default Post