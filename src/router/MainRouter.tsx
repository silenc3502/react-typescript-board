import React, {lazy, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";

import LazyLoad from './LazyLoad';
import BoardListPage from '../domain/board/page/BoardListPage';

const MainRouters = () => {
    return (
        <>
            <Suspense fallback={<LazyLoad/>}>
                <Routes>
                    {/* 게시판 리스트 */}
                    <Route path="/" element={<BoardListPage />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default MainRouters;