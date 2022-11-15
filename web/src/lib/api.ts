import { api } from "./axios";

export async function loadAllCounts() {
const [poolCountResponse,guessesCountResponse, usersCountResponse ] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('users/count')
  ])

  return { poolCountResponse, guessesCountResponse, usersCountResponse}
}