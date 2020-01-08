import React, {useState, useEffect} from 'react';
import remark from 'remark';
import remark2react from 'remark-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


function EditContainer({text, ...props}){
    return <textarea className="edit" {...props} defaultValue={text} />
}

function ViewContainer({text}){
    return <div className="view">{text}</div>
}

function NoteBox({ note,idx, onDelete }){
    const initialState = window.localStorage.getItem(`note-${idx}`) || '# Hello\n\n ```javascript\nconst text="hi there"\n```';
    const [text, setText] = useState(initialState);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        window.localStorage.setItem(`note-${idx}`, text)
    
        return () => {
          window.localStorage.removeItem(`note-${idx}`)
        }
    }, [text, idx])
    
    const onToggle = () => {
        setEdit(!edit)
    };

    return (
        <div className='container'>
            <div className="header">
                {edit ? (<button className="save-button" onClick={()=> onToggle()}><FontAwesomeIcon icon={faSave} /></button>) : (<button className="edit-button" onClick={()=> onToggle()}><FontAwesomeIcon icon={faEdit} /></button>)}
                <button className="delete-button" onClick={()=> onDelete()}><FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
            {edit ? (
          <EditContainer text={text} onChange={e => setText(e.target.value)} />
        ) : (
          <ViewContainer
            text={
              remark()
                .use(remark2react)
                .processSync(text).contents
            }
          />
        )}
        </div>
    )
}

export default NoteBox;