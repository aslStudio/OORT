import { BalanceInfo } from '@/widgets/balance'

import { images } from '@/shared/assets/images'

import styles from './Main.module.scss'
import { useTelegram } from '@/shared/lib/hooks/useTelegram'
import { useEffect } from 'react'
import { TabsCardLayout } from '@/shared/ui/TabsCardLayout'
import { ActiveTaskList } from '@/widgets/activeTasks'
import { ActiveTaskFilter } from '@/features/tasks'
import { HistoryTaskFilter } from '@/features/tasks/HistoryTaskFilter'
import { HistoryTasksList } from '@/widgets/tasksHistory'

export const Main = () => {
    const { setHeaderColor } = useTelegram()

    useEffect(() => {
        setHeaderColor('#f7f7f8')
    }, [])

    return (
        <div className={styles.root}>
            <img 
                className={styles.image}
                src={images.Decorations.PageBgDecoration}
                alt='page decoration'
            />
            <BalanceInfo />
            <TabsCardLayout 
                leftTab='Active Tasks'
                rightTab='History'
                FirstComponent={(
                    <>
                        <ActiveTaskFilter />
                        <ActiveTaskList />
                    </>
                )}
                SecondComponent={(
                    <>
                        <HistoryTaskFilter />
                        <HistoryTasksList />
                    </>
                )}
            />
        </div>
    )
}