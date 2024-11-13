import { PropsDefault } from "@/shared/lib/types";
import React from "react";

export type TextSectionProps = PropsDefault<{
    label: string
    description: string
}>

const TextSectionComponent: React.FC<TextSectionProps> = ({
    className,
    label,
    description
}) => {
    return (
        <div>
            
        </div>
    )
}

export const TextSection = React.memo(TextSectionComponent)