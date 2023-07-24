import React from 'react'

export default function Pagination({pages, onChangePage}) {
  if(!pages) return null
  const current_page = pages.current_page
  const total_page = pages.last_page
  return (
    <div className="c-pagination">
      <div className="c-pagination__wrapper">
        <ul className="c-pagination__list">
          
          <li className={`c-pagination__item long ${current_page == 1 && 'not-hover'}`} onClick={()=>onChangePage(current_page - 1)}><span>Prev</span></li>

          {current_page > 1 && <li className="c-pagination__item" onClick={()=>onChangePage(1)}><span>1</span></li>}
          {current_page > 2 && <li className="c-pagination__item not-hover"><span>・</span></li>}
          <li className="c-pagination__item not-hover active"><span>{current_page}</span></li>
          {current_page < total_page - 1 && <li className="c-pagination__item not-hover"><span>・</span></li>}
          {current_page < total_page && <li className="c-pagination__item"  onClick={()=>onChangePage(total_page)}><span>{total_page}</span></li>}
          
          <li className={`c-pagination__item long ${current_page == total_page && 'not-hover'}`} onClick={()=>onChangePage(current_page + 1)}><span>Next</span></li>

        </ul>
      </div>
    </div>
  )
}
