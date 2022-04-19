import React, { useState } from 'react'

const Test = () => {
  const [a, setA] = useState([1, 2, 3, 4, 5])
  console.log(a)
  return (
    <div>
      {a.map((item, index) => (
        <p
          index={index}
          onClick={() => {
            setA((last) => {
              const temp = [...last]
              temp.splice(index, 1)
              return temp
            })
          }}
        >
          {item}
        </p>
      ))}
    </div>
  )
}

export default Test
