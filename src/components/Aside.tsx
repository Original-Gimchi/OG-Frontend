import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { changeKor } from 'util/changeKor';
import '../style/components-style/Aside.scss';

interface Docs {
    title: string,
    docsType: string,
    id: number,
}

const Aside = () => {
    const [lastModifiedDocs, setLastModifiedDocs] = useState([]);

    useEffect(() => {
        axios.get('/docs/find/modified')
            .then((res) => {
                setLastModifiedDocs(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <div className='aside-wrap'>
            <div className='aside-title-box'>
                <span>최근 수정된 문서</span>
            </div>
            {lastModifiedDocs.map((docs: Docs) => (
                <div className='aside-doc-box' key={docs.id}>
                    <Link to={`/docs/${docs.id}`} className='list'>{docs.title.length < 10 ? docs.title : `${docs.title.slice(0, 10)}...`} ({changeKor(docs.docsType)})</Link>
                </div>
            ))}
        </div>
    );
};

export default Aside;