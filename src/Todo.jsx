
import { useState } from "react";
import "./App.css";
import { AiFillDelete } from "react-icons/ai";
import { CiSaveUp1 } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

const TODO = () => {
  let [items, setitems] = useState([
    {
      id: 1,
      lable: "HTML,CSS",
      checked: true,
    },
    {
      id: 2,
      lable: "Javascript",
      checked: true,
    },
    {
      id: 3,
      lable: "React js",
      checked: false,
    },
  ]);

  let [newitems, setnewitems] = useState("");

  let [editing, setediting] = useState(false);

  let [currentEleID, setcurrentEleID] = useState(null);

  let handlecheck = (id) => {
    let compareitems = items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    setitems(compareitems);
  };

  let handleupdate = (id) => {
    let Listitem = items.find((item) => item.id === id);
    setnewitems(Listitem.lable);
    setediting(true);
    setcurrentEleID(id);
  };

  let handleAddorSaveitem = () => {
    if (editing) {
      let Listitems = items.map((item) => {
        return item.id === currentEleID ? { ...item, lable: newitems } : item;
      });
      setitems(Listitems);
      setcurrentEleID(null);
      setnewitems("");
      setediting(false);
    } else {
      setitems([
        ...items,
        { id: items.length + 1, lable: newitems, checked: false },
      ]);
      setnewitems("");
    }
  };

  let handledelete = (id) => {
    let deleteitems = items
      .filter((item) => {
        return item.id !== id;
      })
      .map((item, index) => {
        return { ...item, id: index + 1 };
      });
    setitems(deleteitems);
  };
  return (
    <main>
      <div>
        <input
          type="text"
          value={newitems}
          onChange={(e) => {
            setnewitems(e.target.value);
          }}
        />
        <button onClick={handleAddorSaveitem}>
          {editing ? <CiSaveUp1 id="save" /> : <IoIosAddCircle  id="add"/>}
        </button>
      </div>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id} className="item">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handlecheck(item.id)}
              />
              <label>{item.lable}</label>
              <FaEdit
                id="edit"
                role="button"
                tabIndex={0}
                onClick={() => handleupdate(item.id)}
              />
              <AiFillDelete
                id="delete"
                role="button"
                tabIndex={0}
                onClick={() => handledelete(item.id)}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default TODO;

