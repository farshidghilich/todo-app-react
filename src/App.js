import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
const App = () => {
  const [myData, setData] = useState([])
  const [search, setSearch] = useState('')
  const [todo, setTodo] = useState('')
  const [searchData, setSearchData] = useState([])



  const myInput = useRef()

  useEffect(() => {
    setSearchData(
      myData.filter((item, index) => {
        return item.title.includes(search)
      })
    )
  }, [search, myData])

  useEffect(() => {
    myInput.current?.focus()
  }, [myData])

  return (
    <>
      <p>
        {searchData.reduce((initial, item) => {
          return !item.completed ? initial + 1 : initial
        }, 0)}
      </p>
      <input
        type='search'
        placeholder='search'
        onChange={(e) => {
          setSearch(e.target.value)
        }}
      ></input>
      <div>
        <input
          value={todo}
          type='text'
          placeholder='add your task'
          onChange={(e) => {
            setTodo(e.target.value)
          }}
        ></input>
        <button
          onClick={() => {
            todo
              ? setData((l) => [
                ...l,
                {
                  'userId': 1,
                  'id': 1,
                  'title': todo,
                  'completed': false,
                  'edit': false,
                  'hour': new Date().getHours(),
                  'minute': new Date().getMinutes(),
                },
              ])
              : alert('input somthing')
            setTodo('')
          }}
        >
          add
        </button>
      </div>

      {searchData.map((item, index) => {
        return (
          <div
            style={{ display: 'flex', justifyContent: 'space-between' }}
            key={index}
          >
            {item.edit ? (
              <input
                ref={myInput}
                value={item.title}
                onBlur={() =>
                  setData((last) => {
                    const temp = [...last]
                    temp[index].edit = false
                    return [...temp]
                  })
                }
                onChange={(event) =>
                  setData((last) => {
                    const temp = [...last]
                    temp[index].title = event.target.value
                    return [...temp]
                  })
                }
              ></input>
            ) : (
              <p
                key={index}
                className={item.completed ? 'green' : 'red'}
                style={{ width: '60vw' }}
                onClick={() => {
                  setData((last) => {
                    const temp = [...last]
                    temp[index].edit = true
                    return [...temp]
                  })
                }}
              >
                {item.title} {item.hour}:{item.minute}
              </p>
            )}

            <button
              onClick={() => {
                const myIndex = myData.indexOf(item)
                setData((prev) => {
                  const temp = [...prev]
                  temp.splice(myIndex, 1)
                  return [...temp]
                })
              }}
            >
              delete
            </button>
            <button
              style={{ backgroundColor: item.completed ? 'red' : ' green' }}
              onClick={() => {
                const status = item.completed
                const myIndex = myData.indexOf(item)
                setData((last) => {
                  const temp = [...last]
                  temp[myIndex].completed = !status
                  return temp
                })
              }}
            >
              {item.completed ? 'deactive' : 'active'}
            </button>
          </div>
        )
      })}
    </>
  )
}

export default App
