import React, {lazy, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";

import LazyLoad from './LazyLoad';
import BoardListPage from '../domain/board/page/BoardListPage';
import BoardRegisterPage from "../domain/board/page/BoardRegisterPage";
import BoardReadPage from "../domain/board/page/BoardReadPage";
import BoardModifyPage from '../domain/board/page/BoardModifyPage';

const MainRouters = () => {
    return (
        <>
            <Suspense fallback={<LazyLoad/>}>
                <Routes>
                    {/* 게시판 리스트 */}
                    <Route path="/" element={<BoardListPage />} />
                    {/* 게시판 등록 페이지 */}
                    <Route path="/register" element={<BoardRegisterPage />} />
                    {/* 게시판 상세 페이지 */}
                    <Route path="/read/:boardId" element={<BoardReadPage />} />
                    {/* 게시판 수정 페이지 */}
                    <Route path="/modify/:boardId" element={<BoardModifyPage />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default MainRouters;