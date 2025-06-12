import { useState } from "react";
function Categories(){
    const[categories, setCategories] = useState([])
    const handleAdd = () => {
        const name = window.prompt("Enter Category Name")
        if(name){  //create an object 
            const category = {
                _id: Number(new Date()),
                name: name
            }
            //send the object to server
            //get response from server
            //then add to state
            const newArr = [...categories ]
            newArr.push(category)
            setCategories(newArr)
        }
    }

    const handleRemove = (id) => {
        const confirmation = window.confirm("Are you sure")
        if(confirmation) {
            const newArr = categories.filter((ele) => {
                return ele._id != id
            })
            setCategories(newArr)
        }

    }
    return(
        <div>
            <h2>Listing Categories - {categories.length}</h2>
            <ul>
                {categories.map((category) => {
                    return <li key={ category._id}>{ category.name }
                    <button onClick={() => {
                        handleRemove(category._id)
                    }}>remove</button>
                    </li>
                })}
            </ul>
            <button onClick={handleAdd}>Add category</button>
        </div>
    )
}

export default Categories;