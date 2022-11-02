const RangeOption = ({ range, option, handleOptionClick }) => {
  return (
    <button className={ 'rangeOption' + (range === option ? ' current' : '') } onClick={ handleOptionClick }>
      { option }
    </button>
  )
}

export default RangeOption