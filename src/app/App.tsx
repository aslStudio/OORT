import {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";

import {useTelegram} from "@/shared/lib/hooks/useTelegram";
import {KeyboardOffsetProvider} from "@/shared/lib/providers";

import { RouterView } from './router'
import { StoreProvider } from './store'
import { TabBar } from '@/widgets/TabBar';

function App() {
    const { expand, disableVerticalSwipes } = useTelegram()

    useEffect(() => {
        expand()
        disableVerticalSwipes()
    });

    return (
        <StoreProvider>
            <KeyboardOffsetProvider>
                <BrowserRouter>
                    <RouterView />
                    <TabBar />
                </BrowserRouter>
            </KeyboardOffsetProvider>
        </StoreProvider>
    );
}

export default App;
