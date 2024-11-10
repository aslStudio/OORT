import { Tabs, TabsProps } from '@/shared/ui/Tabs'
import styles from './HistoryTaskFilter.module.scss'
import { TaskState } from '@/shared/api/enums'
import React, { useEffect } from 'react'
import { PropsDefault } from '@/shared/lib/types'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/store'
import { tasksHistoryModel } from '@/entities/history/model'

const data: TabsProps['data'] = [
    {
        text: 'All',
        id: 'all',
    },
    {
        id: TaskState.REVIEW,
        text: 'In Review',
    },
    {
        id: TaskState.ACCEPTED,
        text: 'Accepted',
    },
    {
        id: TaskState.DECLINED,
        text: 'Declined',
    },
]

export const HistoryTaskFilter: React.FC<PropsDefault> = ({
    className
}) => { 
    const {  
        filter,
        isPending,
    } = useSelector((state: RootState) => state.historyTasks)
    const dispatch = useDispatch<AppDispatch>()

    function setValue(v: number | string) {
        dispatch(tasksHistoryModel.actions.setFilter(v as 'all' | TaskState))
    }

    useEffect(() => {
        console.log(filter)
        dispatch(tasksHistoryModel.thunks.fetchHistory({
            state: filter,
        }))
    }, [filter])

    return (
        <Tabs 
            className={[
                className ? className : '',
                styles.root,
            ].join(' ').trim()}
            value={filter}
            isDisabled={isPending}
            data={data}
            setValue={setValue}
        />
    )
}