const Select = ({
  id = crypto.randomUUID(),
  label,
  placeholder,
  selected,
  items = [],
  onChange = () => {},
  className = '',
  test = true,
  required = true,
  ...props
}) => {
  return (
    <div className='flex gap-2'>
      {label && <label htmlFor={id}>{label}</label>}

      <select
        id={id}
        value={selected.value || selected}
        onChange={onChange}
        className={
          'bg-transparent outline-0 ' +
          (selected === '' ? 'text-gray-400 ' : '') +
          className
        }
        required={required}
      >
        <option disabled value=''>
          {placeholder || 'Please select an option'}
        </option>

        {test &&
          items.map(item => (
            <option key={crypto.randomUUID()} value={item.value || item}>
              {item.label || item[0].toUpperCase() + item.slice(1)}
            </option>
          ))}
      </select>
    </div>
  )
}

export default Select
