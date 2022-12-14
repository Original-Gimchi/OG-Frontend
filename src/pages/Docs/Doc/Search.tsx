import axios from 'axios'
import * as C from 'allFiles'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Docs from 'types/docs'
import './Search.scss'
import { changeKor } from 'util/changeKor'

const Search = () => {
    const router = useParams()
    const navigate = useNavigate()
    const [result, setResult] = useState([])
    const [isLoad, setIsLoad] = useState(false)
    useEffect(() => {
        axios.get(`/docs/find/title/${router.result}`)
            .then((res) => {
                console.log(res)
                setResult(res.data)
                setIsLoad(true)
                if (res.data.length === 1) navigate(`/docs/${res.data[0].id}`)
            })
            .catch((err) => {
                console.log(err)
            })
        // eslint-disable-next-line
    }, [router.result])

    return (
        <div>
            <C.Header />
            <div className="search-board-wrap">
                <C.Board>
                    <div className="search-title-box">
                        <span>'{router.result}' 검색결과</span>
                    </div>
                    <div className="classif-box">
                        <C.Classify>검색</C.Classify>
                    </div>
                    <div className="line" />
                    <div className='summary-wrap'>
                        <ul className="search-list">
                            {isLoad ? <>
                                {result.map((result: Docs, index) => (
                                    <li><Link key={index} className="link" to={`/docs/${result.id}`}>{result.title} — ( {changeKor(result.docsType)},{result.enroll} )</Link></li>
                                ))}</> : <div>
                                <span>아직 '{router.result}'라는 문서는 없습니다.</span><br /><br />
                                <Link to='/create' style={{ textDecoration: 'none', color: 'blue' }}>지금 문서를 생성해보세요</Link>
                            </div>
                            }
                        </ul>
                    </div>
                    <C.SubFooter />
                </C.Board>
                <C.ScrollBtn />
                <C.Aside />
            </div>
            <C.Footer />
        </div>
    )
}

export default Search