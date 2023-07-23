import React from 'react'
import Skeleton from './Skeleton'

export default function PokemonItemSkeleton() {
  return (
    <div className="p-list__item pokemon">
        <div className="p-list__inner">
            <div className="pokemon__img">
                <Skeleton width="96px" height="96px" circle="50%"/>
            </div>
            <div className="pokemon__name"><Skeleton width="150px" height="20px"/></div>
            <div className="pokemon__types">
                <div className="pokemon__type">
                    <Skeleton width="40px" height="40px" circle="50%"/>
                </div>
            </div>
            <div className="pokemon__info">
                <div className="pokemon__data"><Skeleton width="100%" height="13px" circle="2px"/></div>
                <div className="pokemon__data"><Skeleton width="100%" height="13px" circle="2px"/></div>
                <div className="pokemon__data"><Skeleton width="100%" height="13px" circle="2px"/></div>
            </div>
        </div>
    </div>
  )
}
