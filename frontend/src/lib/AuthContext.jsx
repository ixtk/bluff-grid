import { createContext, useEffect, useState } from "react"
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"
import axiosInstance from "./axiosInstance"

export const AuthContext = createContext({
  isLoading: true,
  user: null,
  setUser: () => {}
})

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken()
        const username = firebaseUser.displayName
        const photoUrl = firebaseUser.photoURL
        const email = firebaseUser.email
        const uid = firebaseUser.uid

        setUser({ username, photoUrl, email, uid })

        try {
          axiosInstance.interceptors.request.use(
            async config => {
              if (token) {
                config.headers.Authorization = `Bearer ${token}`
              }
              return config
            },
            error => Promise.reject(error)
          )

          await axiosInstance.post("/users")
        } catch (err) {
          console.error("User creation failed:", err)
        }
      } else {
        localStorage.removeItem("token")
        setUser(null)
      }

      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
