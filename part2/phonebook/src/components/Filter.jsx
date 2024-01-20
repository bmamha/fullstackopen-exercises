const Filter = ({value, onChange }) => {
    return (
        <div>
          <h4>
        filter shown with: <input id= "search" value={value} onChange={onChange}></input></h4>
      </div>
    )

}

export default Filter