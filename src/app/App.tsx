import {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";

import {useTelegram} from "@/shared/lib/hooks/useTelegram";
import {KeyboardOffsetProvider, TabBarProvider} from "@/shared/lib/providers";

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
            <TabBarProvider>
                <KeyboardOffsetProvider>
                    <BrowserRouter>
                        <RouterView />
                        <TabBar />
                    </BrowserRouter>
                </KeyboardOffsetProvider>
            </TabBarProvider>
        </StoreProvider>
    );
}

export default App;
