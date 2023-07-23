import React from 'react'
import Skeleton from './Skeleton'

export default function ModalPokemonSkeleton() {
  return (
    <div className="modal__inner pokemon">
            <div className='pokemon__img large'>
                <Skeleton width="160px" height="160px" circle="50%"/>
            </div>
            <div className="pokemon__name  u-mb-20"><Skeleton width="150px" height="20px"/></div>
            <div className="pokemon__types">
                <div className="pokemon__type">
                    <Skeleton width="40px" height="40px" circle="50%"/>
                </div>
            </div>
            <div className="pokemon__info">
                <div className="pokemon__data"><Skeleton width="100%" height="13px" circle="2px"/></div>
                <div className="pokemon__data"><Skeleton width="100%" height="13px" circle="2px"/></div>
                <div className="pokemon__data"><Skeleton width="100%" height="13px" circle="2px"/></div>
                <div className="pokemon__data"><Skeleton width="100%" height="13px" circle="2px"/></div>
                <div className="pokemon__data"><Skeleton width="100%" height="13px" circle="2px"/></div>
                <div className="pokemon__data"><Skeleton width="100%" height="13px" circle="2px"/></div>
                <div className="pokemon__data"><Skeleton width="100%" height="13px" circle="2px"/></div>
            </div>
          </div>
  )
}
