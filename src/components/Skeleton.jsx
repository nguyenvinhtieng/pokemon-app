import React from 'react'

export default function Skeleton({width, height, circle}) {
    return (
        <div className="c-skeleton" style={{width, height, borderRadius: circle || '0%'}}></div>
    )
}
