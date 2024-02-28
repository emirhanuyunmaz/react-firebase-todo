import AddTodo from './components/AddTodo';
import AllTodo from './components/AllTodo';
function App() {


  return (
    <div className='bg-info main-div' style={{height : "100vh"}}>
      <div className='container '>
      <div className="row">
        <div className="col-sm-6 mx-auto">
          <h1 className='bg-primary text-center rounded p-2'>React Firebase Todo App </h1>
          <hr />
          <AddTodo/>
          <AllTodo/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default App
