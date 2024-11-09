export type ResponseDefault<T> = {
    error: boolean
    payload: T
}

export type BrandedType<K, T> = K & { __brand: T }

export enum RouterPathes {
    MAIN = '/',
    PHOTO_TASK = '/photo-task/:id',
    OTHER = '/other'
}

export type PropsDefault<T = unknown> = {
    className?: string
} & T

export type PropsDefaultWithChildren<T = unknown> = React.PropsWithChildren<{
    className?: string
} & T>

export type TimeStamp = BrandedType<number, 'Timestamp'>