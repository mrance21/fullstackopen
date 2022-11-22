const Filter = ({term, handleTerm}) => {
    return (
        <div>filter shown with: <input value={term} onChange={handleTerm}/></div>
    )
}

export default Filter