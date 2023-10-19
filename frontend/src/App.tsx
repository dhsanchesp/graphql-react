import { gql, useQuery } from "@apollo/client"
import { NewUserForm } from "./components/NewUserForm"

type User = {
  id: string,
  name: string
}

export const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`

function App() {
  const { data } = useQuery<{ users: User[] }>(GET_USERS)

  return (
    <div>
      <NewUserForm />
      <ul>
        {data?.users.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  )
}

export default App
