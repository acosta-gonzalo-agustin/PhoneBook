

const SearchInput = ({value, onChange}) => {

  return (
      <div>
        filter shown with: <input value = {value} onChange={onChange}/>
      </div>

  )

}
export default SearchInput