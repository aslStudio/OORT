import React, {useEffect, useState} from "react";
import {Route, Routes, useLocation} from "react-router-dom";

import { Main } from "@/pages/Main/Main"
import { ImageTaskInfo } from "@/pages/ImageTaskInfo/ImageTaskInfo";
import { ImageTask } from "@/pages/ImageTask/ImageTask";

import { RouterPathes } from "@/shared/lib/types";

export const RouterView = React.memo(() => {
    const location = useLocation();

    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState<'fade-in' | 'fade-out'>('fade-in');

    useEffect(() => {
        if (location !== displayLocation) setTransitionStage("fade-out");
    }, [location, displayLocation]);

    return (
        <div
            className={transitionStage}
            onAnimationEnd={() => {
                if (transitionStage === 'fade-out') {
                    setTransitionStage('fade-in')
                    setDisplayLocation(location)
                }
            }}
        >
            <Routes location={displayLocation}>
                <Route 
                    path={RouterPathes.MAIN} 
                    element={<Main />} 
                />
                <Route 
                    path={RouterPathes.PHOTO_TASK_DETAILS} 
                    element={<ImageTaskInfo />} 
                />
                <Route 
                    path={RouterPathes.PHOTO_TASK} 
                    element={<ImageTask />} 
                />
            </Routes>
        </div>
    )
})