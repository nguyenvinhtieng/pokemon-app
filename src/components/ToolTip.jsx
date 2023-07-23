import { AiFillQuestionCircle } from 'react-icons/ai';

export default function ToolTip({children}) {
    return (
        <div className="tooltip">
            <div className="tooltip__main">
                {children}
            </div>
            <span className='c-tip'><AiFillQuestionCircle /></span>
        </div>
    )
}
