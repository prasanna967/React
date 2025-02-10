import useFetch from "./useFetch"

const Home = () => {
   let {Products} = useFetch("http://localhost:3000/products")
  return (
    <div>
        <h1>Home- products {Products.length}</h1>
    </div>
  )
}

export default Home