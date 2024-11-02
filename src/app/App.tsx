import React, {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";

import {useTelegram} from "@/shared/lib/hooks/useTelegram";

import { RouterView } from './router'
import {KeyboardOffsetProvider} from "@/shared/lib/providers";

function App() {
    const { expand, disableVerticalSwipes } = useTelegram()

    useEffect(() => {
        expand()
        disableVerticalSwipes()
    });

  return (
      <KeyboardOffsetProvider>
          <BrowserRouter>
              <RouterView />
          </BrowserRouter>
      </KeyboardOffsetProvider>
  );
}

export default App;
