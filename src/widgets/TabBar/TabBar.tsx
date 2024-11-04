import { Link, useLocation } from "react-router-dom"

import { RouterPathes } from "@/shared/lib/types"
import { Icon, IconProps } from "@/shared/ui"
import { useTabBarContext } from "@/shared/lib/providers"

import styles from './TabBar.module.scss'
import { AnimatePresence, motion } from "framer-motion"

const data: {
    icon: IconProps['name']
    text: string
    to: RouterPathes
}[] = [
    {
        icon: 'home',
        text: 'Main',
        to: RouterPathes.MAIN,
    },
    {
        icon: 'referrals',
        text: 'Referrals',
        to: RouterPathes.OTHER,
    },
    {
        icon: 'challenges',
        text: 'Challenges',
        to: RouterPathes.OTHER,
    },
    {
        icon: 'leaderboard',
        text: 'Leaderboard',
        to: RouterPathes.OTHER,
    },
]

export const TabBar = () => {
    const location = useLocation()
    const { isShow } = useTabBarContext()

    return (
        <AnimatePresence>
            {isShow && (
                <motion.div
                    className={styles.root}
                    initial={{
                        transform: 'translateY(100%)'
                    }}
                    animate={{
                        transform: 'translateY(0)'
                    }}
                    exit={{
                        transform: 'translateY(100%)'
                    }}
                >
                    <div className={styles.wrapper}>
                        {data.map((item, key) => (
                            <Link
                                key={key}
                                className={[
                                    styles.button,
                                    location.pathname === item.to ? styles['is-active'] : ''
                                ].join(' ').trim()}
                                to={item.to}
                            >
                                <Icon 
                                    className={styles.icon}
                                    name={item.icon}
                                    size={24}
                                    view={location.pathname === item.to ? 'brand' : 'dark'}
                                />
                                <p>
                                    {item.text}
                                </p>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}