import axios from 'axios'
import React , {useState , useEffect}  from 'react'


function text() {
 
   const [products , setProducts] = useState([])
   const [filteredProducts , setFilteredProducts] = useState([])
   const [searchQuery , setSearchQuery] = useState('')
   const [newProduct , setNewProduct] = useState({title:'' , price:'' , image:'' })
   const [editingProduct , setEditingProduct] = useState(null)

   useEffect(()=>{
      const fetchProducts = async ()=>{
         try {
             
         } catch (e) {
            console.log(e);
            
         }
      }
   },[])

    return (
    <div>

    </div>
  )
}

export default text